interface HoldersPoolProps {
  connectedWallet: string | null;
}

const MOCK_HOLDERS = [
  "8xKq...4nRt",
  "3mPw...9sTq",
  "5vNj...2kLp",
  "9aBc...7mXz",
  "1dEf...6oWy",
  "4gHi...8pVu",
  "7jKl...3qSn",
  "2mNo...5rTo",
];

export const HoldersPool = ({ connectedWallet }: HoldersPoolProps) => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-sm font-medium text-foreground text-center mb-4">
          Reward Pool Holders
        </h2>
        
        <div className="glass rounded-xl p-4">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {MOCK_HOLDERS.map((holder, index) => {
              const isConnected = connectedWallet && holder === `${connectedWallet.slice(0, 4)}...${connectedWallet.slice(-4)}`;
              
              return (
                <div
                  key={index}
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
                  <span className="text-xs font-mono text-foreground">
                    {holder}
                  </span>
                  {isConnected && (
                    <span className="text-[10px] text-primary ml-auto">You</span>
                  )}
                </div>
              );
            })}
          </div>
          
          <p className="text-[10px] text-muted-foreground text-center mt-3 pt-3 border-t border-border">
            {MOCK_HOLDERS.length} wallets in current pool
          </p>
        </div>
      </div>
    </section>
  );
};
