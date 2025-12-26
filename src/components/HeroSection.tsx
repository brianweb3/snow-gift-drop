import { Wallet, Copy, Coins, Send, Users, TrendingUp, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SnowGlobe } from './SnowGlobe';
import { toast } from '@/hooks/use-toast';
import type { ProtocolStats } from './MetricsSection';
import type { Milestone } from './AdminPanel';

interface HeroSectionProps {
  isConnected: boolean;
  isConnecting: boolean;
  walletAddress: string | null;
  onConnectWallet: () => void;
  onDisconnect: () => void;
  stats?: ProtocolStats;
  milestones?: Milestone[];
  contractAddress: string;
}

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

export const HeroSection = ({ isConnected, isConnecting, walletAddress, onConnectWallet, onDisconnect, stats = DEFAULT_STATS, milestones = [], contractAddress }: HeroSectionProps) => {
  const safeStats = stats || DEFAULT_STATS;
  const safeMilestones = milestones || [];
  
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  const copyContract = () => {
    navigator.clipboard.writeText(contractAddress);
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
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">
            SNOW GIFT PROTOCOL
          </h1>
          <p className="text-sm text-muted-foreground">
            Winter rewards for diamond hands
          </p>
        </div>

        {/* Snow Globe + Milestones Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
          {/* Snow Globe - Left */}
          <div className="flex-shrink-0">
            <SnowGlobe nextGiftAt={safeStats.nextGiftAt} />
          </div>

          {/* Milestones - Right */}
          {safeMilestones.length > 0 && (
            <div className="w-full md:w-72 lg:w-80">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3 text-center md:text-left">
                Reward Milestones
              </p>
              <div className="space-y-2">
                {safeMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`
                      flex items-center gap-3 px-5 py-3 rounded-xl transition-all
                      ${milestone.completed 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'glass'
                      }
                    `}
                  >
                    <div className={`
                      w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                      ${milestone.completed 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {milestone.completed ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <p className={`text-sm font-medium ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {milestone.cap}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Reward: {milestone.reward}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Protocol Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 max-w-2xl mx-auto">
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
            {isConnecting 
              ? "Connecting..." 
              : isConnected && walletAddress 
                ? formatAddress(walletAddress) 
                : "Connect Wallet"}
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
