"use client";

import { NewsArticle } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface FeaturedNewsCarouselProps {
  articles: NewsArticle[];
}

// Four-dot grid pattern
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-[4px] w-[11px] ${className}`}>
      <div className="w-[3.3px] h-[3.3px] bg-white" />
      <div className="w-[3.3px] h-[3.3px] bg-white" />
      <div className="w-[3.3px] h-[3.3px] bg-white" />
      <div className="w-[3.3px] h-[3.3px] bg-white" />
    </div>
  );
}

function FeaturedCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="block relative w-full h-[430px] md:h-[420px] lg:h-[420px] xl:h-[450px] rounded-[16px] md:rounded-[20px] overflow-hidden group"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[rgba(50,50,50,0.35)]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 lg:p-5 text-white">
        {/* Category Tag */}
        <p className="font-Aeonik text-[14px] tracking-[0.08em] uppercase lg:text-base lg:tracking-[-0.02em] lg:normal-case">
          {article.category}
        </p>

        {/* Bottom Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-Aeonik text-[24px] leading-[1.15] lg:text-[22px] xl:text-[26px] lg:leading-[1.1]">
            {article.title}
          </h3>

          {/* Author & More */}
          <div className="flex items-center justify-between pt-1">
            {/* Author Info */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <DotGrid />
                <span className="font-Aeonik text-sm lg:text-sm tracking-[-0.02em]">
                  {article.author}
                </span>
              </div>
              <span className="font-Aeonik text-[9px] lg:text-[10px] tracking-[0.1em] uppercase opacity-80 ml-5">
                {article.timestamp}
              </span>
            </div>

            {/* More Link */}
            <div className="hidden lg:flex items-center gap-2">
              <FaArrowRight size={12} />
              <span className="font-Aeonik text-sm lg:text-base tracking-[-0.01em]">
                more
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedNewsCarousel({
  articles,
}: FeaturedNewsCarouselProps) {
  return (
    <div className="w-full mt-4 lg:mt-6">
      {/* Section Label */}
      <p className="font-Aeonik text-xl md:text-xl lg:text-2xl leading-tight text-black mb-4 lg:mb-6 tracking-wide">
        MOST POPULAR
      </p>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden relative -mx-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4">
          {articles.map((article, i) => (
            <div key={article.id} className="flex-shrink-0 w-[85vw]">
              <FeaturedCard article={article} />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet: 2-col grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 3).map((article, i) => (
          <FeaturedCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
