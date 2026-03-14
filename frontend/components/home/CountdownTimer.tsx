'use client';

import { useEffect, useState } from 'react';

function getTimeRemaining(targetDate: string) {
  const total = new Date(targetDate).getTime() - Date.now();
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor(total / (1000 * 60 * 60)),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'HRS', value: time.hours },
    { label: 'MIN', value: time.minutes },
    { label: 'SEC', value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">
        Offer ends in:
      </span>
      <div className="flex items-center gap-1.5">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-1.5">
            <span
              className={`glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                unit.label === 'SEC' ? 'animate-pulse-slow' : ''
              }`}
            >
              <span className="text-sm font-bold text-white tabular-nums font-mono tracking-wider">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-semibold text-text-muted tracking-widest">
                {unit.label}
              </span>
            </span>
            {i < units.length - 1 && (
              <span className="text-white/20 text-[10px]">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
