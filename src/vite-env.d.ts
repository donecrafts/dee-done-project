/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  /** https://web3forms.com — optional; when set, contact form posts here instead of only Supabase. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /**
   * Inbox for https://formsubmit.co (no backend). First submission sends an activation email to this address.
   */
  readonly VITE_FORMSUBMIT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
