import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
const CONTRACT_ADDRESS = "CKaTvCdrnARQAUK2ZmAXGroXqZ8BUNHESg1Zokngpump";

// X (Twitter) Icon
const XIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>;
export const Footer = () => {
  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({
      description: "Contract address copied!"
    });
  };
  return <footer className="py-8 px-4 border-t border-border/50">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        {/* Contract */}
        

        {/* Links */}
        <div className="flex items-center justify-center gap-4">
          <a href="https://x.com/i/communities/2004897909502857453" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <XIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground max-w-md mx-auto leading-relaxed">
          SNOW GIFT PROTOCOL is an experimental token. Trading cryptocurrencies involves significant risk. Never invest more than
          you can afford to lose. This is not financial advice.
        </p>

        <p className="text-[10px] text-muted-foreground">© 2025 SNOW GIFT PROTOCOL. All rights reserved.</p>
      </div>
    </footer>;
};