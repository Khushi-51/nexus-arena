
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Hero, Battle, WalletInfo } from "../types/game";
import { createHero } from "../utils/heroGenerator";
import { simulateBattle, applyBattleResults } from "../utils/battleSystem";
import { simulateTransaction } from "../utils/utils";

interface GameContextType {
  // Hero management
  heroes: Hero[];
  selectedHero: Hero | null;
  mintHero: (name: string) => Promise<Hero>;
  selectHero: (heroId: string) => void;
  
  // Battle system
  battles: Battle[];
  selectedBattle: Battle | null;
  initiateBattle: (hero1Id: string, hero2Id: string) => Promise<Battle>;
  selectBattle: (battleId: string) => void;
  
  // Wallet connection
  wallet: WalletInfo;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  
  // Loading states
  loading: {
    heroes: boolean;
    battles: boolean;
    wallet: boolean;
    minting: boolean;
    battling: boolean;
  };
}

// Default wallet state
const defaultWallet: WalletInfo = {
  address: "",
  balance: 0,
  connected: false,
  network: ""
};

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [battles, setBattles] = useState<Battle[]>([]);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [wallet, setWallet] = useState<WalletInfo>(defaultWallet);
  const [loading, setLoading] = useState({
    heroes: true,
    battles: true,
    wallet: false,
    minting: false,
    battling: false
  });

  // Initialize with sample data when wallet connects
  useEffect(() => {
    if (wallet.connected) {
      loadGameData();
    }
  }, [wallet.connected]);

  // Load game data
  const loadGameData = async () => {
    setLoading({ ...loading, heroes: true, battles: true });
    
    // In a real app, this would fetch data from the blockchain
    // For now, we'll generate some sample data
    
    if (heroes.length === 0) {
      // Generate sample heroes
      const sampleHeroes: Hero[] = [];
      
      if (wallet.address) {
        // Player heroes
        const hero1 = createHero("Blaze Guardian", wallet.address);
        const hero2 = createHero("Luna Slayer", wallet.address);
        sampleHeroes.push(hero1, hero2);
      }
      
      // AI opponents
      sampleHeroes.push(
        createHero("Aether Knight", "0xAI1"),
        createHero("Frost Oracle", "0xAI2"),
        createHero("Terra Phantom", "0xAI3")
      );
      
      setHeroes(sampleHeroes);
    }
    
    // Generate sample battles if none exist
    if (battles.length === 0 && heroes.length >= 2) {
      const sampleBattle = simulateBattle(heroes[0], heroes[heroes.length - 1]);
      setBattles([sampleBattle]);
      
      // Apply battle results
      const [updatedHero1, updatedHero2] = applyBattleResults(
        sampleBattle,
        heroes[0],
        heroes[heroes.length - 1]
      );
      
      setHeroes(prev => 
        prev.map(h => 
          h.id === updatedHero1.id 
            ? updatedHero1 
            : h.id === updatedHero2.id 
              ? updatedHero2 
              : h
        )
      );
    }
    
    setLoading({ ...loading, heroes: false, battles: false });
  };

  // Mint a new hero
  const mintHero = async (name: string): Promise<Hero> => {
    setLoading({ ...loading, minting: true });
    
    // In a real app, this would make a blockchain transaction
    await simulateTransaction(1500);
    
    const newHero = createHero(name, wallet.address);
    
    setHeroes(prev => [...prev, newHero]);
    setLoading({ ...loading, minting: false });
    
    return newHero;
  };

  // Select a hero
  const selectHero = (heroId: string) => {
    const hero = heroes.find(h => h.id === heroId) || null;
    setSelectedHero(hero);
  };

  // Initiate a battle between two heroes
  const initiateBattle = async (hero1Id: string, hero2Id: string): Promise<Battle> => {
    setLoading({ ...loading, battling: true });
    
    const hero1 = heroes.find(h => h.id === hero1Id);
    const hero2 = heroes.find(h => h.id === hero2Id);
    
    if (!hero1 || !hero2) {
      throw new Error("One or both heroes not found");
    }
    
    // In a real app, this would make a blockchain transaction
    await simulateTransaction(2000);
    
    const battle = simulateBattle(hero1, hero2);
    
    // Apply battle results
    const [updatedHero1, updatedHero2] = applyBattleResults(battle, hero1, hero2);
    
    // Update heroes
    setHeroes(prev => 
      prev.map(h => 
        h.id === updatedHero1.id 
          ? updatedHero1 
          : h.id === updatedHero2.id 
            ? updatedHero2 
            : h
      )
    );
    
    // Save battle
    setBattles(prev => [battle, ...prev]);
    setSelectedBattle(battle);
    
    setLoading({ ...loading, battling: false });
    
    return battle;
  };

  // Select a battle
  const selectBattle = (battleId: string) => {
    const battle = battles.find(b => b.id === battleId) || null;
    setSelectedBattle(battle);
  };

  // Connect wallet
  const connectWallet = async (): Promise<boolean> => {
    setLoading({ ...loading, wallet: true });
    
    // In a real app, this would connect to MetaMask or another wallet
    await simulateTransaction(1000);
    
    const mockWallet = {
      address: "0x" + Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join(''),
      balance: 100,
      connected: true,
      network: "Monad Testnet"
    };
    
    setWallet(mockWallet);
    setLoading({ ...loading, wallet: false });
    
    return true;
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet(defaultWallet);
    setHeroes([]);
    setBattles([]);
    setSelectedHero(null);
    setSelectedBattle(null);
  };

  const value = {
    heroes,
    selectedHero,
    mintHero,
    selectHero,
    battles,
    selectedBattle,
    initiateBattle,
    selectBattle,
    wallet,
    connectWallet,
    disconnectWallet,
    loading
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Custom hook for using the context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
