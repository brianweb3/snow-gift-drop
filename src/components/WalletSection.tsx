import { Check, AlertCircle } from 'lucide-react';

interface WalletSectionProps {
  isConnected: boolean;
  walletAddress: string;
  balance: number;
  isEligible: boolean;
}

export const WalletSection = ({ isConnected, walletAddress, balance, isEligible }: WalletSectionProps) => {
  if (!isConnected) return null;

  return (
    <section className="py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Your Wallet</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Address</span>
              <span className="text-xs font-mono text-foreground">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">SNOW Balance</span>
              <span className="text-sm font-medium text-foreground">
                {balance.toLocaleString()} SNOW
              </span>
            </div>
            
            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                {isEligible ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs text-primary">Eligible for next reward</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                      <AlertCircle className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">Not eligible yet</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
