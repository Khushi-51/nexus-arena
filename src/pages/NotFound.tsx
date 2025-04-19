
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0c0a20] to-black text-white p-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[hsl(var(--monad-primary))]/10 flex items-center justify-center animate-pulse-glow">
          <Shield className="h-10 w-10 text-[hsl(var(--monad-primary))]" />
        </div>
        
        <h1 className="text-5xl font-orbitron font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))]">
          404
        </h1>
        
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The hero you're looking for seems to be on another quest. Check your coordinates and try again.
        </p>
        
        <Button asChild className="bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_15px_hsl(var(--monad-primary))] transition-all duration-300">
          <Link to="/">Return to Homepage</Link>
        </Button>
        
        {/* Background glow effects */}
        <div className="fixed -top-40 -left-40 w-80 h-80 bg-[hsl(var(--monad-primary))] opacity-10 rounded-full blur-[100px] -z-10" />
        <div className="fixed -bottom-60 -right-60 w-96 h-96 bg-[hsl(var(--monad-secondary))] opacity-10 rounded-full blur-[100px] -z-10" />
      </div>
    </div>
  );
};

export default NotFound;
