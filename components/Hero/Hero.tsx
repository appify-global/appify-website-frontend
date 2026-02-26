"use client";
import React, { useState } from "react";
import { Tags } from "./Tags";
import Button from "../ui/Button";
import DotButton from "../ui/DotButton";

const tags = [
  "Custom Software & ERP Development",
  "AI for Operational Efficiency",
  "Digital Transformation Consulting",
  "Enterprise App Development",
];

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  return (
    <div className="font-[Aeonik] relative">
      {/* Background Blur Overlay (only visible when modal open) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/30 z-40"
          onClick={() => setIsModalOpen(false)}
        />
      )}

      {/* Main Hero Card */}
      <div
        className="
          flex flex-col lg:flex-row
          bg-gray-400/10
          backdrop-blur-[90px]
          rounded-[28px]
          border-2 border-white/50
          py-4 px-[14px] sm:py-6 lg:py-10 sm:px-5 lg:px-10
          bg-clip-padding backdrop-filter bg-opacity-20 border border-gray-300
          relative z-10
          w-full
          lg:h-[calc(100vh-12vw-80px)]
          min-h-[400px] sm:min-h-[500px] md:min-h-[450px] lg:min-h-[600px]
        "
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-40 pointer-events-none rounded-[28px]" />

        {/* Left Section */}
        <div className="lg:w-[60%] p-2 sm:p-4 lg:p-6 flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-5">
          <h1 className="leading-[1.1] text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[4.2vw] tracking-normal">
            Enterprise Software <br /> That Drives <br /> Operational Efficiency
          </h1>

          {/* Tags - pills on all sizes */}
          <div className="flex flex-wrap gap-3 sm:gap-2 md:gap-3 max-w-[700px]">
            {tags.map((tag, index) => (
              <Tags key={index} label={tag} />
            ))}
          </div>

          {/* Description - visible on tablet+ */}
          <p className="leading-relaxed max-w-[420px] text-[3.5vw] sm:text-[3vw] md:text-[2vw] lg:text-[1vw]">
            We build enterprise software and AI-powered solutions that increase
            operational efficiency—turning ambitious visions into reality.
          </p>

          {/* Mobile only: stacked CTAs, small gap */}
          <div className="hero-mobile-cta-stack md:hidden flex flex-col gap-3 w-full">
            <DotButton
              text="FREE DISCOVERY CALL"
              variant="white"
              href="https://calendly.com/mennan-appify/30min"
              target="_blank"
              rel="noopener noreferrer"
            />
            <div className="w-full uppercase" onClick={() => setIsModalOpen(true)}>
              <Button
                text="Get Your Free Development Strategy"
                variant="black"
              />
            </div>
          </div>

          {/* Tablet + Desktop: Discovery Call row; Tablet only: form CTA below (reduced gap) */}
          <div className="hero-tablet-cta-stack hidden md:flex flex-col gap-3 lg:flex-row lg:gap-0 w-full -mt-1 lg:-mt-2">
            <div className="w-full">
              <DotButton
                text="FREE DISCOVERY CALL"
                variant="white"
                className="free-discovery-call-btn"
                href="https://calendly.com/mennan-appify/30min"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
            {/* Tablet only: form CTA (opens popup) */}
            <div
              className="w-full uppercase lg:hidden"
              onClick={() => setIsModalOpen(true)}
            >
              <Button
                text="Get Your Free Development Strategy"
                variant="black"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Form visible only on large screens */}
        <div className="hidden lg:flex lg:w-[40%] p-4 lg:p-6 flex-col justify-center space-y-4 overflow-y-auto max-h-full">
          <h2 className={`text-xl font-semibold text-gray-800 mb-2 ${formSuccess ? "text-center" : ""}`}>
            Apply for a free Development Strategy!
          </h2>
          <Form submitBtnVariant="black" onSuccess={() => setFormSuccess(true)} />
        </div>
      </div>

      {/* Popup Modal for Mobile + Tablet (optimized height/width per breakpoint) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 pb-6 sm:p-6 md:p-8"
          onClick={() => { setIsModalOpen(false); setFormSuccess(false); }}
        >
          <div
            className="bg-gray-400/10 backdrop-blur-2xl border border-white/30 rounded-3xl w-full flex flex-col
              max-w-md max-h-[85vh]
              sm:max-w-md sm:max-h-[82vh]
              md:max-w-lg md:max-h-[80vh] md:min-h-[420px]
              shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between flex-shrink-0 px-5 pt-5 pb-2 sm:px-6 sm:pt-6 sm:pb-3 md:px-8 md:pt-7 md:pb-4">
              {formSuccess ? <div className="flex-1 min-w-0" aria-hidden="true" /> : null}
              <h2 className={`text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 ${formSuccess ? "flex-1 min-w-0 text-center" : "pr-6"}`}>
                Apply for a Free Development Strategy!
              </h2>
              {formSuccess ? (
                <div className="flex-1 min-w-0 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-800 text-2xl md:text-3xl flex-shrink-0 leading-none"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(false)}
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
              <Form submitBtnVariant="white" onSuccess={() => setFormSuccess(true)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const inputClass =
  "w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#e9e9f3] text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300";

const Form = ({ submitBtnVariant, onSuccess }: { submitBtnVariant: "black" | "white"; onSuccess?: () => void }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    nda: "yes" as "yes" | "no",
  });

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
      onSuccess?.();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center">
        <p className="text-lg font-medium text-gray-800 mb-2">Thanks for reaching out.</p>
        <p className="text-sm text-gray-600">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{errorMessage}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="John"
            required
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
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
        <label htmlFor="email" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
          Email *
        </label>
        <input
          type="email"
          id="email"
          placeholder="johnsmith@email.com"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          disabled={status === "loading"}
          className={inputClass}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="company" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
          Company (Optional)
        </label>
        <input
          type="text"
          id="company"
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
      <div className="pt-2 sm:pt-3 flex justify-start">
        <DotButton
          text={status === "loading" ? "Sending…" : "Get Your Free Development Strategy"}
          variant={submitBtnVariant}
          type="submit"
          disabled={status === "loading"}
        />
      </div>
    </form>
  );
};

export default Hero;
