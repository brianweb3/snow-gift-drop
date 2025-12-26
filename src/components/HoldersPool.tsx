import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { WalletData } from '@/hooks/usePhantomWallet';

interface HoldersPoolProps {
  wallets: WalletData[];
  connectedWallet: string | null;
}

export const HoldersPool = ({ wallets, connectedWallet }: HoldersPoolProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWallets = wallets.filter(wallet =>
    wallet.wallet_address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: number) => {
    return balance.toFixed(4);
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-sm font-medium text-foreground text-center mb-4">
          Reward Pool Holders
        </h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Find wallet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        
        <div className="glass rounded-xl p-4">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredWallets.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                {searchQuery ? 'No wallets found' : 'No wallets connected yet'}
              </p>
            ) : (
              filteredWallets.map((wallet, index) => {
                const isConnected = connectedWallet === wallet.wallet_address;
                
                return (
                  <div
                    key={wallet.id}
                    className={`
                      flex items-center gap-3 p-2 rounded-lg transition-colors
                      ${isConnected ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/30'}
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium
                      ${isConnected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                    `}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-mono text-foreground">
                        {formatAddress(wallet.wallet_address)}
                      </span>
                      <p className="text-[10px] text-muted-foreground">
                        {formatBalance(wallet.sol_balance)} SOL
                      </p>
                    </div>
                    
                    <a
                      href={`https://solscan.io/account/${wallet.wallet_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    
                    {isConnected && (
                      <span className="text-[10px] text-primary">You</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          <p className="text-[10px] text-muted-foreground text-center mt-3 pt-3 border-t border-border">
            {filteredWallets.length} wallet{filteredWallets.length !== 1 ? 's' : ''} in pool
          </p>
        </div>
      </div>
    </section>
  );
};
