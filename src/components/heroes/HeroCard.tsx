
import React from "react";
import { Hero } from "@/types/game";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sword, Shield, Zap, Brain, Sparkles, Award, FlameIcon, Droplet, Mountain, Wind, Sun, Moon } from "lucide-react";
import { formatNumber, xpNeededForLevel } from "@/utils/utils";
import { ELEMENT_COLORS, RARITY_COLORS } from "@/utils/heroGenerator";

interface HeroCardProps {
  hero: Hero;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
}

export const HeroCard = ({ hero, onClick, selected = false, compact = false }: HeroCardProps) => {
  const totalBattles = hero.battles.wins + hero.battles.losses;
  const winRate = totalBattles > 0 ? (hero.battles.wins / totalBattles) * 100 : 0;
  
  // Element icons
  const elementIcons = {
    fire: <FlameIcon className="h-3 w-3" />,
    water: <Droplet className="h-3 w-3" />,
    earth: <Mountain className="h-3 w-3" />,
    air: <Wind className="h-3 w-3" />,
    light: <Sun className="h-3 w-3" />,
    dark: <Moon className="h-3 w-3" />,
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 animate-hero-appear ${
        selected 
          ? "ring-2 ring-[hsl(var(--monad-primary))] shadow-[0_0_15px_hsl(var(--monad-primary))]" 
          : "hover:shadow-md hover:shadow-[hsl(var(--monad-primary))/20]"
      }`}
      style={{
        borderColor: RARITY_COLORS[hero.rarity].border,
        borderWidth: compact ? 1 : 2,
        cursor: onClick ? "pointer" : "default"
      }}
      onClick={onClick}
    >
      {!compact && (
        <div 
          className="h-36 relative bg-gradient-to-br from-gray-900 to-black"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, ${ELEMENT_COLORS[hero.element].primary}40, transparent 70%)`,
            borderBottom: `1px solid ${RARITY_COLORS[hero.rarity].border}`
          }}
        >
          <div className="absolute top-2 left-2 flex items-center gap-1">
            <Badge 
              className="font-bold" 
              style={{
                backgroundColor: RARITY_COLORS[hero.rarity].border,
                color: "#fff"
              }}
            >
              {hero.rarity.toUpperCase()}
            </Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge 
              className="font-bold flex gap-1" 
              style={{
                backgroundColor: ELEMENT_COLORS[hero.element].primary,
                color: "#fff"
              }}
            >
              {elementIcons[hero.element]} {hero.element}
            </Badge>
          </div>
        </div>
      )}
      
      <CardContent className={compact ? "p-3" : "p-5"}>
        <div className="flex items-center gap-3">
          <div className={`${compact ? "w-10 h-10" : "w-16 h-16"} bg-black rounded-full overflow-hidden border-2`} style={{borderColor: RARITY_COLORS[hero.rarity].border}}>
            <img 
              src={hero.image} 
              alt={hero.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-orbitron font-bold ${compact ? "text-sm" : "text-lg"} truncate`}>
              {hero.name}
            </h3>
            
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="bg-black/50 flex items-center gap-1">
                <Award className={`${compact ? "h-3 w-3" : "h-4 w-4"}`} /> Lv.{hero.level}
              </Badge>
              
              {!compact && (
                <>
                  {totalBattles > 0 && (
                    <Badge variant="outline" className="bg-black/50">
                      {hero.battles.wins}W - {hero.battles.losses}L
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {!compact && (
          <>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-muted-foreground">Experience</span>
                <span>{formatNumber(hero.experience)} / {formatNumber(xpNeededForLevel(hero.level))}</span>
              </div>
              <Progress value={(hero.experience / xpNeededForLevel(hero.level)) * 100} className="h-1.5" />
            </div>
            
            <div className="grid grid-cols-5 gap-2 mt-4">
              <div className="flex flex-col items-center">
                <Sword className="h-4 w-4 text-red-400" />
                <span className="text-xs mt-1">{hero.attributes.strength}</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-xs mt-1">{hero.attributes.defense}</span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-xs mt-1">{hero.attributes.agility}</span>
              </div>
              <div className="flex flex-col items-center">
                <Brain className="h-4 w-4 text-purple-400" />
                <span className="text-xs mt-1">{hero.attributes.intelligence}</span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="h-4 w-4 text-green-400" />
                <span className="text-xs mt-1">{hero.attributes.luck}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
