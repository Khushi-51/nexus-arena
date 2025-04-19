
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGame } from "@/context/GameContext";
import { Sword, Shield, Loader2 } from "lucide-react";
import { HeroCard } from "@/components/heroes/HeroCard";
import { BattleDetail } from "@/components/battles/BattleDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BattlePage = () => {
  const { heroes, wallet, initiateBattle, loading } = useGame();
  const { toast } = useToast();
  
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [battleResult, setBattleResult] = useState<any | null>(null);
  
  const myHeroes = heroes.filter(h => h.owner === wallet.address);
  const opponents = heroes.filter(h => h.owner !== wallet.address);
  
  const handleSelectHero = (heroId: string) => {
    setSelectedHero(heroId === selectedHero ? null : heroId);
  };
  
  const handleSelectOpponent = (heroId: string) => {
    setSelectedOpponent(heroId === selectedOpponent ? null : heroId);
  };
  
  const handleStartBattle = async () => {
    if (!selectedHero || !selectedOpponent) {
      toast({
        title: "Selection Required",
        description: "Please select both your hero and an opponent.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const battle = await initiateBattle(selectedHero, selectedOpponent);
      setBattleResult(battle);
      
      toast({
        title: "Battle Completed",
        description: `${battle.winner === selectedHero ? 'Victory!' : 'Defeat!'} Your hero has ${battle.winner === selectedHero ? 'won' : 'lost'} the battle.`,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Battle Failed",
        description: "There was an error during the battle. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout requireWallet={true}>
      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-orbitron font-bold mb-2">Battle Arena</h1>
          <p className="text-muted-foreground">
            Select your hero and an opponent to start a battle
          </p>
        </div>
        
        {battleResult ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-orbitron font-bold">Battle Results</h2>
              <Button 
                variant="outline" 
                onClick={() => setBattleResult(null)}
                className="border-[hsl(var(--monad-primary))] text-[hsl(var(--monad-primary))]"
              >
                New Battle
              </Button>
            </div>
            
            <BattleDetail battle={battleResult} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Heroes */}
            <div className="col-span-1 bg-black/40 rounded-lg border border-[hsl(var(--monad-primary))]/20 p-4">
              <h2 className="text-xl font-orbitron font-bold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-[hsl(var(--monad-primary))]" />
                My Heroes
              </h2>
              
              {myHeroes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You don't have any heroes yet.</p>
                  <Button asChild>
                    <a href="/mint">Mint Your First Hero</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                  {myHeroes.map(hero => (
                    <HeroCard 
                      key={hero.id} 
                      hero={hero}
                      selected={selectedHero === hero.id}
                      onClick={() => handleSelectHero(hero.id)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Battle Arena */}
            <div className="col-span-1 bg-black/30 rounded-lg border border-[hsl(var(--monad-secondary))]/20 p-6 flex flex-col justify-center items-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--monad-primary))]/10 flex items-center justify-center mb-6 animate-pulse-glow">
                <Sword className="h-8 w-8 text-[hsl(var(--monad-primary))]" />
              </div>
              
              <h2 className="text-xl font-orbitron font-bold mb-4 text-center">Battle Arena</h2>
              
              {selectedHero && selectedOpponent ? (
                <div className="text-center">
                  <p className="mb-6 text-muted-foreground">
                    {heroes.find(h => h.id === selectedHero)?.name} vs. {heroes.find(h => h.id === selectedOpponent)?.name}
                  </p>
                  
                  <Button
                    onClick={handleStartBattle}
                    disabled={loading.battling}
                    size="lg"
                    className="bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_15px_hsl(var(--monad-primary))] transition-all duration-300"
                  >
                    {loading.battling ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Battle in Progress...
                      </>
                    ) : (
                      <>
                        <Sword className="h-5 w-5 mr-2" />
                        Start Battle
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-2 text-muted-foreground">
                    Select your hero and an opponent to battle
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Battles are resolved on-chain with randomized outcomes based on hero stats
                  </p>
                </div>
              )}
            </div>
            
            {/* Opponents */}
            <div className="col-span-1 bg-black/40 rounded-lg border border-[hsl(var(--monad-primary))]/20 p-4">
              <h2 className="text-xl font-orbitron font-bold mb-4 flex items-center">
                <Sword className="h-5 w-5 mr-2 text-[hsl(var(--monad-primary))]" />
                Opponents
              </h2>
              
              {opponents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No opponents available.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                  {opponents.map(hero => (
                    <HeroCard 
                      key={hero.id} 
                      hero={hero}
                      selected={selectedOpponent === hero.id}
                      onClick={() => handleSelectOpponent(hero.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BattlePage;
