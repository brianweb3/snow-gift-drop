-- Create winners table
CREATE TABLE public.winners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  transaction_hash TEXT NOT NULL,
  reward_amount TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.winners ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Winners are publicly viewable"
ON public.winners
FOR SELECT
USING (true);

-- Admin insert (public for now, can add auth later)
CREATE POLICY "Anyone can add winners"
ON public.winners
FOR INSERT
WITH CHECK (true);

-- Admin delete
CREATE POLICY "Anyone can delete winners"
ON public.winners
FOR DELETE
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.winners;