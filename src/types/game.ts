
export interface Hero {
  id: string;
  name: string;
  image: string;
  owner: string;
  level: number;
  experience: number;
  attributes: {
    strength: number;
    defense: number;
    agility: number;
    intelligence: number;
    luck: number;
  };
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  element: "fire" | "water" | "earth" | "air" | "light" | "dark";
  battles: {
    wins: number;
    losses: number;
  };
  mintedAt: string;
}

export interface Battle {
  id: string;
  timestamp: string;
  hero1: {
    id: string;
    name: string;
    owner: string;
  };
  hero2: {
    id: string;
    name: string;
    owner: string;
  };
  winner: string; // ID of the winning hero
  loser: string; // ID of the losing hero
  rounds: BattleRound[];
  experienceGained: number;
  transactionHash: string;
}

export interface BattleRound {
  round: number;
  attacker: string; // ID of the attacking hero
  damage: number;
  effectDescription: string;
  defenderHpLeft: number;
}

export interface WalletInfo {
  address: string;
  balance: number;
  connected: boolean;
  network: string;
}
