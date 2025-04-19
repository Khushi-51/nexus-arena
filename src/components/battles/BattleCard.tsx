
import React from "react";
import { Battle } from "@/types/game";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatAddress } from "@/utils/utils";
import { Sword, Calendar } from "lucide-react";

interface BattleCardProps {
  battle: Battle;
  onClick?: () => void;
  selected?: boolean;
}

export const BattleCard = ({ battle, onClick, selected = false }: BattleCardProps) => {
  const date = new Date(battle.timestamp);
  const formatDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  
  const hero1Winner = battle.winner === battle.hero1.id;
  const hero2Winner = battle.winner === battle.hero2.id;

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer ${
        selected ? "ring-2 ring-[hsl(var(--monad-primary))]" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <Badge className="bg-[hsl(var(--monad-primary))]">
            <Sword className="h-3 w-3 mr-1" /> Battle
          </Badge>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {formatDate}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`flex-1 p-3 rounded-l-md ${hero1Winner ? 'bg-green-900/20 border-l-4 border-green-500' : 'bg-black/50'}`}>
            <div className="font-medium">{battle.hero1.name}</div>
            <div className="text-xs text-muted-foreground">{formatAddress(battle.hero1.owner)}</div>
            {hero1Winner && <Badge className="mt-1 bg-green-600">Winner</Badge>}
          </div>
          
          <div className="px-2 py-1 bg-[hsl(var(--monad-primary))/20] font-orbitron font-bold">
            VS
          </div>
          
          <div className={`flex-1 p-3 rounded-r-md text-right ${hero2Winner ? 'bg-green-900/20 border-r-4 border-green-500' : 'bg-black/50'}`}>
            <div className="font-medium">{battle.hero2.name}</div>
            <div className="text-xs text-muted-foreground">{formatAddress(battle.hero2.owner)}</div>
            {hero2Winner && <Badge className="mt-1 ml-auto bg-green-600">Winner</Badge>}
          </div>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground text-center">
          {battle.rounds.length} rounds • {battle.experienceGained} XP gained
        </div>
      </CardContent>
    </Card>
  );
};
