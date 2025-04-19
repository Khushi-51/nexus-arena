
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/context/GameContext";
import { BattleCard } from "@/components/battles/BattleCard";
import { BattleDetail } from "@/components/battles/BattleDetail";
import { HeroCard } from "@/components/heroes/HeroCard";
import { HeroDetail } from "@/components/heroes/HeroDetail";

const HistoryPage = () => {
  const { heroes, battles, wallet } = useGame();
  const [selectedBattle, setSelectedBattle] = useState<string | null>(null);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  
  const myHeroes = heroes.filter(h => h.owner === wallet.address);
  
  // Filter battles for current user
  const userBattles = battles.filter(
    battle => 
      battle.hero1.owner === wallet.address || 
      battle.hero2.owner === wallet.address
  );
  
  const handleSelectBattle = (battleId: string) => {
    setSelectedBattle(battleId);
    setSelectedHero(null); // Reset hero selection
  };
  
  const handleSelectHero = (heroId: string) => {
    setSelectedHero(heroId);
    setSelectedBattle(null); // Reset battle selection
  };
  
  const selectedBattleData = battles.find(b => b.id === selectedBattle);
  const selectedHeroData = heroes.find(h => h.id === selectedHero);

  return (
    <Layout requireWallet={true}>
      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-orbitron font-bold mb-2">Game History</h1>
          <p className="text-muted-foreground">
            View your battle history and hero collection
          </p>
        </div>
        
        <Tabs defaultValue="battles" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8 bg-black/30">
            <TabsTrigger value="battles" className="font-orbitron">Battle History</TabsTrigger>
            <TabsTrigger value="heroes" className="font-orbitron">Hero Collection</TabsTrigger>
          </TabsList>
          
          <TabsContent value="battles" className="pt-4">
            {selectedBattleData ? (
              <div>
                <button 
                  onClick={() => setSelectedBattle(null)}
                  className="text-sm text-[hsl(var(--monad-secondary))] hover:text-[hsl(var(--monad-secondary))/80] mb-6 flex items-center gap-1"
                >
                  ← Back to battle history
                </button>
                
                <BattleDetail battle={selectedBattleData} />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Your Battles</h2>
                
                {userBattles.length === 0 ? (
                  <div className="text-center py-8 bg-black/30 rounded-lg border border-[hsl(var(--monad-primary))]/20">
                    <p className="text-muted-foreground mb-4">You haven't participated in any battles yet.</p>
                    <a 
                      href="/battle" 
                      className="px-4 py-2 bg-[hsl(var(--monad-primary))] text-white rounded-md hover:bg-[hsl(var(--monad-primary))]/80 transition-colors"
                    >
                      Enter Battle Arena
                    </a>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBattles.map(battle => (
                      <BattleCard 
                        key={battle.id} 
                        battle={battle} 
                        onClick={() => handleSelectBattle(battle.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="heroes" className="pt-4">
            {selectedHeroData ? (
              <div>
                <button 
                  onClick={() => setSelectedHero(null)}
                  className="text-sm text-[hsl(var(--monad-secondary))] hover:text-[hsl(var(--monad-secondary))/80] mb-6 flex items-center gap-1"
                >
                  ← Back to hero collection
                </button>
                
                <HeroDetail hero={selectedHeroData} />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Your Heroes</h2>
                
                {myHeroes.length === 0 ? (
                  <div className="text-center py-8 bg-black/30 rounded-lg border border-[hsl(var(--monad-primary))]/20">
                    <p className="text-muted-foreground mb-4">You don't have any heroes yet.</p>
                    <a 
                      href="/mint" 
                      className="px-4 py-2 bg-[hsl(var(--monad-primary))] text-white rounded-md hover:bg-[hsl(var(--monad-primary))]/80 transition-colors"
                    >
                      Mint Your First Hero
                    </a>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myHeroes.map(hero => (
                      <HeroCard 
                        key={hero.id} 
                        hero={hero} 
                        onClick={() => handleSelectHero(hero.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HistoryPage;
