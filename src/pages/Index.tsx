import { useState, useEffect, useCallback } from 'react';
import { SnowfallAnimation } from '@/components/SnowfallAnimation';
import { HeroSection } from '@/components/HeroSection';
import { WalletSection } from '@/components/WalletSection';
import { HoldersPool } from '@/components/HoldersPool';
import { RewardMilestones } from '@/components/RewardMilestones';
import { MetricsSection, type ProtocolStats } from '@/components/MetricsSection';
import { Footer } from '@/components/Footer';
import { AdminPanel, type Milestone } from '@/components/AdminPanel';

const DEFAULT_MILESTONES: Milestone[] = [
  { id: '1', cap: "$50k", reward: "0.5 SOL", completed: false },
  { id: '2', cap: "$150k", reward: "1 SOL", completed: false },
  { id: '3', cap: "$300k", reward: "2 SOL", completed: false },
  { id: '4', cap: "$500k", reward: "3 SOL", completed: false },
  { id: '5', cap: "$1M", reward: "5 SOL", completed: false },
  { id: '6', cap: "$5M", reward: "10 SOL", completed: false },
];

const DEFAULT_STATS: ProtocolStats = {
  totalSolDistributed: "0 SOL",
  totalRewardsSent: "0",
  currentRewardPool: "0 SOL",
  totalUniqueWinners: "0",
};

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>(DEFAULT_MILESTONES);
  const [stats, setStats] = useState<ProtocolStats>(DEFAULT_STATS);

  // Keyboard shortcut: Ctrl+Shift+A
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      setIsAdminOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleConnectWallet = () => {
    if (!isConnected) {
      const mockAddress = "8xKqwerty1234567890abcdef4nRt";
      setWalletAddress(mockAddress);
      setIsConnected(true);
    } else {
      setWalletAddress("");
      setIsConnected(false);
    }
  };

  return (
    <div className="min-h-screen winter-gradient relative">
      <SnowfallAnimation />
      
      <main className="relative z-10">
        <HeroSection 
          isConnected={isConnected} 
          onConnectWallet={handleConnectWallet} 
        />
        
        <WalletSection
          isConnected={isConnected}
          walletAddress={walletAddress}
          balance={125000}
          isEligible={true}
        />
        
        <HoldersPool connectedWallet={isConnected ? walletAddress : null} />
        
        <RewardMilestones milestones={milestones} />
        
        <MetricsSection stats={stats} />
        
        <Footer />
      </main>

      {/* Hidden Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        milestones={milestones}
        onUpdateMilestones={setMilestones}
        stats={stats}
        onUpdateStats={setStats}
      />
    </div>
  );
};

export default Index;
