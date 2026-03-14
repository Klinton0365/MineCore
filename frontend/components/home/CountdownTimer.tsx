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

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[var(--color-text-muted)]">OFFER ENDS IN:</span>
      <div className="flex gap-1">
        {[
          { value: time.hours, label: 'H' },
          { value: time.minutes, label: 'M' },
          { value: time.seconds, label: 'S' },
        ].map((unit, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="bg-[var(--color-accent-blue)] text-white text-sm font-bold px-2 py-1 rounded min-w-[2rem] text-center">
              {String(unit.value).padStart(2, '0')}
            </span>
            {i < 2 && <span className="text-[var(--color-accent-blue)] font-bold">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
