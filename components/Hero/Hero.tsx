"use client";
import React, { useState } from "react";
import { Tags } from "./Tags";
import Button from "../ui/Button";
import DotButton from "../ui/DotButton";

const tags = [
  "Custom Software & ERP Development",
  "AI & Machine Learning Integration",
  "Digital Transformation Consulting",
  "UI/UX Design & Strategy",
];

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            We Transform <br /> Ideas Into Successful <br /> Tech Products
          </h1>

          {/* Tags - pills on all sizes */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 max-w-[700px]">
            {tags.map((tag, index) => (
              <Tags key={index} label={tag} />
            ))}
          </div>

          {/* Description - visible on tablet+ */}
          <p className="leading-relaxed max-w-[420px] text-[3.5vw] sm:text-[3vw] md:text-[2vw] lg:text-[1vw]">
            Enterprise software, AI-powered apps, and custom solutions built
            by a global team that turns ambitious visions into reality.
          </p>

          <div>
            <div
              className="md:hidden w-full"
              onClick={() => setIsModalOpen(true)}
            >
              <Button
                text="FREE DISCOVERY CALL"
                variant="white"
              />
            </div>
            <div
              className="md:hidden w-full uppercase mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              <Button
                text="Get Your Free Development Strategy"
                variant="black"
              />
            </div>
          </div>

          <div className="flex justify-left w-full -mt-1 lg:-mt-2">
            <div className="hidden md:flex w-full">
              <DotButton text="FREE DISCOVERY CALL" variant="white" className="free-discovery-call-btn" />
            </div>
          </div>
        </div>

        {/* Right Section - Form visible only on large screens */}
        <div className="hidden lg:flex lg:w-[40%] p-4 lg:p-6 flex-col justify-center space-y-4 overflow-y-auto max-h-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Apply for a free Development Strategy!
          </h2>
          <Form submitBtnVariant="black" />
        </div>
      </div>

      {/* Popup Modal for Mobile */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-gray-400/10 backdrop-blur-2xl border border-white/30 rounded-t-3xl sm:rounded-3xl w-full sm:w-[90%] max-w-md relative max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-5 pb-2 sm:px-6 sm:pt-6 sm:pb-3">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 pr-6">
                Apply for a Free Development Strategy!
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl flex-shrink-0"
              >
                &times;
              </button>
            </div>
            <div
              className="overflow-y-auto overscroll-contain px-5 pb-3 sm:px-6 sm:pb-6"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <Form submitBtnVariant={"white"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Form = ({
  submitBtnVariant,
}: {
  submitBtnVariant: "black" | "white";
}) => (
  <form className="space-y-2 sm:space-y-3">
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="John"
          className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#e9e9f3] text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
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
          className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#e9e9f3] text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
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
        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#e9e9f3] text-gray-800 placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
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
        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#e9e9f3] text-gray-800 placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
      />
    </div>

    <div className="flex flex-col mb-2 sm:mb-3">
      <label htmlFor="nda" className="mb-0.5 sm:mb-1 font-medium text-sm sm:text-base">
        Would you like an NDA?
      </label>
      <select
        id="nda"
        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[#e9e9f3] text-gray-800 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
      >
        <option>Yes</option>
        <option>No</option>
        <option>Maybe later</option>
      </select>
    </div>

    <DotButton text="Get Your Free Development Strategy" variant={submitBtnVariant} />
  </form>
);

export default Hero;
