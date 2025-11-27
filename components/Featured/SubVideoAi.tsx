import FeaturedVideo from "./FeaturedVideo";

const SubVideoTextAi = ({ ref, lenis }: any) => {
  return (
    <div className="relative z-20 w-full flex flex-col-reverse lg:flex-row items-center justify-between px-2 lg:px-6 lg:px-20 mt-20 gap-10">
      {/* Video on the left (below text on mobile) */}
      <div className="w-full lg:w-1/2 z-30">
        <FeaturedVideo refForward={ref} className="mt-[-10rem]"
          topkeyframe={"80vh"}
          lenis={lenis}
          playerId="appify-ai-systems-video-player"
        />
      </div>

      {/* Text on the right (on top for mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col text-left z-10 font-Aeonik">
        <div className="text-[1.5em]">
          At Appify, we take on custom software development projects that others avoid or fail. Unprecedented AI implementations,
          complex ERP integrations, and automation challenges that require true innovation.
        </div>

        <div className="text-[1.5em] mt-10">
          We don't just deliver code and disappear. Our approach centres on deep partnership with your team, transparent collaboration,
          and empowering you with knowledge throughout the development journey.
        </div>
      </div>
    </div>
  );
};

export default SubVideoTextAi;
