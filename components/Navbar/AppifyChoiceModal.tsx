"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CALENDLY_URL = "https://calendly.com/mennan-appify/30min";

interface AppifyChoiceModalProps {
  open: boolean;
  onClose: () => void;
  onInquiry: () => void;
}

export default function AppifyChoiceModal({ open, onClose, onInquiry }: AppifyChoiceModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const handleBookMeeting = () => {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleInquiry = () => {
    onClose();
    onInquiry();
  };

  const modalContent = (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center p-4 z-[10000]"
        onClick={onClose}
        aria-hidden="true"
      >
        <div className="absolute inset-0 backdrop-blur-md bg-black/30" />
        <div
          className="relative w-full max-w-md rounded-3xl bg-gray-400/10 backdrop-blur-2xl border border-white/30 shadow-xl overflow-hidden px-8 py-10 sm:px-10 sm:py-12"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="appify-choice-title"
        >
          <h2
            id="appify-choice-title"
            className="text-2xl sm:text-3xl font-bold font-Aeonik text-black text-center uppercase tracking-tight mb-8"
          >
            Let&apos;s Appify
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleInquiry}
              className="flex items-center justify-center gap-2 rounded-full px-6 py-4 font-Aeonik font-medium text-sm sm:text-base uppercase text-white bg-black shadow-md hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
              <span>Inquiry</span>
            </button>
            <button
              type="button"
              onClick={handleBookMeeting}
              className="flex items-center justify-center gap-2 rounded-full px-6 py-4 font-Aeonik font-medium text-sm sm:text-base uppercase text-black bg-white border border-gray-300 shadow-md hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-black" />
              <span>Book a Meeting</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
