
import React, { useState, useEffect } from "react";
import { Battle } from "@/types/game";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/utils/utils";
import { Sword, Trophy, Calendar, Bitcoin } from "lucide-react";

interface BattleDetailProps {
  battle: Battle;
}

export const BattleDetail = ({ battle }: BattleDetailProps) => {
  const [activeRound, setActiveRound] = useState<number | null>(null);
  const date = new Date(battle.timestamp);
  const formatDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  
  const hero1Winner = battle.winner === battle.hero1.id;
  const hero2Winner = battle.winner === battle.hero2.id;

  // Auto-play animation
  useEffect(() => {
    if (battle.rounds.length > 0) {
      let currentRound = 0;
      const timer = setInterval(() => {
        if (currentRound < battle.rounds.length) {
          setActiveRound(currentRound);
          currentRound++;
        } else {
          clearInterval(timer);
        }
      }, 1500);
      
      return () => clearInterval(timer);
    }
  }, [battle.id]);

  return (
    <Card className="overflow-hidden border-2 border-[hsl(var(--monad-primary))] animate-fade-in">
      <div className="bg-gradient-to-r from-[hsl(var(--monad-primary))/20] to-[hsl(var(--monad-secondary))/20] p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sword className="h-5 w-5 text-[hsl(var(--monad-primary))]" />
            <h2 className="font-orbitron font-bold text-xl">Battle Report</h2>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {formatDate}
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${hero1Winner ? 'bg-green-900/20 border-2 border-green-500' : 'bg-black/50 border border-gray-800'}`}>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{battle.hero1.name}</h3>
              {hero1Winner && <Trophy className="h-5 w-5 text-yellow-400" />}
            </div>
            <div className="text-xs text-muted-foreground mb-2">Owner: {formatAddress(battle.hero1.owner)}</div>
            {hero1Winner && (
              <div className="mt-2">
                <Badge className="bg-green-600">Winner</Badge>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-orbitron font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))]">
              VS
            </div>
            <div className="mt-2 flex flex-col items-center gap-1">
              <div className="text-xs text-muted-foreground">Battle ID</div>
              <Badge variant="outline" className="font-mono text-xs">
                {battle.id.substring(0, 14)}...
              </Badge>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${hero2Winner ? 'bg-green-900/20 border-2 border-green-500' : 'bg-black/50 border border-gray-800'}`}>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{battle.hero2.name}</h3>
              {hero2Winner && <Trophy className="h-5 w-5 text-yellow-400" />}
            </div>
            <div className="text-xs text-muted-foreground mb-2">Owner: {formatAddress(battle.hero2.owner)}</div>
            {hero2Winner && (
              <div className="mt-2">
                <Badge className="bg-green-600">Winner</Badge>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-6 bg-[hsl(var(--monad-primary))/20]" />
        
        <div className="mb-6">
          <h3 className="font-orbitron font-bold mb-4">Battle Rounds</h3>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {battle.rounds.map((round, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border transition-all ${
                  activeRound === index 
                    ? "border-[hsl(var(--monad-primary))] bg-[hsl(var(--monad-primary))/10 animate-pulse"
                    : "border-gray-800 bg-black/30"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="outline">Round {round.round}</Badge>
                  <Badge className="bg-red-600/80">{round.damage} damage</Badge>
                </div>
                <p className="text-sm">{round.effectDescription}</p>
                
                <div className="mt-2 text-xs flex justify-between">
                  <span className="text-muted-foreground">Attacker: {
                    round.attacker === battle.hero1.id ? battle.hero1.name : battle.hero2.name
                  }</span>
                  <span>HP Remaining: {round.defenderHpLeft}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-6 bg-[hsl(var(--monad-primary))/20]" />
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm mb-1">Experience Gained</div>
            <Badge className="bg-[hsl(var(--monad-secondary))]">{battle.experienceGained} XP</Badge>
          </div>
          
          <a 
            href={`https://monad-explorer.com/tx/${battle.transactionHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Bitcoin className="h-4 w-4" />
              <span>View on Explorer</span>
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
