
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGame } from "@/context/GameContext";
import { Shield, Loader2, Sparkles } from "lucide-react";
import { HeroDetail } from "@/components/heroes/HeroDetail";
import { generateRandomHeroName } from "@/utils/heroGenerator";

const MintPage = () => {
  const { mintHero, loading } = useGame();
  const { toast } = useToast();
  
  const [heroName, setHeroName] = useState("");
  const [mintedHero, setMintedHero] = useState<any>(null);
  
  const handleRandomName = () => {
    setHeroName(generateRandomHeroName());
  };
  
  const handleMint = async () => {
    if (!heroName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your hero.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const newHero = await mintHero(heroName);
      setMintedHero(newHero);
      setHeroName("");
      
      toast({
        title: "Hero Minted Successfully!",
        description: `${newHero.name} has joined your collection.`,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Minting Failed",
        description: "There was an error minting your hero. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout requireWallet={true}>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-orbitron font-bold mb-2">Mint Your Hero</h1>
            <p className="text-muted-foreground">
              Create a unique hero with randomized stats based on the name you choose
            </p>
          </div>
          
          <Card className="mb-8 border-[hsl(var(--monad-primary))/40] bg-black/50 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-[hsl(var(--monad-primary))]" />
                  Hero Creation
                </h2>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Hero Name
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter a name for your hero"
                        value={heroName}
                        onChange={(e) => setHeroName(e.target.value)}
                        className="bg-black/70 border-[hsl(var(--monad-primary))/30"
                      />
                      <Button
                        variant="outline"
                        onClick={handleRandomName}
                        className="whitespace-nowrap border-[hsl(var(--monad-secondary))] text-[hsl(var(--monad-secondary))]"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Random
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      The name affects your hero's stats and appearance
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button
                    onClick={handleMint}
                    disabled={!heroName.trim() || loading.minting}
                    className="w-full md:w-auto bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_15px_hsl(var(--monad-primary))] transition-all duration-300"
                  >
                    {loading.minting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Minting Hero...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Mint Hero
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-2 p-4 rounded-md bg-[hsl(var(--monad-primary))]/5 border border-[hsl(var(--monad-primary))]/20">
                <h3 className="text-sm font-medium">How Hero Minting Works</h3>
                <ol className="text-sm text-muted-foreground list-decimal pl-4 space-y-1">
                  <li>Enter a name for your hero</li>
                  <li>Your hero's stats are randomly generated based on the hash of the name</li>
                  <li>Each hero has unique attributes, rarity, and element type</li>
                  <li>The hero is minted as an NFT on the Monad blockchain</li>
                  <li>You can use your hero in battles to earn experience and level up</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          
          {mintedHero && (
            <div className="mt-12 animate-fade-in">
              <h2 className="text-xl font-orbitron font-bold mb-4">Your New Hero</h2>
              <HeroDetail hero={mintedHero} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MintPage;
