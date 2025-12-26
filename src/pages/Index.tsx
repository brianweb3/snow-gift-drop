import { useState } from 'react';
import { SnowfallAnimation } from '@/components/SnowfallAnimation';
import { HeroSection } from '@/components/HeroSection';
import { WalletSection } from '@/components/WalletSection';
import { HoldersPool } from '@/components/HoldersPool';
import { RewardMilestones } from '@/components/RewardMilestones';
import { MetricsSection } from '@/components/MetricsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = () => {
    // Mock wallet connection
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
        
        <RewardMilestones />
        
        <MetricsSection />
        
        <Footer />
      </main>
    </div>
  );
};

export default Index;
