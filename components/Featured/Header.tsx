import { useEffect, useRef } from "react";

export default function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          el.classList.add("home-reel-title--visible");
          hasAnimatedRef.current = true;
          // Disconnect observer once animation has been triggered
          observer.disconnect();
        }
      },
      {
        threshold: 0.3, // tweak: how much needs to be visible to trigger
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h4
      id="home-reel-title"
      ref={titleRef}
      className="home-reel-title font-Aeonik"
    >
      <div id="home-reel-title-inner" className="home-reel-title-inner">
        <div className="home-reel-title-line-wrapper wrapper-1">
          <div
            id="home-reel-title-line-1"
            className="home-reel-title-line home-reel-title-line-1"
          >
            Beyond Visions
          </div>
        </div>

        <div className="home-reel-title-line-wrapper wrapper-2">
          <div
            id="home-reel-title-line-2"
            className="home-reel-title-line home-reel-title-line-2"
          >
            Within Reach
          </div>
        </div>
      </div>
    </h4>
  );
}
