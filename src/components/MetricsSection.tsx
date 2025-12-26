import { Coins, Send, Wallet, Users } from 'lucide-react';

interface MetricCard {
  icon: React.ElementType;
  label: string;
  value: string;
}

const METRICS: MetricCard[] = [
  { icon: Coins, label: "Total SOL Distributed", value: "24.5 SOL" },
  { icon: Send, label: "Total Rewards Sent", value: "156" },
  { icon: Wallet, label: "Current Reward Pool", value: "1.2 SOL" },
  { icon: Users, label: "Total Unique Winners", value: "89" },
];

export const MetricsSection = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-sm font-medium text-foreground text-center mb-6">
          Protocol Stats
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {METRICS.map((metric, index) => (
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
