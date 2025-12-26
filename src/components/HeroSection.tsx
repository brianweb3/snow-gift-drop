import { Wallet, Copy, Coins, Send, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SnowGlobe } from './SnowGlobe';
import { toast } from '@/hooks/use-toast';
import type { ProtocolStats } from './MetricsSection';

interface HeroSectionProps {
  isConnected: boolean;
  isConnecting: boolean;
  onConnectWallet: () => void;
  onDisconnect: () => void;
  stats?: ProtocolStats;
}

const CONTRACT_ADDRESS = "SNOWgift...1234abcd";

// X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DEFAULT_STATS: ProtocolStats = {
  totalRewardsSent: "0",
  currentRewardPool: "0 SOL",
  totalUniqueWinners: "0",
  currentMarketCap: "$0",
  nextGiftAt: "$50k Market Cap",
};

export const HeroSection = ({ isConnected, isConnecting, onConnectWallet, onDisconnect, stats = DEFAULT_STATS }: HeroSectionProps) => {
  const safeStats = stats || DEFAULT_STATS;
  
  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({
      description: "Contract address copied!",
    });
  };

  const metrics = [
    { icon: TrendingUp, label: "Market Cap", value: safeStats.currentMarketCap },
    { icon: Coins, label: "Reward Pool", value: safeStats.currentRewardPool },
    { icon: Send, label: "Rewards Sent", value: safeStats.totalRewardsSent },
    { icon: Users, label: "Winners", value: safeStats.totalUniqueWinners },
  ];

  return (
    <section className="relative py-12 md:py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">
          SNOW GIFT PROTOCOL
        </h1>
        <p className="text-sm text-muted-foreground mb-8 md:mb-12">
          Winter rewards for diamond hands
        </p>

        {/* Snow Globe */}
        <div className="mb-6">
          <SnowGlobe nextGiftAt={safeStats.nextGiftAt} />
        </div>

        {/* Protocol Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="glass rounded-lg p-2 md:p-3 text-center">
              <metric.icon className="w-4 h-4 text-primary mx-auto mb-1" strokeWidth={1.5} />
              <p className="text-sm md:text-base font-semibold text-foreground">
                {metric.value}
              </p>
              <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-wider">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={isConnected ? onDisconnect : onConnectWallet}
            variant={isConnected ? "secondary" : "default"}
            className="w-full sm:w-auto gap-2"
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4" />
            {isConnecting ? "Connecting..." : isConnected ? "Disconnect" : "Connect Wallet"}
          </Button>
          
          <Button
            variant="outline"
            onClick={copyContract}
            className="w-full sm:w-auto gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Contract
          </Button>
          
          <Button
            variant="ghost"
            asChild
            className="w-full sm:w-auto p-2"
          >
            <a href="https://x.com/snowgift" target="_blank" rel="noopener noreferrer">
              <XIcon className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
