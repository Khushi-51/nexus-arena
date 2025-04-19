
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useGame } from "@/context/GameContext";
import { WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  requireWallet?: boolean;
}

export const Layout = ({ children, requireWallet = false }: LayoutProps) => {
  const { wallet, connectWallet, loading } = useGame();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-[#0c0a20] to-black text-white">
      <Header />
      
      <main className="flex-grow">
        {requireWallet && !wallet.connected ? (
          <div className="container my-20 flex flex-col items-center justify-center gap-4">
            <div className="p-8 border border-monad-primary/20 rounded-lg bg-black/50 backdrop-blur-sm max-w-md w-full animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--monad-primary))/10] flex items-center justify-center mx-auto mb-4">
                  <WalletIcon className="w-8 h-8 text-[hsl(var(--monad-primary))]" />
                </div>
                <h2 className="text-2xl font-orbitron font-bold text-white mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground mb-4">
                  Please connect your wallet to access the Monad Crypto Heroes platform.
                </p>
                <Button 
                  onClick={connectWallet}
                  disabled={loading.wallet}
                  className="bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_15px_hsl(var(--monad-primary))] transition-all duration-300 w-full"
                >
                  <WalletIcon className="w-5 h-5 mr-2" />
                  {loading.wallet ? "Connecting..." : "Connect Wallet"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </main>
      
      <Footer />
      
      {/* Background glow effects */}
      <div className="fixed -top-40 -left-40 w-80 h-80 bg-[hsl(var(--monad-primary))] opacity-10 rounded-full blur-[100px] -z-10" />
      <div className="fixed -bottom-60 -right-60 w-96 h-96 bg-[hsl(var(--monad-secondary))] opacity-10 rounded-full blur-[100px] -z-10" />
    </div>
  );
};
