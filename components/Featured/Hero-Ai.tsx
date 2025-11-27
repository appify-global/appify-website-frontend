import { useEffect, useRef } from "react";

const HomeGoalTitle = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("home-goal-title--visible");
        } else {
          el.classList.remove("home-goal-title--visible");
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="home-goal-title"
      ref={titleRef}
      className="home-goal-title font-Aeonik"
    >
      <div className="goal-title-line-wrapper wrapper-1">
        <div className="home-goal-title-line home-goal-title-line-1">
          <span className="word">Custom</span>{" "}
          <span className="word">AI</span>{" "}
          <span className="word">Solutions</span>
        </div>
      </div>

      <div className="goal-title-line-wrapper wrapper-2">
        <div className="home-goal-title-line home-goal-title-line-2">
          <span className="word">Built</span>{" "}
          <span className="word">To</span>{" "}
          <span className="word">Scale</span>
        </div>
      </div>
    </div>
  );
};

export default HomeGoalTitle;
