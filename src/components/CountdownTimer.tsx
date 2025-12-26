import { useState, useEffect } from 'react';

interface TimeUnit {
  value: number;
  label: string;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 2, label: 'Days' },
    { value: 14, label: 'Hours' },
    { value: 32, label: 'Minutes' },
    { value: 45, label: 'Seconds' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = [...prev];
        newTime[3].value -= 1;
        
        if (newTime[3].value < 0) {
          newTime[3].value = 59;
          newTime[2].value -= 1;
        }
        if (newTime[2].value < 0) {
          newTime[2].value = 59;
          newTime[1].value -= 1;
        }
        if (newTime[1].value < 0) {
          newTime[1].value = 23;
          newTime[0].value -= 1;
        }
        if (newTime[0].value < 0) {
          newTime[0].value = 0;
          newTime[1].value = 0;
          newTime[2].value = 0;
          newTime[3].value = 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {timeLeft.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-2 md:gap-4">
          <div className="glass rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px] text-center">
            <p className="text-xl md:text-2xl font-semibold text-foreground">
              {String(unit.value).padStart(2, '0')}
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
              {unit.label}
            </p>
          </div>
          {index < timeLeft.length - 1 && (
            <span className="text-muted-foreground text-lg">:</span>
          )}
        </div>
      ))}
    </div>
  );
};
