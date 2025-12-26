import { useState, useEffect, useCallback } from 'react';
import { SnowfallAnimation } from '@/components/SnowfallAnimation';
import { HeroSection } from '@/components/HeroSection';
import { WalletSection } from '@/components/WalletSection';
import { HoldersPool } from '@/components/HoldersPool';
import { RewardMilestones } from '@/components/RewardMilestones';
import { MetricsSection, type ProtocolStats } from '@/components/MetricsSection';
import { Footer } from '@/components/Footer';
import { AdminPanel, type Milestone } from '@/components/AdminPanel';
import { usePhantomWallet } from '@/hooks/usePhantomWallet';

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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>(DEFAULT_MILESTONES);
  const [stats, setStats] = useState<ProtocolStats>(DEFAULT_STATS);
  
  const { 
    publicKey, 
    connected, 
    connecting, 
    balance, 
    wallets, 
    connect, 
    disconnect 
  } = usePhantomWallet();

  // Keyboard shortcut: Ctrl+Shift+A
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
      e.preventDefault();
      setIsAdminOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen winter-gradient relative">
      <SnowfallAnimation />
      
      <main className="relative z-10">
        <HeroSection 
          isConnected={connected}
          isConnecting={connecting}
          onConnectWallet={connect}
          onDisconnect={disconnect}
        />
        
        <WalletSection
          isConnected={connected}
          walletAddress={publicKey || ""}
          balance={balance}
          isEligible={balance > 0}
        />
        
        <HoldersPool 
          wallets={wallets} 
          connectedWallet={publicKey} 
        />
        
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
