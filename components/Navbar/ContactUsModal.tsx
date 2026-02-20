"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ContactUsModalProps {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#e9e9f3] text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300";

export default function ContactUsModal({ open, onClose }: ContactUsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    nda: "yes" as "yes" | "no",
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          company: form.company.trim() || undefined,
          nda: form.nda,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", company: "", nda: "yes" });
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (!open || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-[10000]"
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-black/30" />
      <div
        className="bg-gray-400/10 backdrop-blur-2xl border border-white/30 rounded-3xl w-full flex flex-col
          max-w-md max-h-[85vh]
          sm:max-w-md sm:max-h-[82vh]
          md:max-w-lg md:max-h-[80vh] md:min-h-[420px]
          shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-us-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between flex-shrink-0 px-5 pt-5 pb-2 sm:px-6 sm:pt-6 sm:pb-3 md:px-8 md:pt-7 md:pb-4">
          {status === "success" ? <div className="flex-1 min-w-0" aria-hidden="true" /> : null}
          <h2
            id="contact-us-title"
            className={`text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 ${status === "success" ? "flex-1 min-w-0 text-center" : "pr-6"}`}
          >
            Apply for a Free Development Strategy!
          </h2>
          {status === "success" ? (
            <div className="flex-1 min-w-0 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl md:text-3xl flex-shrink-0 leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-2xl md:text-3xl flex-shrink-0 leading-none"
              aria-label="Close"
            >
              &times;
            </button>
          )}
        </div>
<div
          className="overflow-y-auto overscroll-contain flex-1 min-h-0 px-5 pb-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8"
          style={{ WebkitOverflowScrolling: "touch" }}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {status === "success" ? (
            <div className="py-6 text-center">
              <p className="text-lg font-medium text-gray-800 mb-2">Thanks for reaching out.</p>
              <p className="text-sm text-gray-600">We&apos;ll get back to you soon.</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 popup-form-submit-btn inline-flex w-auto min-w-[120px]"
              >
                <span className="popup-form-submit-dot" />
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
              {status === "error" && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{errorMessage}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                <div className="flex flex-col">
                  <label htmlFor="contact-firstName" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="contact-firstName"
                    placeholder="John"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    disabled={status === "loading"}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-lastName" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="contact-lastName"
                    placeholder="Doe"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    disabled={status === "loading"}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="contact-email" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
                  Email *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="johnsmith@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  disabled={status === "loading"}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="contact-company" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="contact-company"
                  placeholder="Nike"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  disabled={status === "loading"}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-3 mb-2 sm:mb-3">
                <span className="font-medium text-sm sm:text-base mb-0.5">Would you like an NDA?</span>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none text-sm sm:text-base">
                    <input
                      type="radio"
                      name="nda"
                      value="yes"
                      checked={form.nda === "yes"}
                      onChange={() => setForm((f) => ({ ...f, nda: "yes" }))}
                      disabled={status === "loading"}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none text-sm sm:text-base">
                    <input
                      type="radio"
                      name="nda"
                      value="no"
                      checked={form.nda === "no"}
                      onChange={() => setForm((f) => ({ ...f, nda: "no" }))}
                      disabled={status === "loading"}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="popup-cta-btn"
                >
                  <span className="popup-cta-dot" />
                  <span className="popup-cta-text">
                    {status === "loading" ? "Sending…" : "Get Your Free Development Strategy"}
                  </span>
                  <span className="popup-cta-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
