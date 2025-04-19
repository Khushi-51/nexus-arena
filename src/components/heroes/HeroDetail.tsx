
import React from "react";
import { Hero } from "@/types/game";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Sword, Shield, Zap, Brain, Sparkles, 
  Award, Trophy, Skull, FlameIcon, 
  Droplet, Mountain, Wind, Sun, Moon,
  Calendar 
} from "lucide-react";
import { formatNumber, formatAddress, xpNeededForLevel } from "@/utils/utils";
import { ELEMENT_COLORS, RARITY_COLORS } from "@/utils/heroGenerator";

interface HeroDetailProps {
  hero: Hero;
  onSelectForBattle?: () => void;
}

export const HeroDetail = ({ hero, onSelectForBattle }: HeroDetailProps) => {
  const totalBattles = hero.battles.wins + hero.battles.losses;
  const winRate = totalBattles > 0 ? Math.round((hero.battles.wins / totalBattles) * 100) : 0;
  
  const elementIcons = {
    fire: <FlameIcon className="h-5 w-5" />,
    water: <Droplet className="h-5 w-5" />,
    earth: <Mountain className="h-5 w-5" />,
    air: <Wind className="h-5 w-5" />,
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
  };
  
  return (
    <Card className="overflow-hidden border-2 animate-fade-in" style={{
      borderColor: RARITY_COLORS[hero.rarity].border,
      boxShadow: RARITY_COLORS[hero.rarity].glow
    }}>
      <div 
        className="h-40 relative bg-gradient-to-br from-gray-900 to-black"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, ${ELEMENT_COLORS[hero.element].primary}40, transparent 70%)`,
          borderBottom: `1px solid ${RARITY_COLORS[hero.rarity].border}`
        }}
      >
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge 
            className="font-bold text-md px-3 py-1" 
            style={{
              backgroundColor: RARITY_COLORS[hero.rarity].border,
              color: "#fff"
            }}
          >
            {hero.rarity.toUpperCase()} HERO
          </Badge>
          
          <Badge 
            className="font-bold flex gap-2" 
            style={{
              backgroundColor: ELEMENT_COLORS[hero.element].primary,
              color: "#fff"
            }}
          >
            {elementIcons[hero.element]} {hero.element.toUpperCase()} ELEMENT
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="w-32 h-32 bg-black rounded-full overflow-hidden border-2 animate-glow" 
            style={{borderColor: RARITY_COLORS[hero.rarity].border}}
          >
            <img 
              src={hero.image} 
              alt={hero.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h2 className="font-orbitron font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-[hsl(var(--monad-secondary))]">
              {hero.name}
            </h2>
            
            <div className="mt-2 text-sm text-muted-foreground">
              Owner: <span className="text-white">{formatAddress(hero.owner)}</span>
            </div>
            
            <div className="mt-4 flex items-center gap-3">
              <Badge className="bg-[hsl(var(--monad-primary))] text-white flex items-center gap-1 py-1">
                <Award className="h-4 w-4" /> Level {hero.level}
              </Badge>
              
              <div className="flex gap-2 items-center">
                {totalBattles > 0 ? (
                  <>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-yellow-400" /> {hero.battles.wins}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Skull className="h-3 w-3 text-red-400" /> {hero.battles.losses}
                    </Badge>
                    <Badge variant="outline">
                      {winRate}% Win Rate
                    </Badge>
                  </>
                ) : (
                  <Badge variant="outline">No Battles</Badge>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span>{formatNumber(hero.experience)} / {formatNumber(xpNeededForLevel(hero.level))}</span>
                </div>
                <Progress value={(hero.experience / xpNeededForLevel(hero.level)) * 100} className="h-2" />
              </div>
              
              {onSelectForBattle && (
                <div className="ml-4">
                  <Button onClick={onSelectForBattle} className="bg-gradient-to-r from-[hsl(var(--monad-primary))] to-[hsl(var(--monad-secondary))] hover:shadow-[0_0_10px_hsl(var(--monad-primary))]">
                    <Sword className="h-4 w-4 mr-2" /> Select for Battle
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="font-orbitron font-bold mb-3 text-lg">Hero Attributes</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mb-2">
                <Sword className="h-7 w-7 text-red-400" />
              </div>
              <span className="font-medium mb-1">Strength</span>
              <span className="text-xl font-bold">{hero.attributes.strength}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mb-2">
                <Shield className="h-7 w-7 text-blue-400" />
              </div>
              <span className="font-medium mb-1">Defense</span>
              <span className="text-xl font-bold">{hero.attributes.defense}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-yellow-900/30 flex items-center justify-center mb-2">
                <Zap className="h-7 w-7 text-yellow-400" />
              </div>
              <span className="font-medium mb-1">Agility</span>
              <span className="text-xl font-bold">{hero.attributes.agility}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-2">
                <Brain className="h-7 w-7 text-purple-400" />
              </div>
              <span className="font-medium mb-1">Intelligence</span>
              <span className="text-xl font-bold">{hero.attributes.intelligence}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-2">
                <Sparkles className="h-7 w-7 text-green-400" />
              </div>
              <span className="font-medium mb-1">Luck</span>
              <span className="text-xl font-bold">{hero.attributes.luck}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Minted: {new Date(hero.mintedAt).toLocaleDateString()}</span>
          </div>
          <div>
            ID: {hero.id.substring(0, 8)}...{hero.id.substring(hero.id.length - 8)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
