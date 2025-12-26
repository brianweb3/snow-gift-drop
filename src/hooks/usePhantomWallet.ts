import { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface WalletData {
  id: string;
  wallet_address: string;
  sol_balance: number;
  created_at: string;
}

export const usePhantomWallet = () => {
  const { publicKey, connected, connect, disconnect, connecting } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWallets = useCallback(async () => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching wallets:', error);
      return;
    }
    
    setWallets(data || []);
  }, []);

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !connection) return 0;
    
    try {
      const balanceInLamports = await connection.getBalance(publicKey);
      return balanceInLamports / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  }, [publicKey, connection]);

  const saveWallet = useCallback(async (address: string, solBalance: number) => {
    const { error } = await supabase
      .from('wallets')
      .upsert({
        wallet_address: address,
        sol_balance: solBalance,
      }, {
        onConflict: 'wallet_address'
      });
    
    if (error) {
      console.error('Error saving wallet:', error);
      return false;
    }
    
    return true;
  }, []);

  // Fetch wallets on mount and set up realtime subscription
  useEffect(() => {
    fetchWallets();

    const channel = supabase
      .channel('wallets-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wallets'
        },
        () => {
          fetchWallets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchWallets]);

  // Handle wallet connection
  useEffect(() => {
    const handleConnection = async () => {
      if (connected && publicKey) {
        setIsLoading(true);
        const solBalance = await fetchBalance();
        setBalance(solBalance);
        
        const saved = await saveWallet(publicKey.toBase58(), solBalance);
        if (saved) {
          toast({
            description: "Wallet connected and saved!",
          });
          fetchWallets();
        }
        setIsLoading(false);
      }
    };

    handleConnection();
  }, [connected, publicKey, fetchBalance, saveWallet, fetchWallets]);

  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        description: "Failed to connect wallet. Please install Phantom.",
        variant: "destructive",
      });
    }
  }, [connect]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      setBalance(0);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }, [disconnect]);

  return {
    publicKey: publicKey?.toBase58() || null,
    connected,
    connecting,
    balance,
    wallets,
    isLoading,
    connect: handleConnect,
    disconnect: handleDisconnect,
    refreshWallets: fetchWallets,
  };
};
