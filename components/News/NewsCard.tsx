"use client";

import { NewsArticle } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface NewsCardProps {
  article: NewsArticle;
}

// Four-dot grid pattern (dark version)
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-[5px] w-[13px] ${className}`}>
      <div className="w-[4px] h-[4px] bg-[rgba(0,0,0,0.6)]" />
      <div className="w-[4px] h-[4px] bg-[rgba(0,0,0,0.6)]" />
      <div className="w-[4px] h-[4px] bg-[rgba(0,0,0,0.6)]" />
      <div className="w-[4px] h-[4px] bg-[rgba(0,0,0,0.6)]" />
    </div>
  );
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="block group"
    >
      {/* Desktop Layout */}
      <article className="hidden lg:flex gap-8 py-12 border-b border-[rgba(0,0,0,0.1)]">
        {/* Thumbnail */}
        <div className="relative w-[392px] h-[223px] rounded-[24px] overflow-hidden flex-shrink-0">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 py-2">
          {/* Top Content */}
          <div>
            {/* Category */}
            <p className="font-Aeonik text-[23px] tracking-[-0.01em] text-black mb-4">
              {article.category}
            </p>

            {/* Title */}
            <h3 className="font-Aeonik text-[38px] leading-[1.05] text-black mb-4 max-w-[900px]">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="font-Aeonik text-[23px] leading-[1.05] tracking-[-0.01em] text-black max-w-[548px]">
              {article.excerpt}
            </p>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-6">
            {/* Author Info */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <DotGrid />
                <span className="font-Aeonik text-[22px] tracking-[-0.02em] text-[rgba(0,0,0,0.6)]">
                  {article.author}
                </span>
              </div>
              <span className="font-Aeonik text-[13px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.6)] ml-8">
                {article.timestamp}
              </span>
            </div>

            {/* More Link */}
            <div className="flex items-center gap-4 text-black group-hover:text-[#f23084] transition-colors">
              <FaArrowRight size={16} />
              <span className="font-Aeonik text-[23px] tracking-[-0.01em]">
                more
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Mobile Layout */}
      <article className="lg:hidden py-6">
        {/* Category */}
        <p className="font-Aeonik text-base tracking-[-0.01em] text-black mb-2">
          {article.category}
        </p>

        {/* Thumbnail */}
        <div className="relative w-full h-[209px] rounded-[8px] overflow-hidden mb-4">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Title */}
        <h3 className="font-Aeonik text-[22px] leading-[1.05] text-black mb-4">
          {article.title}
        </h3>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-[3px] w-[9px]">
              <div className="w-[2.7px] h-[2.7px] bg-[rgba(0,0,0,0.6)]" />
              <div className="w-[2.7px] h-[2.7px] bg-[rgba(0,0,0,0.6)]" />
              <div className="w-[2.7px] h-[2.7px] bg-[rgba(0,0,0,0.6)]" />
              <div className="w-[2.7px] h-[2.7px] bg-[rgba(0,0,0,0.6)]" />
            </div>
            <span className="font-Aeonik text-[15px] tracking-[-0.02em] text-[rgba(0,0,0,0.6)]">
              {article.author}
            </span>
          </div>

          {/* Timestamp */}
          <span className="font-Aeonik text-[9px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.6)]">
            {article.timestamp}
          </span>
        </div>
      </article>
    </Link>
  );
}

