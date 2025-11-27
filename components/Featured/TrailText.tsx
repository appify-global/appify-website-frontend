import React, { useEffect } from "react";
import { useTrail, a, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export const Trail = ({ children, callback, ...props }: any) => {
  const items = React.Children.toArray(children);
  const [ref, open] = useInView({ rootMargin: "-50px 0px" });
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 20,
    from: { opacity: 0, y: 20 },
    onRest: () => callback?.(open),
  });

  return (
    <div {...props} ref={ref}>
      {trail.map((style, index) => (
        <a.div key={index} style={{ transform: style.y.to((y) => `translateY(${y}px)`), opacity: style.opacity }}>
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};
