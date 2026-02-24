"use client";

import { useEffect, useCallback, useState } from "react";
import { useSpring, a } from "@react-spring/web";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/services", label: "SERVICES" },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Panel slide animation
  const panelStyle = useSpring({
    transform: open ? "translateX(0%)" : "translateX(100%)",
    config: { tension: 280, friction: 30 },
    onStart: () => { if (open) setVisible(true); },
    onRest: () => { if (!open) setVisible(false); },
  });

  // Backdrop fade animation
  const backdropStyle = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
  });

  // Scroll lock - disable body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname?.startsWith(href);
    },
    [pathname]
  );

  // Handle navigation with full page reload to ensure scroll reset
  const handleLinkClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // Use window.location for full page reload to ensure scroll reset
    if (href !== pathname) {
      window.location.href = href;
    } else {
      onClose();
    }
  }, [pathname, onClose]);

  if (!open && !visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] lg:hidden">
      {/* Backdrop */}
      <a.div
        className="absolute inset-0 bg-black/30"
        style={backdropStyle}
        onClick={onClose}
      />

      {/* Panel — full width on mobile, side panel on tablet */}
      <a.div
        className="absolute top-0 right-0 bottom-0 w-full sm:w-[28rem] bg-white flex flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.08)]"
        style={panelStyle}
      >
        {/* Header with close button */}
        <div className="h-20 flex-shrink-0 flex items-center justify-end px-6">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full bg-[#E4E6EF] w-10 h-10 flex items-center justify-center"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="#2B2E3A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6">
          {/* Nav Links */}
          <nav className="mb-6 sm:mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between py-4 sm:py-3 border-b border-black/5"
              >
                <span className="font-Aeonik text-2xl sm:text-2xl text-[#2B2E3A]">
                  {link.label}
                </span>
                {isActive(link.href) && (
                  <span className="text-[#2B2E3A] text-2xl">•</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="rounded-xl bg-[#F0F1FA] p-5 sm:p-6 mb-3">
            <div className="font-Aeonik text-xl sm:text-2xl text-[#2B2E3A] mb-4 sm:mb-4">
              Subscribe to our newsletter
            </div>
            <NewsletterForm
              formClassName="flex items-center justify-between bg-white p-3 sm:p-3 rounded-xl text-[#BEBFC7] text-base sm:text-base"
              inputClassName="bg-transparent flex-1 min-w-0 outline-none"
              buttonClassName="flex-shrink-0 ml-3"
              arrowSize={24}
            />
          </div>

          {/* News Room */}
          <Link href="/news" onClick={(e) => handleLinkClick(e, "/news")}>
            <div className="bg-black text-white p-5 sm:p-5 rounded-xl flex items-center justify-between">
              <span className="font-Aeonik text-xl sm:text-2xl">
                NEWS ROOM
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 12-6-6m6 6-6 6m6-6H5"
                  transform="rotate(-45, 12, 12)"
                />
              </svg>
            </div>
          </Link>
        </div>
      </a.div>
    </div>
  );
}
