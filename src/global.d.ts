// src/global.d.ts
export {};

declare global {
  interface Window {
    recaptchaVerifier: any; // For reCAPTCHA instance
    confirmationResult: any; // For confirmation result
  }
}
