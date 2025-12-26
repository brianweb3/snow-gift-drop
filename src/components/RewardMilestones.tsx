import { Check, Lock, Gift, Sparkles } from 'lucide-react';

interface Milestone {
  cap: string;
  reward: string;
  completed: boolean;
}

const MILESTONES: Milestone[] = [
  { cap: "$50k", reward: "0.5 SOL", completed: true },
  { cap: "$150k", reward: "1 SOL", completed: false },
  { cap: "$300k", reward: "2 SOL", completed: false },
  { cap: "$500k", reward: "3 SOL", completed: false },
  { cap: "$1M", reward: "5 SOL", completed: false },
  { cap: "$5M", reward: "10 SOL", completed: false },
];

export const RewardMilestones = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-sm font-medium text-foreground text-center mb-6">
          Reward Milestones
        </h2>
        
        <div className="space-y-3">
          {MILESTONES.map((milestone, index) => (
            <div
              key={index}
              className={`
                glass rounded-xl p-4 transition-all duration-300
                ${milestone.completed ? 'border-primary/30 bg-primary/5' : 'opacity-80'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${milestone.completed 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {milestone.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                  </div>
                  
                  <div>
                    <p className={`text-sm font-medium ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {milestone.cap} Market Cap
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reward: {milestone.reward}
                    </p>
                  </div>
                </div>
                
                {milestone.completed && (
                  <div className="flex items-center gap-1 text-primary">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <Gift className="w-4 h-4 animate-float" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
