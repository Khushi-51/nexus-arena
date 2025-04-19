
import { Hero, Battle, BattleRound } from "../types/game";
import { generateRandomId, rollChance, xpNeededForLevel } from "./utils";

// Calculate attack damage
const calculateDamage = (attacker: Hero, defender: Hero): number => {
  const baseDamage = attacker.attributes.strength * 2;
  const defense = defender.attributes.defense;
  
  // Apply luck for critical hits
  const criticalMultiplier = rollChance(attacker.attributes.luck) ? 1.5 : 1;
  
  // Apply element advantage/disadvantage
  const elementMultiplier = getElementalMultiplier(attacker.element, defender.element);
  
  // Calculate final damage with some randomness
  const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
  let damage = Math.floor((baseDamage - defense / 2) * criticalMultiplier * elementMultiplier * randomFactor);
  
  // Ensure minimum damage
  damage = Math.max(damage, 5);
  
  return damage;
};

// Get elemental advantage/disadvantage multiplier
const getElementalMultiplier = (attackerElement: Hero["element"], defenderElement: Hero["element"]): number => {
  const advantages = {
    fire: "earth",
    earth: "air",
    air: "water",
    water: "fire",
    light: "dark",
    dark: "light"
  };
  
  if (advantages[attackerElement] === defenderElement) {
    return 1.5; // Super effective
  } else if (advantages[defenderElement] === attackerElement) {
    return 0.75; // Not very effective
  }
  
  return 1; // Normal effectiveness
};

// Generate a description of the attack effect
const generateEffectDescription = (
  attacker: Hero, 
  defender: Hero, 
  damage: number, 
  isCritical: boolean
): string => {
  const elementEffects = {
    fire: "scorches",
    water: "drenches",
    earth: "crushes",
    air: "slashes",
    light: "blinds",
    dark: "corrupts"
  };
  
  const effect = elementEffects[attacker.element];
  
  if (isCritical) {
    return `${attacker.name}'s critical attack ${effect} ${defender.name} for ${damage} damage!`;
  }
  
  return `${attacker.name} ${effect} ${defender.name} for ${damage} damage`;
};

// Simulate a battle between two heroes
export const simulateBattle = (hero1: Hero, hero2: Hero): Battle => {
  // Initialize battle data
  const battleId = generateRandomId();
  const rounds: BattleRound[] = [];
  
  // Clone heroes to track battle state
  let hero1HP = hero1.level * 100 + hero1.attributes.defense * 5;
  let hero2HP = hero2.level * 100 + hero2.attributes.defense * 5;
  
  // Determine who goes first based on agility
  let firstAttacker = hero1.attributes.agility >= hero2.attributes.agility ? hero1 : hero2;
  let secondAttacker = firstAttacker.id === hero1.id ? hero2 : hero1;
  
  // Battle until one hero's HP reaches 0
  let roundNumber = 1;
  let currentAttacker = firstAttacker;
  let currentDefender = secondAttacker;
  let currentDefenderHP = currentAttacker.id === hero1.id ? hero2HP : hero1HP;
  
  while (hero1HP > 0 && hero2HP > 0 && roundNumber <= 20) { // Max 20 rounds
    // Calculate damage
    const isCritical = rollChance(currentAttacker.attributes.luck);
    const damage = calculateDamage(currentAttacker, currentDefender);
    
    // Apply damage
    if (currentAttacker.id === hero1.id) {
      hero2HP -= damage;
      currentDefenderHP = hero2HP;
    } else {
      hero1HP -= damage;
      currentDefenderHP = hero1HP;
    }
    
    // Record round
    rounds.push({
      round: roundNumber,
      attacker: currentAttacker.id,
      damage,
      effectDescription: generateEffectDescription(
        currentAttacker, 
        currentDefender, 
        damage, 
        isCritical
      ),
      defenderHpLeft: Math.max(0, currentDefenderHP)
    });
    
    // Switch attacker for next round
    const temp = currentAttacker;
    currentAttacker = currentDefender;
    currentDefender = temp;
    currentDefenderHP = currentAttacker.id === hero1.id ? hero2HP : hero1HP;
    
    roundNumber++;
  }
  
  // Determine winner
  const winner = hero1HP > hero2HP ? hero1 : hero2;
  const loser = winner.id === hero1.id ? hero2 : hero1;
  
  // Calculate experience gained
  const expGainBase = 20;
  const levelDifference = loser.level - winner.level;
  const levelMultiplier = Math.max(1, 1 + levelDifference * 0.2); // More XP if defeating higher level opponent
  const experienceGained = Math.floor(expGainBase * levelMultiplier);
  
  return {
    id: battleId,
    timestamp: new Date().toISOString(),
    hero1: {
      id: hero1.id,
      name: hero1.name,
      owner: hero1.owner
    },
    hero2: {
      id: hero2.id,
      name: hero2.name,
      owner: hero2.owner
    },
    winner: winner.id,
    loser: loser.id,
    rounds,
    experienceGained,
    transactionHash: generateRandomId()
  };
};

// Apply battle results to heroes
export const applyBattleResults = (battle: Battle, hero1: Hero, hero2: Hero): [Hero, Hero] => {
  const winner = battle.winner === hero1.id ? hero1 : hero2;
  const loser = battle.loser === hero1.id ? hero1 : hero2;
  
  // Update battle records
  winner.battles.wins += 1;
  loser.battles.losses += 1;
  
  // Add experience to winner
  winner.experience += battle.experienceGained;
  
  // Check for level up
  const xpNeeded = xpNeededForLevel(winner.level);
  if (winner.experience >= xpNeeded) {
    winner.level += 1;
    // Could also increase attributes here
  }
  
  return [
    hero1.id === winner.id ? winner : loser,
    hero2.id === winner.id ? winner : loser
  ];
};
