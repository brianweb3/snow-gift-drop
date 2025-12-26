import { useState, useEffect, useCallback } from 'react';
import { Trophy, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface Winner {
  id: string;
  wallet_address: string;
  transaction_hash: string;
  reward_amount: string;
  created_at: string;
}

export const WinnersPanel = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWinners = useCallback(async () => {
    const { data, error } = await supabase
      .from('winners')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching winners:', error);
      return;
    }
    
    setWinners(data || []);
  }, []);

  useEffect(() => {
    fetchWinners();

    const channel = supabase
      .channel('winners-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'winners'
        },
        () => {
          fetchWinners();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchWinners]);

  const formatAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTxHash = (hash: string) => {
    if (hash.length <= 12) return hash;
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const filteredWinners = winners.filter(winner =>
    winner.wallet_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    winner.transaction_hash.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-medium text-foreground">Winners</h2>
        <span className="text-xs text-muted-foreground">({winners.length})</span>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search wallet or tx..."
          className="pl-9 h-9 text-xs"
        />
      </div>

      {/* Winners List */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
          <span>Wallet</span>
          <span className="text-center">Reward</span>
          <span className="text-right">Tx</span>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {filteredWinners.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No winners yet
            </div>
          ) : (
            filteredWinners.map((winner) => (
              <div
                key={winner.id}
                className="grid grid-cols-3 gap-2 p-3 border-b border-border/50 last:border-0 hover:bg-primary/5 transition-colors"
              >
                <a
                  href={`https://solscan.io/account/${winner.wallet_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {formatAddress(winner.wallet_address)}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
                
                <span className="text-xs text-primary font-medium text-center">
                  {winner.reward_amount}
                </span>
                
                <a
                  href={`https://solscan.io/tx/${winner.transaction_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-end gap-1"
                >
                  {formatTxHash(winner.transaction_hash)}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
