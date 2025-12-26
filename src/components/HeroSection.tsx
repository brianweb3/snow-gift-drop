import { Wallet, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SnowGlobe } from './SnowGlobe';
import { CountdownTimer } from './CountdownTimer';
import { toast } from '@/hooks/use-toast';

interface HeroSectionProps {
  isConnected: boolean;
  onConnectWallet: () => void;
}

const CONTRACT_ADDRESS = "SNOWgift...1234abcd";

export const HeroSection = ({ isConnected, onConnectWallet }: HeroSectionProps) => {
  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({
      description: "Contract address copied!",
    });
  };

  return (
    <section className="relative py-12 md:py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">
          SNOW GIFT
        </h1>
        <p className="text-sm text-muted-foreground mb-8 md:mb-12">
          Winter rewards for diamond hands
        </p>

        {/* Snow Globe */}
        <div className="mb-8 md:mb-12">
          <SnowGlobe />
        </div>

        {/* Countdown */}
        <div className="mb-8 md:mb-10">
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
            Next Reward Drop
          </p>
          <CountdownTimer />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={onConnectWallet}
            variant={isConnected ? "secondary" : "default"}
            className="w-full sm:w-auto gap-2"
          >
            <Wallet className="w-4 h-4" />
            {isConnected ? "Connected" : "Connect Wallet"}
          </Button>
          
          <Button
            variant="outline"
            onClick={copyContract}
            className="w-full sm:w-auto gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Contract
          </Button>
          
          <Button
            variant="ghost"
            asChild
            className="w-full sm:w-auto gap-2"
          >
            <a href="https://twitter.com/snowgift" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Twitter
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
