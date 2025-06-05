"use client";
import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface ConfettiEffectProps {
  active: boolean;
}

const ConfettiEffect: FC<ConfettiEffectProps> = ({ active }) => {
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
        },
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]); // Clear particles after animation duration
      }, 3000); // Match animation duration in globals.css

      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [active]);

  if (!active || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className={`confetti-particle ${p.id % 3 === 0 ? 'accent' : ''}`}
          style={p.style}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
