"use client";

import { useState } from "react";
import Image from "next/image";

type Status = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  /** Optional class for the form container (flex, padding, etc.) */
  formClassName?: string;
  /** Optional class for the email input */
  inputClassName?: string;
  /** Optional class for the submit button wrapper */
  buttonClassName?: string;
  /** Arrow icon size (desktop vs mobile) */
  arrowSize?: number;
}

export function NewsletterForm({
  formClassName = "flex justify-between bg-[#F0F1FA] p-3 sm:p-4 rounded-xl mt-4 sm:mt-6 text-[#BEBFC7] text-base sm:text-xl",
  inputClassName = "bg-[#F0F1FA] w-full outline-none min-w-0",
  buttonClassName = "flex-shrink-0 ml-3",
  arrowSize = 30,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message ?? "Thanks for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={formClassName}
      >
        <label className="flex-1 min-w-0">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className={inputClassName}
            required
            aria-label="Email for newsletter"
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className={buttonClassName}
          aria-label="Subscribe"
        >
          <Image
            src="/arrow-right.svg"
            width={arrowSize}
            height={arrowSize}
            alt="Submit"
          />
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-green-600 font-medium">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600 font-medium">{message}</p>
      )}
    </>
  );
}
