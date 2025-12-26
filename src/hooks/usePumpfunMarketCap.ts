import { useState, useEffect, useRef, useCallback } from 'react';

const UPDATE_INTERVAL = 15000; // 15 seconds
const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex/tokens';

interface DexScreenerResponse {
  pairs: Array<{
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
      address: string;
      name: string;
      symbol: string;
    };
    quoteToken: {
      address: string;
      name: string;
      symbol: string;
    };
    priceNative: string;
    priceUsd: string;
    txns: {
      m5: { buys: number; sells: number };
      h1: { buys: number; sells: number };
      h6: { buys: number; sells: number };
      h24: { buys: number; sells: number };
    };
    volume: {
      h24: number;
      h6: number;
      h1: number;
      m5: number;
    };
    priceChange: {
      m5: number;
      h1: number;
      h6: number;
      h24: number;
    };
    liquidity?: {
      usd?: number;
      base?: number;
      quote?: number;
    };
    fdv?: number;
    marketCap?: number;
    pairCreatedAt?: number;
  }>;
}

/**
 * Format market cap value to display format
 */
const formatMarketCap = (value: number | null | undefined): string => {
  if (!value || value === 0) return '$0';
  
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

/**
 * Hook to fetch and update market cap from Pump.fun token
 * @param tokenAddress - The Solana token address (Contract Address)
 */
export const usePumpfunMarketCap = (tokenAddress: string) => {
  const [marketCap, setMarketCap] = useState<string>('$0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const fetchMarketCap = useCallback(async () => {
    if (!tokenAddress || tokenAddress.trim() === '') {
      setMarketCap('$0');
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      
      const response = await fetch(`${DEXSCREENER_API}/${tokenAddress}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data: DexScreenerResponse = await response.json();
      
      if (!data.pairs || data.pairs.length === 0) {
        throw new Error('No pairs found for token');
      }

      // Find the most liquid pair (usually the main trading pair)
      const mainPair = data.pairs.reduce((prev, current) => {
        const prevLiquidity = prev.liquidity?.usd || 0;
        const currentLiquidity = current.liquidity?.usd || 0;
        return currentLiquidity > prevLiquidity ? current : prev;
      });

      // Use marketCap if available, otherwise use fdv (fully diluted valuation)
      const marketCapValue = mainPair.marketCap || mainPair.fdv || 0;
      
      setMarketCap(formatMarketCap(marketCapValue));
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching market cap:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch market cap');
      setIsLoading(false);
      // Keep the last value on error, don't reset to $0
    }
  }, [tokenAddress]);

  useEffect(() => {
    // Clear previous interval if exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset state when token address changes
    setMarketCap('$0');
    setIsLoading(true);
    setError(null);

    // Fetch immediately when token address is available
    if (tokenAddress && tokenAddress.trim() !== '') {
      fetchMarketCap();

      // Set up interval for periodic updates
      intervalRef.current = setInterval(() => {
        fetchMarketCap();
      }, UPDATE_INTERVAL);
    } else {
      setIsLoading(false);
    }

    // Cleanup interval on unmount or when token address changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchMarketCap, tokenAddress]);

  return { marketCap, isLoading, error };
};

