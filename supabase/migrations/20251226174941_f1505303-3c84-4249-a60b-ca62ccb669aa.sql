-- Create settings table for admin panel data
CREATE TABLE public.settings (
  id TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  contract_address TEXT DEFAULT 'CKaTvCdrnARQAUK2ZmAXGroXqZ8BUNHESg1Zokngpump',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings
CREATE POLICY "Settings are publicly viewable" 
ON public.settings 
FOR SELECT 
USING (true);

-- Allow anyone to update settings (admin only in practice via hidden panel)
CREATE POLICY "Anyone can update settings" 
ON public.settings 
FOR UPDATE 
USING (true);

-- Allow insert for initial data
CREATE POLICY "Anyone can insert settings" 
ON public.settings 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for settings table
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_wallet_updated_at();

-- Insert default settings
INSERT INTO public.settings (id, milestones, stats) 
VALUES (
  'main',
  '[
    {"id": "1", "cap": "$50k", "reward": "0.5 SOL", "completed": false},
    {"id": "2", "cap": "$150k", "reward": "1 SOL", "completed": false},
    {"id": "3", "cap": "$300k", "reward": "2 SOL", "completed": false},
    {"id": "4", "cap": "$500k", "reward": "3 SOL", "completed": false},
    {"id": "5", "cap": "$1M", "reward": "5 SOL", "completed": false},
    {"id": "6", "cap": "$5M", "reward": "10 SOL", "completed": false}
  ]'::jsonb,
  '{
    "totalSolDistributed": "0 SOL",
    "totalRewardsSent": "0",
    "currentRewardPool": "0 SOL",
    "totalUniqueWinners": "0"
  }'::jsonb
);