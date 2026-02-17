"use client";

import Link from "next/link";
import { Service } from "@/lib/data/services";

interface ServiceLinkProps {
  service: Service;
  showArrow?: boolean;
}

const ServiceLink = ({ service, showArrow = true }: ServiceLinkProps) => {
  return (
    <Link
      href={service.href}
      className="group flex items-center gap-2 sm:gap-3 py-3 lg:py-2 transition-colors duration-300"
    >
      {showArrow && (
        <span className="flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 lg:w-6 lg:h-6 rounded-full border border-[#2B2E3A]/20 group-hover:border-[rgb(242,48,132)] group-hover:bg-[rgb(242,48,132)] transition-all duration-300">
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#2B2E3A] group-hover:text-white transition-colors duration-300"
          >
            <path
              d="M3 8H13M13 8L8 3M13 8L8 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      <span className="font-Aeonik text-[clamp(0.95rem,1.5vw,1.25rem)] text-[#2B2E3A] group-hover:text-[rgb(242,48,132)] transition-colors duration-300">
        {service.name}
      </span>
    </Link>
  );
};

export default ServiceLink;

