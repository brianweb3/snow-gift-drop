import { Gift, Snowflake } from 'lucide-react';

export const SnowGlobe = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      {/* Globe outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-border/30 glass animate-glow" />
      
      {/* Globe inner content */}
      <div className="absolute inset-4 rounded-full glass-strong flex flex-col items-center justify-center overflow-hidden">
        {/* Floating snowflakes inside globe */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <Snowflake
              key={i}
              className="absolute text-winter-silver/40 animate-snowfall"
              size={8 + Math.random() * 8}
              style={{
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        {/* Gift icon */}
        <div className="relative z-10 mb-3 animate-float">
          <Gift className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
        </div>
        
        {/* Text content */}
        <div className="relative z-10 text-center px-4">
          <p className="text-xs text-muted-foreground mb-1">Next Gift at</p>
          <p className="text-lg md:text-xl font-semibold text-foreground">$150k Market Cap</p>
        </div>
      </div>
      
      {/* Base */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-border/50 rounded-full blur-sm" />
    </div>
  );
};
