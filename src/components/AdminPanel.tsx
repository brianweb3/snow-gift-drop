import { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import type { ProtocolStats } from './MetricsSection';

export interface Milestone {
  id: string;
  cap: string;
  reward: string;
  completed: boolean;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  milestones: Milestone[];
  stats: ProtocolStats;
  onSave: (milestones: Milestone[], stats: ProtocolStats) => Promise<boolean>;
}

export const AdminPanel = ({ 
  isOpen, 
  onClose, 
  milestones, 
  stats,
  onSave
}: AdminPanelProps) => {
  const [localMilestones, setLocalMilestones] = useState<Milestone[]>(milestones);
  const [localStats, setLocalStats] = useState<ProtocolStats>(stats);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalMilestones(milestones);
      setLocalStats(stats);
    }
  }, [milestones, stats, isOpen]);

  const handleMilestoneChange = (id: string, field: keyof Milestone, value: string | boolean) => {
    setLocalMilestones(prev => 
      prev.map(m => m.id === id ? { ...m, [field]: value } : m)
    );
  };

  const handleStatsChange = (field: keyof ProtocolStats, value: string) => {
    setLocalStats(prev => ({ ...prev, [field]: value }));
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: crypto.randomUUID(),
      cap: "$0",
      reward: "0 SOL",
      completed: false,
    };
    setLocalMilestones(prev => [...prev, newMilestone]);
  };

  const removeMilestone = (id: string) => {
    setLocalMilestones(prev => prev.filter(m => m.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave(localMilestones, localStats);
    setIsSaving(false);
    
    if (success) {
      toast({
        description: "Settings saved and synced to all users!",
      });
    } else {
      toast({
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="glass-strong rounded-xl w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium text-foreground">Admin Panel</h2>
            <span className="text-[10px] text-muted-foreground">(synced to all users)</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Protocol Stats Section */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-medium">Protocol Stats</p>
            
            <div className="glass rounded-lg p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Current Market Cap</label>
                  <Input
                    value={localStats.currentMarketCap}
                    onChange={(e) => handleStatsChange('currentMarketCap', e.target.value)}
                    className="h-8 text-xs"
                    placeholder="$0"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Reward Pool</label>
                  <Input
                    value={localStats.currentRewardPool}
                    onChange={(e) => handleStatsChange('currentRewardPool', e.target.value)}
                    className="h-8 text-xs"
                    placeholder="0 SOL"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Total Rewards Sent</label>
                  <Input
                    value={localStats.totalRewardsSent}
                    onChange={(e) => handleStatsChange('totalRewardsSent', e.target.value)}
                    className="h-8 text-xs"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Total Unique Winners</label>
                  <Input
                    value={localStats.totalUniqueWinners}
                    onChange={(e) => handleStatsChange('totalUniqueWinners', e.target.value)}
                    className="h-8 text-xs"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Milestones Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-medium">Reward Milestones</p>
              <Button variant="outline" size="sm" onClick={addMilestone} className="h-7 text-xs gap-1">
                <Plus className="w-3 h-3" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {localMilestones.map((milestone, index) => (
                <div key={milestone.id} className="glass rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Milestone {index + 1}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMilestone(milestone.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-muted-foreground mb-1 block">Market Cap</label>
                      <Input
                        value={milestone.cap}
                        onChange={(e) => handleMilestoneChange(milestone.id, 'cap', e.target.value)}
                        className="h-8 text-xs"
                        placeholder="$50k"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground mb-1 block">Reward</label>
                      <Input
                        value={milestone.reward}
                        onChange={(e) => handleMilestoneChange(milestone.id, 'reward', e.target.value)}
                        className="h-8 text-xs"
                        placeholder="1 SOL"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs text-muted-foreground">Completed</label>
                    <Switch
                      checked={milestone.completed}
                      onCheckedChange={(checked) => handleMilestoneChange(milestone.id, 'completed', checked)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button onClick={handleSave} className="w-full gap-2" disabled={isSaving}>
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save & Sync to All Users'}
          </Button>
        </div>
      </div>
    </div>
  );
};
