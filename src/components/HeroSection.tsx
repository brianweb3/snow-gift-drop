import { Wallet, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SnowGlobe } from './SnowGlobe';
import { toast } from '@/hooks/use-toast';

interface HeroSectionProps {
  isConnected: boolean;
  isConnecting: boolean;
  onConnectWallet: () => void;
  onDisconnect: () => void;
}

const CONTRACT_ADDRESS = "SNOWgift...1234abcd";

// X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const HeroSection = ({ isConnected, isConnecting, onConnectWallet, onDisconnect }: HeroSectionProps) => {
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
        <div className="mb-10 md:mb-14">
          <SnowGlobe />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={isConnected ? onDisconnect : onConnectWallet}
            variant={isConnected ? "secondary" : "default"}
            className="w-full sm:w-auto gap-2"
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4" />
            {isConnecting ? "Connecting..." : isConnected ? "Disconnect" : "Connect Wallet"}
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
            className="w-full sm:w-auto p-2"
          >
            <a href="https://x.com/snowgift" target="_blank" rel="noopener noreferrer">
              <XIcon className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
