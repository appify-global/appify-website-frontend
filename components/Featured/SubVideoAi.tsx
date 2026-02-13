import FeaturedVideo from "./FeaturedVideo";

interface SubVideoTextAiProps {
  ref?: React.RefObject<HTMLElement | null>;
}

const SubVideoTextAi = ({ ref }: SubVideoTextAiProps) => {
  return (
    <div className="relative z-20 w-full flex flex-col-reverse lg:flex-row items-start justify-between mt-10 sm:mt-16 lg:mt-20 gap-6 sm:gap-8 lg:gap-10">
      {/* Video on the left (below text on mobile/tablet) */}
      <div className="w-full lg:w-1/2 z-30">
        <FeaturedVideo
          refForward={ref}
          className="lg:mt-[1rem]"
          topkeyframe={"80vh"}
          playerId="appify-ai-systems-video-player"
          disableTilt
        />
      </div>

      {/* Text on the right (on top for mobile/tablet) */}
      <div className="w-full lg:w-1/2 flex flex-col text-left z-10 font-Aeonik lg:pt-[4rem]">
        <div className="text-base sm:text-lg lg:text-2xl leading-relaxed">
          At Appify, we take on custom software development projects that others avoid or fail. Unprecedented AI implementations,
          complex ERP integrations, and automation challenges that require true innovation.
        </div>

        <div className="text-base sm:text-lg lg:text-2xl leading-relaxed mt-6 sm:mt-8 lg:mt-10">
          We don&apos;t just deliver code and disappear. Our approach centres on deep partnership with your team, transparent collaboration,
          and empowering you with knowledge throughout the development journey.
        </div>
      </div>
    </div>
  );
};

export default SubVideoTextAi;
