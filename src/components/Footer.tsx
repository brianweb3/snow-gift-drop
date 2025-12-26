import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const CONTRACT_ADDRESS = "SNOWgift123456789abcdefghijklmnop";

export const Footer = () => {
  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({
      description: "Contract address copied!",
    });
  };

  return (
    <footer className="py-8 px-4 border-t border-border/50">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        {/* Contract */}
        <div className="inline-flex items-center gap-2 glass rounded-lg px-4 py-2">
          <span className="text-xs text-muted-foreground">Contract:</span>
          <span className="text-xs font-mono text-foreground">
            {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-6)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyContract}
            className="h-6 w-6 p-0"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://twitter.com/snowgift"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Twitter
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground max-w-md mx-auto leading-relaxed">
          SNOW GIFT is an experimental token. Trading cryptocurrencies involves significant risk. 
          Never invest more than you can afford to lose. This is not financial advice.
        </p>

        <p className="text-[10px] text-muted-foreground">
          © 2024 SNOW GIFT. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
