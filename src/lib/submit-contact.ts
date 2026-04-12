import { supabase } from "@/integrations/supabase/client";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sends the contact form to your inbox.
 * - If `VITE_WEB3FORMS_ACCESS_KEY` is set (https://web3forms.com), submissions go there (register the key with your Gmail).
 * - Otherwise uses the Supabase Edge Function `send-contact-email` (requires `RESEND_API_KEY` + deploy on Supabase).
 */
export async function submitContactForm(body: ContactPayload): Promise<void> {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  if (web3Key) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: web3Key,
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

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (!supabaseUrl) {
    throw new Error(
      "Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY, or set VITE_SUPABASE_URL and deploy the send-contact-email function.",
    );
  }

  const { error } = await supabase.functions.invoke("send-contact-email", { body });
  if (error) {
    throw new Error(error.message || "Failed to send message. Please try again.");
  }
}
