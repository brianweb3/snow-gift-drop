import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Milestone } from '@/components/AdminPanel';
import type { ProtocolStats } from '@/components/MetricsSection';
import type { Json } from '@/integrations/supabase/types';

const DEFAULT_MILESTONES: Milestone[] = [
  { id: '1', cap: "$50k", reward: "0.5 SOL", completed: false },
  { id: '2', cap: "$150k", reward: "1 SOL", completed: false },
  { id: '3', cap: "$300k", reward: "2 SOL", completed: false },
  { id: '4', cap: "$500k", reward: "3 SOL", completed: false },
  { id: '5', cap: "$1M", reward: "5 SOL", completed: false },
  { id: '6', cap: "$5M", reward: "10 SOL", completed: false },
];

const DEFAULT_STATS: ProtocolStats = {
  totalRewardsSent: "0",
  currentRewardPool: "0 SOL",
  totalUniqueWinners: "0",
  currentMarketCap: "$0",
};

export const useSettings = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(DEFAULT_MILESTONES);
  const [stats, setStats] = useState<ProtocolStats>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    console.log('Fetching settings from database...');
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'main')
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching settings:', error);
      setIsLoading(false);
      return;
    }
    
    if (data) {
      console.log('Settings loaded:', data);
      // Cast the JSONB data to our types through unknown
      const milestonesData = data.milestones as unknown as Milestone[];
      const statsData = data.stats as unknown as ProtocolStats;
      
      setMilestones(milestonesData || DEFAULT_MILESTONES);
      setStats(statsData || DEFAULT_STATS);
    }
    
    setIsLoading(false);
  }, []);

  const updateSettings = useCallback(async (newMilestones: Milestone[], newStats: ProtocolStats) => {
    console.log('Updating settings in database...', { newMilestones, newStats });
    
    const { error } = await supabase
      .from('settings')
      .update({
        milestones: newMilestones as unknown as Json,
        stats: newStats as unknown as Json,
      })
      .eq('id', 'main');
    
    if (error) {
      console.error('Error updating settings:', error);
      return false;
    }
    
    console.log('Settings updated successfully');
    return true;
  }, []);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Set up realtime subscription
  useEffect(() => {
    console.log('Setting up realtime subscription for settings...');
    
    const channel = supabase
      .channel('settings-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'settings',
          filter: 'id=eq.main'
        },
        (payload) => {
          console.log('Settings updated via realtime:', payload);
          const newData = payload.new as { milestones: Json; stats: Json };
          
          if (newData.milestones) {
            setMilestones(newData.milestones as unknown as Milestone[]);
          }
          if (newData.stats) {
            setStats(newData.stats as unknown as ProtocolStats);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Removing settings realtime subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    milestones,
    stats,
    isLoading,
    updateSettings,
    refreshSettings: fetchSettings,
  };
};
