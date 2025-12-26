-- Create wallets table to store connected wallets
CREATE TABLE public.wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  sol_balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read wallets (public display)
CREATE POLICY "Wallets are publicly viewable" 
ON public.wallets 
FOR SELECT 
USING (true);

-- Allow anyone to insert wallets (for wallet connection)
CREATE POLICY "Anyone can add wallets" 
ON public.wallets 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update wallets (for balance updates)
CREATE POLICY "Anyone can update wallets" 
ON public.wallets 
FOR UPDATE 
USING (true);

-- Enable realtime for wallets table
ALTER PUBLICATION supabase_realtime ADD TABLE public.wallets;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_wallet_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_wallets_updated_at
BEFORE UPDATE ON public.wallets
FOR EACH ROW
EXECUTE FUNCTION public.update_wallet_updated_at();