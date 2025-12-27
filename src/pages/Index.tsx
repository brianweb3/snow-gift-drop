import { useState, useEffect, useCallback } from 'react';
import { SnowfallAnimation } from '@/components/SnowfallAnimation';
import { HeroSection } from '@/components/HeroSection';

import { HoldersPool } from '@/components/HoldersPool';

import { WinnersPanel } from '@/components/WinnersPanel';
import { Footer } from '@/components/Footer';
import { AdminPanel } from '@/components/AdminPanel';
import { usePhantomWallet } from '@/hooks/usePhantomWallet';
import { useSettings } from '@/hooks/useSettings';

const Index = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const { 
    publicKey, 
    connected, 
    connecting, 
    balance, 
    wallets, 
    connect, 
    disconnect 
  } = usePhantomWallet();

  const {
    milestones,
    stats,
    contractAddress,
    isLoading,
    updateSettings,
  } = useSettings();

  // Keyboard shortcut: Ctrl+Shift+A (works with both English and Russian layouts)
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

  if (isLoading) {
    return (
      <div className="min-h-screen winter-gradient flex items-center justify-center">
        <SnowfallAnimation />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen winter-gradient relative">
      <SnowfallAnimation />
      
      <main className="relative z-10">
        <HeroSection 
          isConnected={connected}
          isConnecting={connecting}
          walletAddress={publicKey}
          onConnectWallet={connect}
          onDisconnect={disconnect}
          stats={stats}
          milestones={milestones}
          contractAddress={contractAddress}
        />
        
        {/* Two columns: Holders Pool + Winners */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <HoldersPool 
              wallets={wallets} 
              connectedWallet={publicKey} 
            />
            <WinnersPanel />
          </div>
        </section>
        
        <Footer />
      </main>

      {/* Hidden Admin Panel - Ctrl+Shift+A */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        milestones={milestones}
        stats={stats}
        contractAddress={contractAddress}
        onSave={updateSettings}
      />
    </div>
  );
};

export default Index;
