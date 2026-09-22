/**
 * MailerLite API integration helper.
 * Uses MailerLite Connect API (v2 / connect.mailerlite.com).
 */

export interface MailerLiteSubscriberOptions {
  email: string;
  name?: string;
  fields?: Record<string, string | number | null | undefined>;
  groups?: string[];
  status?: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
}

export interface MailerLiteResult {
  success: boolean;
  skipped?: boolean;
  data?: unknown;
  error?: string;
}

export async function addMailerLiteSubscriber(
  options: MailerLiteSubscriberOptions
): Promise<MailerLiteResult> {
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey || apiKey.trim().length === 0) {
    console.warn(
      "[mailerlite] MAILERLITE_API_KEY is not configured. Skipping MailerLite sync."
    );
    return {
      success: false,
      skipped: true,
      error: "MAILERLITE_API_KEY is not configured",
    };
  }

  const cleanApiKey = apiKey.trim();
  const fieldsPayload: Record<string, unknown> = {};

  if (options.name) {
    fieldsPayload.name = options.name.trim();
  }

  if (options.fields) {
    for (const [key, val] of Object.entries(options.fields)) {
      if (val !== undefined && val !== null) {
        fieldsPayload[key] = val;
      }
    }
  }

  const payload: Record<string, unknown> = {
    email: options.email.trim().toLowerCase(),
    status: options.status || "active",
  };

  if (Object.keys(fieldsPayload).length > 0) {
    payload.fields = fieldsPayload;
  }

  if (options.groups && options.groups.length > 0) {
    payload.groups = options.groups;
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cleanApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await res.json().catch(() => null);

    if (res.ok || res.status === 200 || res.status === 201) {
      console.log(
        `[mailerlite] Subscriber successfully synced: ${options.email} (HTTP ${res.status})`
      );
      return { success: true, data: responseBody };
    }

    // MailerLite often returns 422 if subscriber already exists or validation note
    if (res.status === 422 && responseBody?.message) {
      console.warn(
        `[mailerlite] Validation note for ${options.email}: ${responseBody.message}`
      );
      // Even if already exists, MailerLite updates the subscriber details
      return { success: true, data: responseBody };
    }

    const errorMessage =
      responseBody?.message ||
      `MailerLite returned error status ${res.status}`;
    console.error(`[mailerlite] API error (${res.status}):`, errorMessage);
    return { success: false, error: errorMessage, data: responseBody };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[mailerlite] Network error syncing subscriber:", message);
    return { success: false, error: message };
  }
}
