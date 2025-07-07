import React, { useEffect, useRef, useState } from 'react';

interface Props {
  value: number; // the new target value (can change anytime)
  duration?: number; // optional duration in ms
}

const AnimatedNumber: React.FC<Props> = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(value);

  const previousValue = useRef(value);
  const animationFrame = useRef<number>();
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const from = previousValue.current;
    const to = value;
    previousValue.current = value;
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress * (2 - progress); // easeOutQuad

      const current = Math.round(from + (to - from) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [value, duration]);

  return (
    <div style={{ fontFamily: 'monospace' }}>
<code>Total Coins: {displayValue}</code>
    </div>
  );
};

export default AnimatedNumber;
