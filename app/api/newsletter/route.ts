import { getDb } from "@/db";
import { subscribers } from "@/db/schema";
import { addMailerLiteSubscriber } from "@/lib/mailerlite";
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

    // 2. Sync to MailerLite API
    try {
      const mlResult = await addMailerLiteSubscriber({
        email,
        status: "active",
      });
      if (!mlResult.success && !mlResult.skipped) {
        console.warn("[newsletter] MailerLite sync warning:", mlResult.error);
      }
    } catch (mlError) {
      console.error("[newsletter] Unexpected MailerLite sync error:", mlError);
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
