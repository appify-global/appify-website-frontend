"use client";
import React, { useState } from "react";
import { Tags } from "./Tags";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";
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
  const isMobile = useIsMobile(TAB_BRAKEPOINT);

  return (
    <div className="font-[Aeonik] relative">
      {/* Background Blur Overlay (only visible when modal open) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/30 z-40"
          onClick={() => setIsModalOpen(false)}
        />
      )}

      {isMobile && (
        <p className="text-[5vw] leading-relaxed  text-black margin-auto mb-6 -mt-10 px-[14px] font-medium ">
          Enterprise software, AI-powered apps, and custom solutions built by a
          global team that turns ambitious visions into reality.
        </p>
      )}

      {/* Main Hero Card */}
      <div
        className="
          flex flex-col lg:flex-row
          bg-gray-400/10
          backdrop-blur-[90px]
          rounded-[28px]
          border-2 border-white/50
          py-4 px-[14px] lg:py-8 lg:px-8
          bg-clip-padding backdrop-filter bg-opacity-20 border border-gray-300
          relative z-10
          w-full
          lg:h-[calc(100vh-12vw-80px)]
          min-h-[600px]
        "
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-40 pointer-events-none rounded-[28px]" />

        {/* Left Section */}
        <div className="lg:w-[60%] p-4 lg:p-8 flex flex-col justify-center space-y-6 lg:space-y-8">
          <h1 className="leading-tight text-[12vw] md:text-[8vw] lg:text-[4.5vw] tracking-normal">
            We Transform <br /> Ideas Into Successful <br /> Tech Products
          </h1>

          {isMobile ? (
            <p className="text-[3vw] tracking-normal mb-2 font-Aeonik">
              {tags.join(" • ").toUpperCase()}
            </p>
          ) : (
            <div className="flex flex-wrap gap-3 max-w-[700px]">
              {tags.map((tag, index) => (
                <Tags key={index} label={tag} />
              ))}
            </div>
          )}

          {!isMobile && (
            <p className="leading-relaxed max-w-[700px] text-[1vw]">
              Enterprise software, AI-powered apps, and custom solutions built
              by a global team that turns ambitious visions into reality.
            </p>
          )}

          <div >
            <div
              className="lg:hidden w-full"
              onClick={() => setIsModalOpen(true)}
            >
              <Button
                text="FREE DISCOVERY CALL"
                variant="white"
              />
            </div>
            <div
              className="lg:hidden w-full uppercase mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              <Button
                text="Get Your Free Development Strategy"
                variant="black"
              />
            </div>
          </div>

          <div className="flex justify-left w-full mt-2 lg:mt-0">
            <div className="hidden lg:flex w-full">
              <DotButton text="FREE DISCOVERY CALL" variant="white" className="free-discovery-call-btn" />
            </div>
          </div>
        </div>

        {/* Right Section - Form visible only on large screens */}
        <div className="hidden lg:flex lg:w-[40%] p-6 lg:p-8 flex-col justify-start space-y-6 overflow-y-auto max-h-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Apply for a Free Development Strategy!
          </h2>
          <Form submitBtnVariant="black" />
        </div>
      </div>

      {/* Popup Modal for Mobile */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-gray-400/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Apply for a Free Development Strategy!
            </h2>
            <Form submitBtnVariant={"white"} />
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
  <form className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="mb-2 font-medium">
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="John"
          className="w-full p-3 bg-[#e9e9f3] text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="lastName" className="mb-2 font-medium">
          Last Name *
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Doe"
          className="w-full p-3 bg-[#e9e9f3] text-gray-800 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
        />
      </div>
    </div>

    <div className="flex flex-col">
      <label htmlFor="email" className="mb-2 font-medium">
        Email *
      </label>
      <input
        type="email"
        id="email"
        placeholder="johnsmith@email.com"
        className="w-full p-3 bg-[#e9e9f3] text-gray-800 placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="company" className="mb-2 font-medium">
        Company (Optional)
      </label>
      <input
        type="text"
        id="company"
        placeholder="Nike"
        className="w-full p-3 bg-[#e9e9f3] text-gray-800 placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
      />
    </div>

    <div className="flex flex-col mb-5">
      <label htmlFor="nda" className="mb-2 font-medium">
        Would you like an NDA?
      </label>
      <select
        id="nda"
        className="w-full p-3 bg-[#e9e9f3] text-gray-800 backdrop-blur-sm focus:outline-none focus:border-black border-b border-gray-300"
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
