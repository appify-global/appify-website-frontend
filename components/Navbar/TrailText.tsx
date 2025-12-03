import React, { ReactNode } from 'react'
import { useTrail, a } from '@react-spring/web'

interface TrailProps {
  open: boolean;
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const Trail = ({ open, children, ...props }: TrailProps) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    // config: { mass: 1, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    transform: `rotate(0deg)`,
    y: 0,
    from: { opacity: 0, y: 20, transform: `rotate(4deg)` },
  })
  return (
    <div {...props}>
      {trail.map(({ ...style }, index) => (
        <a.div key={index} style={style}>
          {items[index]}
        </a.div>
      ))}
    </div>
  )
}

