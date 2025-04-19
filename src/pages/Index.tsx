
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGame } from "@/context/GameContext";
import { Sword, Shield, Trophy, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCard } from "@/components/heroes/HeroCard";
import { BattleCard } from "@/components/battles/BattleCard";

const Index = () => {
  const { heroes, battles, wallet, connectWallet, loading } = useGame();
  
  const myHeroes = heroes.filter(hero => hero.owner === wallet.address);
  const recentBattles = battles.slice(0, 3);

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <Badge className="mb-4 py-1.5 px-4 bg-[hsl(var(--monad-primary))/20] text-[hsl(var(--monad-primary))] border-[hsl(var(--monad-primary))/30]">
                Powered by Monad Layer-1 Blockchain
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))]">
                  Monad Crypto Heroes
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                Battle your NFT heroes on Monad's high-performance blockchain. Mint unique characters, level up in battles, and own your in-game assets.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {!wallet.connected ? (
                  <Button
                    onClick={connectWallet}
                    disabled={loading.wallet}
                    className="bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_15px_hsl(var(--monad-primary))] transition-all duration-300 text-lg px-8 py-6"
                  >
                    {loading.wallet ? "Connecting..." : "Connect Wallet"}
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_15px_hsl(var(--monad-primary))] transition-all duration-300 text-lg px-8 py-6"
                  >
                    <Link to="/mint">Mint Your Hero</Link>
                  </Button>
                )}
                
                <Button
                  asChild
                  variant="outline"
                  className="border-[hsl(var(--monad-primary))] text-[hsl(var(--monad-primary))] hover:bg-[hsl(var(--monad-primary))]/10 text-lg px-8 py-6"
                >
                  <Link to="/battle">Enter Battle Arena</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[hsl(var(--monad-primary))] opacity-30 blur-3xl rounded-full"></div>
              <img
                src="https://robohash.org/hero-showcase.png?set=set4&size=800x800"
                alt="Hero Showcase"
                className="relative z-10 w-full max-w-md mx-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-black/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold mb-4">Game Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience blockchain gaming with high-speed transactions on Monad's Layer-1 technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black/50 border-[hsl(var(--monad-primary))/20 hover:border-[hsl(var(--monad-primary))] transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--monad-primary))]/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[hsl(var(--monad-primary))]" />
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-2">Hero Minting</h3>
                <p className="text-muted-foreground mb-4">
                  Mint unique heroes as NFTs with randomized stats based on their name. Each hero has unique attributes, rarity, and element.
                </p>
                <Link to="/mint" className="text-[hsl(var(--monad-secondary))] hover:text-[hsl(var(--monad-secondary))/80] flex items-center gap-1 text-sm font-medium">
                  Mint a Hero <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-[hsl(var(--monad-primary))/20 hover:border-[hsl(var(--monad-primary))] transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--monad-primary))]/10 flex items-center justify-center mb-4">
                  <Sword className="h-6 w-6 text-[hsl(var(--monad-primary))]" />
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-2">Battle Arena</h3>
                <p className="text-muted-foreground mb-4">
                  Battle your heroes against others with our on-chain battle mechanics. Elemental advantages, critical hits, and randomized outcomes.
                </p>
                <Link to="/battle" className="text-[hsl(var(--monad-secondary))] hover:text-[hsl(var(--monad-secondary))/80] flex items-center gap-1 text-sm font-medium">
                  Enter Battle Arena <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-[hsl(var(--monad-primary))/20 hover:border-[hsl(var(--monad-primary))] transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--monad-primary))]/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-[hsl(var(--monad-primary))]" />
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-2">Hero Progression</h3>
                <p className="text-muted-foreground mb-4">
                  Heroes gain experience and level up after winning battles. Higher levels mean stronger attributes and better battle performance.
                </p>
                <Link to="/history" className="text-[hsl(var(--monad-secondary))] hover:text-[hsl(var(--monad-secondary))/80] flex items-center gap-1 text-sm font-medium">
                  View Battle History <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Dashboard preview section (only for connected users) */}
      {wallet.connected && (
        <section className="py-16">
          <div className="container px-4">
            <div className="mb-12">
              <h2 className="text-2xl font-orbitron font-bold mb-2">Your Heroes</h2>
              <p className="text-muted-foreground">
                {myHeroes.length > 0 
                  ? `You have ${myHeroes.length} heroes in your collection` 
                  : "You don't have any heroes yet. Mint your first hero!"}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {myHeroes.length > 0 ? (
                myHeroes.map(hero => (
                  <HeroCard key={hero.id} hero={hero} />
                ))
              ) : (
                <div className="col-span-full">
                  <Card className="border-dashed border-2 border-muted p-8">
                    <CardContent className="flex flex-col items-center justify-center text-center py-8">
                      <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Heroes Found</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't minted any heroes yet. Start your journey by creating your first hero!
                      </p>
                      <Button asChild>
                        <Link to="/mint">Mint Your First Hero</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {myHeroes.length > 0 && (
                <div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/mint">Mint Another Hero</Link>
                  </Button>
                </div>
              )}
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-orbitron font-bold">Recent Battles</h2>
                <Link to="/history" className="text-[hsl(var(--monad-secondary))] hover:text-[hsl(var(--monad-secondary))/80] flex items-center gap-1 text-sm font-medium">
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentBattles.length > 0 ? (
                  recentBattles.map(battle => (
                    <BattleCard key={battle.id} battle={battle} />
                  ))
                ) : (
                  <div className="col-span-full">
                    <Card className="border-dashed border-2 border-muted p-8">
                      <CardContent className="flex flex-col items-center justify-center text-center py-8">
                        <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-medium mb-2">No Battles Yet</h3>
                        <p className="text-muted-foreground mb-6">
                          You haven't participated in any battles yet. Enter the arena to start fighting!
                        </p>
                        <Button asChild>
                          <Link to="/battle">Enter Battle Arena</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Technologies section */}
      <section className="py-16 bg-black/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 py-1 px-3 bg-[hsl(var(--monad-secondary))/10] text-[hsl(var(--monad-secondary))] border-[hsl(var(--monad-secondary))/30">
              Technology
            </Badge>
            <h2 className="text-3xl font-orbitron font-bold mb-4">Powered by Monad</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leveraging Monad's high-performance Layer-1 blockchain for a seamless gaming experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-[hsl(var(--monad-primary))]/5 border border-[hsl(var(--monad-primary))]/10 text-center">
              <h3 className="font-orbitron font-bold mb-2">High Throughput</h3>
              <p className="text-muted-foreground">
                Process thousands of game transactions per second for smooth gameplay.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-[hsl(var(--monad-secondary))]/5 border border-[hsl(var(--monad-secondary))]/10 text-center">
              <h3 className="font-orbitron font-bold mb-2">Low Latency</h3>
              <p className="text-muted-foreground">
                Near-instant confirmations for a real-time gaming experience.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-[hsl(var(--monad-accent))]/5 border border-[hsl(var(--monad-accent))]/10 text-center">
              <h3 className="font-orbitron font-bold mb-2">True Ownership</h3>
              <p className="text-muted-foreground">
                Heroes and battle outcomes are securely stored on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
