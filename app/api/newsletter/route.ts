import { getDb } from "@/db";
import { subscribers } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  website: z.string().max(0, "Spam detected").optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.errors[0]?.message || "Please check your email address." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // 1. Store in database
    try {
      await getDb().insert(subscribers).values({
        id: crypto.randomUUID(),
        email,
        createdAt: new Date().toISOString(),
      });
    } catch (dbError) {
      console.error("[newsletter] Local DB write error:", dbError);
    }

    // 2. Forward to Google Forms if configured
    const formUrl = process.env.GOOGLE_FORM_ACTION_URL;
    const entryId = process.env.GOOGLE_FORM_EMAIL_ENTRY_ID || "emailAddress";

    if (formUrl && formUrl.trim().length > 0) {
      try {
        let endpoint = formUrl.trim();
        // Automatically ensure formResponse endpoint is used
        if (endpoint.includes("/viewform")) {
          endpoint = endpoint.replace("/viewform", "/formResponse");
        } else if (!endpoint.endsWith("/formResponse")) {
          endpoint = endpoint.replace(/\/+$/, "") + "/formResponse";
        }

        const paramName = entryId.startsWith("entry.") || entryId === "emailAddress"
          ? entryId
          : `entry.${entryId}`;

        const bodyParams = new URLSearchParams();
        bodyParams.append(paramName, email);
        // Also send emailAddress for forms that collect verified emails
        if (paramName !== "emailAddress") {
          bodyParams.append("emailAddress", email);
        }

        const googleRes = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyParams.toString(),
        });

        if (!googleRes.ok && googleRes.status !== 302 && googleRes.status !== 303) {
          console.warn("[newsletter] Google Forms returned non-success status:", googleRes.status);
        }
      } catch (googleError) {
        console.error("[newsletter] Failed to forward to Google Forms:", googleError);
        // We still consider the local subscription successful
      }
    } else {
      console.log("[newsletter] New subscriber recorded locally:", email, "(GOOGLE_FORM_ACTION_URL not configured yet)");
    }

    return Response.json({
      ok: true,
      message: "You are subscribed. We look forward to sharing our insights with you.",
    });
  } catch (error) {
    console.error("[newsletter] Unexpected subscription error:", error);
    return Response.json(
      { error: "We could not process your subscription. Please try again." },
      { status: 500 }
    );
  }
}
