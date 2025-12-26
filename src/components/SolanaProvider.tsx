import { useMemo, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=c5040336-825d-42e6-a592-59ef6633316c";

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider = ({ children }: SolanaProviderProps) => {
  const endpoint = useMemo(() => HELIUS_RPC, []);
  
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
