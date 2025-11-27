import Button from "../ui/Button";
import FeaturedVideo from "./FeaturedVideo";

const SubVideoText = ({ ref }: any) => {
  return (
    <div className="relative z-20 w-full flex flex-col-reverse lg:flex-row items-start justify-between px-6 lg:px-20 mt-16 gap-8 lg:gap-16">
      <div className="lg:w-1/2 w-full z-30 mt-[10rem]">
        <FeaturedVideo refForward={ref} />
      </div>

      <div className="lg:w-1/2 w-full flex flex-col items-start text-left font-Aeonik">
        <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
          Appify partners with enterprises and startups across Australia, UAE,
          and Qatar to build custom software. From AI-powered automation and
          machine learning solutions to enterprise ERP systems and mobile
          applications, we bring unprecedented ideas to life. Serving businesses
          in Sydney, Melbourne, Brisbane, Dubai, Abu Dhabi, and Doha.
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 w-full flex justify-start">
          <Button text="ABOUT US" variant="white" />
        </div>
      </div>
    </div>
  );
};

export default SubVideoText;
