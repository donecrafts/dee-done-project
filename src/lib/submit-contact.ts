import { supabase } from "@/integrations/supabase/client";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sends the contact form to your inbox (tries in order):
 * 1. `VITE_WEB3FORMS_ACCESS_KEY` — https://web3forms.com (key must be created for the inbox you read)
 * 2. `VITE_FORMSUBMIT_EMAIL` — https://formsubmit.co (first submit sends an activation link to that inbox)
 * 3. Supabase Edge Function `send-contact-email` (needs `RESEND_API_KEY` on Supabase + deployed function)
 */
export async function submitContactForm(body: ContactPayload): Promise<void> {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  if (web3Key?.trim()) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: web3Key.trim(),
        subject: `Portfolio: message from ${body.name}`,
        name: body.name,
        email: body.email,
        message: body.message,
        from_name: body.name,
      }),
    });
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Could not send your message. Please try again.");
    }
    return;
  }

  const formSubmitInbox = (import.meta.env.VITE_FORMSUBMIT_EMAIL as string | undefined)?.trim();
  if (formSubmitInbox) {
    const url = `https://formsubmit.co/ajax/${encodeURIComponent(formSubmitInbox)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        message: body.message,
        _subject: `Portfolio contact from ${body.name}`,
        _replyto: body.email,
      }),
    });
    let data: { success?: string; message?: string } = {};
    try {
      data = (await res.json()) as { success?: string; message?: string };
    } catch {
      /* non-JSON body */
    }
    if (!res.ok) {
      throw new Error(
        data.message ||
          "Form could not be sent. If you just added FormSubmit, open the inbox for this address and click the activation link from FormSubmit, then try again.",
      );
    }
    return;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (!supabaseUrl) {
    throw new Error(
      "Contact form is not configured. Add VITE_FORMSUBMIT_EMAIL (your inbox), or VITE_WEB3FORMS_ACCESS_KEY, or Supabase + send-contact-email.",
    );
  }

  const { data, error } = await supabase.functions.invoke("send-contact-email", { body });

  if (error) {
    let detail = error.message;
    const ctx = error as { context?: Response };
    try {
      if (ctx.context && typeof ctx.context.json === "function") {
        const errBody = (await ctx.context.json()) as { error?: string };
        if (errBody?.error) detail = errBody.error;
      }
    } catch {
      /* ignore */
    }
    throw new Error(detail || "Failed to send message. Please try again.");
  }

  if (data && typeof data === "object" && "error" in data && (data as { error?: string }).error) {
    throw new Error(String((data as { error: string }).error));
  }
}
