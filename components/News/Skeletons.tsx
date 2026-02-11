const shimmer = "animate-pulse bg-[#E4E6EF] rounded-md";

export function FeaturedCardSkeleton() {
  return (
    <div className="w-full h-[430px] md:h-[420px] lg:h-[420px] xl:h-[450px] rounded-[16px] md:rounded-[20px] overflow-hidden bg-[#E4E6EF] animate-pulse">
      <div className="h-full flex flex-col justify-between p-6 lg:p-5">
        <div className={`${shimmer} h-4 w-16`} />
        <div>
          <div className={`${shimmer} h-6 w-3/4 mb-3`} />
          <div className={`${shimmer} h-4 w-1/2`} />
        </div>
      </div>
    </div>
  );
}

export function FeaturedCarouselSkeleton() {
  return (
    <div className="w-full mt-4 lg:mt-6">
      <div className={`${shimmer} h-6 w-40 mb-4 lg:mb-6`} />

      {/* Mobile */}
      <div className="md:hidden relative -mx-4">
        <div className="flex gap-4 pb-4 px-4">
          <div className="flex-shrink-0 w-[85vw]">
            <FeaturedCardSkeleton />
          </div>
        </div>
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2].map((i) => (
          <FeaturedCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex gap-8 py-12 border-b border-[rgba(0,0,0,0.1)] animate-pulse">
        <div className={`${shimmer} w-[392px] h-[223px] rounded-[24px] flex-shrink-0`} />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className={`${shimmer} h-5 w-20 mb-4`} />
            <div className={`${shimmer} h-8 w-3/4 mb-4`} />
            <div className={`${shimmer} h-5 w-1/2`} />
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <div className={`${shimmer} w-3 h-3 rounded-full`} />
              <div className={`${shimmer} h-4 w-24`} />
            </div>
            <div className={`${shimmer} h-4 w-16`} />
          </div>
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden md:flex lg:hidden gap-6 py-8 border-b border-[rgba(0,0,0,0.1)] animate-pulse">
        <div className={`${shimmer} w-[240px] h-[160px] rounded-[16px] flex-shrink-0`} />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className={`${shimmer} h-4 w-16 mb-2`} />
            <div className={`${shimmer} h-6 w-3/4 mb-2`} />
            <div className={`${shimmer} h-4 w-full`} />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className={`${shimmer} h-3 w-28`} />
            <div className={`${shimmer} h-3 w-12`} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden py-4 animate-pulse">
        <div className={`${shimmer} h-3 w-16 mb-3`} />
        <div className={`${shimmer} w-full h-[220px] rounded-[12px] mb-4`} />
        <div className={`${shimmer} h-6 w-3/4 mb-2`} />
        <div className={`${shimmer} h-4 w-full mb-1`} />
        <div className={`${shimmer} h-4 w-2/3 mb-4`} />
        <div className="flex items-center justify-between">
          <div className={`${shimmer} h-3 w-28`} />
          <div className={`${shimmer} h-3 w-12`} />
        </div>
      </div>
    </>
  );
}

export function NewsListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="md:divide-y md:divide-[rgba(0,0,0,0.1)] lg:divide-y-0">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}
