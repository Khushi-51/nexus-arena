
import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { WalletIcon, LogOut, Sword, Shield, Trophy } from "lucide-react";
import { formatAddress } from "@/utils/utils";
import { Link } from "react-router-dom";

export const Header = () => {
  const { wallet, connectWallet, disconnectWallet, loading } = useGame();

  return (
    <header className="border-b border-monad-primary/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] flex items-center justify-center">
              <Sword className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-orbitron font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))]">
                Monad
              </span>{" "}
              Crypto Heroes
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/mint" 
            className="font-medium text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1"
          >
            <Shield className="w-4 h-4" /> Mint Hero
          </Link>
          <Link 
            to="/battle" 
            className="font-medium text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1"
          >
            <Sword className="w-4 h-4" /> Battle Arena
          </Link>
          <Link 
            to="/history" 
            className="font-medium text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1"
          >
            <Trophy className="w-4 h-4" /> Battle History
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {wallet.connected ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-[hsl(var(--monad-secondary))]">
                    {wallet.network}
                  </span>
                  <span className="text-sm font-medium">
                    {formatAddress(wallet.address)}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={disconnectWallet}
                className="text-[hsl(var(--monad-accent))] hover:text-[hsl(var(--monad-accent))] hover:bg-[hsl(var(--monad-accent))]/10"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Disconnect</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={connectWallet}
              disabled={loading.wallet}
              size="sm"
              className="bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_15px_hsl(var(--monad-primary))] transition-all duration-300"
            >
              <WalletIcon className="w-4 h-4 mr-2" />
              {loading.wallet ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
