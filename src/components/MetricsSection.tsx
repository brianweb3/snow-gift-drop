import { Coins, Send, Wallet, Users } from 'lucide-react';

export interface ProtocolStats {
  totalSolDistributed: string;
  totalRewardsSent: string;
  currentRewardPool: string;
  totalUniqueWinners: string;
}

interface MetricsSectionProps {
  stats?: ProtocolStats;
}

const DEFAULT_STATS: ProtocolStats = {
  totalSolDistributed: "0 SOL",
  totalRewardsSent: "0",
  currentRewardPool: "0 SOL",
  totalUniqueWinners: "0",
};

export const MetricsSection = ({ stats = DEFAULT_STATS }: MetricsSectionProps) => {
  const safeStats = stats || DEFAULT_STATS;
  
  const metrics = [
    { icon: Coins, label: "Total SOL Distributed", value: safeStats.totalSolDistributed },
    { icon: Send, label: "Total Rewards Sent", value: safeStats.totalRewardsSent },
    { icon: Wallet, label: "Current Reward Pool", value: safeStats.currentRewardPool },
    { icon: Users, label: "Total Unique Winners", value: safeStats.totalUniqueWinners },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-sm font-medium text-foreground text-center mb-6">
          Protocol Stats
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((metric, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <metric.icon className="w-5 h-5 text-primary mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-lg font-semibold text-foreground mb-1">
                {metric.value}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
