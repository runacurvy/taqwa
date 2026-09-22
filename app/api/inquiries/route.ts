import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { addMailerLiteSubscriber } from "@/lib/mailerlite";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(150),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  location: z.string().trim().min(2, "Location is required.").max(150),
  service: z.string().min(1, "Please select a service.").max(100),
  stage: z.string().min(1, "Please select a project stage.").max(100),
  description: z.string().trim().min(10, "Please provide a short description.").max(6000),
  budget: z.string().min(1, "Please select a budget range.").max(100),
  target: z.string().max(100).optional().default(""),
  website: z.string().max(0, "Spam detected").optional(),
});

async function forwardToGoogleForm(details: {
  name: string;
  email: string;
  location: string;
  service: string;
  stage: string;
  description: string;
  budget: string;
  target?: string;
}) {
  const formUrl = process.env.GOOGLE_FORM_INQUIRIES_URL || process.env.GOOGLE_FORM_ACTION_URL;
  if (!formUrl || !formUrl.trim()) return;

  try {
    let endpoint = formUrl.trim();
    if (endpoint.includes("/viewform")) {
      endpoint = endpoint.replace("/viewform", "/formResponse");
    } else if (!endpoint.endsWith("/formResponse")) {
      endpoint = endpoint.replace(/\/+$/, "") + "/formResponse";
    }

    const bodyParams = new URLSearchParams();

    // Field entry IDs from environment or fallback
    const entryName = process.env.ENTRY_NAME || "entry.1000001";
    const entryEmail = process.env.ENTRY_EMAIL || "entry.1000002";
    const entryLocation = process.env.ENTRY_LOCATION || "entry.1000003";
    const entryService = process.env.ENTRY_SERVICE || "entry.1000004";
    const entryStage = process.env.ENTRY_STAGE || "entry.1000005";
    const entryBudget = process.env.ENTRY_BUDGET || "entry.1000006";
    const entryTarget = process.env.ENTRY_TARGET || "entry.1000007";
    const entryDescription = process.env.ENTRY_DESCRIPTION || "entry.1000008";

    bodyParams.append("emailAddress", details.email);
    if (entryName) bodyParams.append(entryName, details.name);
    if (entryEmail) bodyParams.append(entryEmail, details.email);
    if (entryLocation) bodyParams.append(entryLocation, details.location);
    if (entryService) bodyParams.append(entryService, details.service);
    if (entryStage) bodyParams.append(entryStage, details.stage);
    if (entryBudget) bodyParams.append(entryBudget, details.budget);
    if (entryTarget) bodyParams.append(entryTarget, details.target || "");
    if (entryDescription) bodyParams.append(entryDescription, details.description);

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: bodyParams.toString(),
    });
    console.log("[inquiries] Forwarded inquiry to Google Forms successfully");
  } catch (err) {
    console.error("[inquiries] Failed forwarding to Google Forms:", err);
  }
}

async function sendInquiryNotificationEmail(details: {
  name: string;
  email: string;
  location: string;
  service: string;
  stage: string;
  description: string;
  budget: string;
  target?: string;
  submittedAt: string;
}) {
  const recipientEmail = process.env.INQUIRY_NOTIFICATION_EMAIL || "buildwithtaqwa@gmail.com";

  const emailSubject = `New Project Inquiry from ${details.name} (${details.service})`;
  const emailBodyText = `
New Project Inquiry Received - Taqwa Agency

--------------------------------------------------
CONTACT DETAILS
--------------------------------------------------
Name: ${details.name}
Email: ${details.email}
Location: ${details.location}

--------------------------------------------------
PROJECT SCOPE
--------------------------------------------------
Service Requested: ${details.service}
Business Stage: ${details.stage}
Estimated Budget: ${details.budget}
Target Timeline / Goal: ${details.target || "Not specified"}

--------------------------------------------------
PROJECT DESCRIPTION
--------------------------------------------------
${details.description}

--------------------------------------------------
Submitted At: ${details.submittedAt}
`;

  console.log(`[inquiries-email] Dispatching notification to ${recipientEmail}:\n${emailBodyText}`);

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && resendApiKey.trim().length > 0) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Taqwa Agency Inquiries <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: details.email,
          subject: emailSubject,
          text: emailBodyText,
        }),
      });
      if (res.ok) {
        console.log(`[inquiries-email] Resend email dispatched successfully to ${recipientEmail}`);
      } else {
        const errText = await res.text();
        console.warn(`[inquiries-email] Resend dispatch returned status ${res.status}:`, errText);
      }
    } catch (resendErr) {
      console.error("[inquiries-email] Resend dispatch error:", resendErr);
    }
  }
}

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length")) > 15000) {
      return Response.json({ error: "Please shorten your project description." }, { status: 413 });
    }

    const body = await request.json();
    const data = schema.safeParse(body);

    if (!data.success) {
      return Response.json(
        { error: data.error.errors[0]?.message || "Please check your details and try again." },
        { status: 400 }
      );
    }

    const { website, ...values } = data.data;
    const submittedAt = new Date().toISOString();
    const inquiryId = crypto.randomUUID();

    // 1. Store locally in SQLite Database (so no submission is ever lost)
    try {
      await getDb().insert(inquiries).values({
        id: inquiryId,
        name: values.name,
        email: values.email,
        location: values.location,
        service: values.service,
        stage: values.stage,
        description: values.description,
        budget: values.budget,
        target: values.target || "",
        createdAt: submittedAt,
      });
    } catch (dbError) {
      console.error("[inquiries] Database save error:", dbError);
    }

    // 2. Forward to Google Forms if configured (for automatic Google Forms -> Sheets & email notification)
    await forwardToGoogleForm(values);

    // 3. Sync to MailerLite
    try {
      await addMailerLiteSubscriber({
        email: values.email,
        name: values.name,
        fields: {
          city: values.location,
          company: `${values.service} (${values.stage})`,
        },
        status: "active",
      });
    } catch (mlError) {
      console.error("[inquiries] MailerLite sync error:", mlError);
    }

    // 4. Dispatch Email Notification if Resend / API Key configured
    await sendInquiryNotificationEmail({
      ...values,
      submittedAt,
    });

    return Response.json({
      ok: true,
      message: "Your project inquiry has been received. We will be in touch shortly.",
    });
  } catch (error) {
    console.error("[inquiries] Server error:", error);
    return Response.json(
      { error: "Your inquiry could not be saved. Please try again." },
      { status: 500 }
    );
  }
}
