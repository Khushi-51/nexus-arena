
import { Hero } from "../types/game";
import { generateRandomId, hashString } from "./utils";

// Element colors for hero rendering
export const ELEMENT_COLORS = {
  fire: { primary: "#FF5733", secondary: "#FFC300" },
  water: { primary: "#33A1FF", secondary: "#33FFF6" },
  earth: { primary: "#8B4513", secondary: "#A0522D" },
  air: { primary: "#F0FFFF", secondary: "#E6E6FA" },
  light: { primary: "#FFFACD", secondary: "#FFFFE0" },
  dark: { primary: "#483D8B", secondary: "#4B0082" }
};

// Rarity colors for styling
export const RARITY_COLORS = {
  common: { text: "#A0A0A0", border: "#C0C0C0", glow: "0px 0px 5px #C0C0C0" },
  uncommon: { text: "#1EFF00", border: "#1EFF00", glow: "0px 0px 5px #1EFF00" },
  rare: { text: "#0070DD", border: "#0070DD", glow: "0px 0px 8px #0070DD" },
  epic: { text: "#A335EE", border: "#A335EE", glow: "0px 0px 12px #A335EE" },
  legendary: { text: "#FF8000", border: "#FF8000", glow: "0px 0px 15px #FF8000" }
};

// Names for hero generation
const HERO_NAME_PREFIXES = [
  "Aether", "Blaze", "Cryo", "Draco", "Ember", "Frost", "Gale",
  "Hydra", "Ignis", "Jolt", "Kyro", "Luna", "Magma", "Nova", 
  "Orion", "Pyro", "Quake", "Ripple", "Storm", "Terra", "Umbra", 
  "Volt", "Wisp", "Xenon", "Zephyr"
];

const HERO_NAME_SUFFIXES = [
  "blade", "caster", "defender", "enforcer", "fury", "guardian", "hunter",
  "immortal", "juggernaut", "knight", "lord", "master", "ninja",
  "oracle", "phantom", "quester", "ranger", "slayer", "titan",
  "vanquisher", "warden", "zealot"
];

// Generate a hero image based on hash
export const generateHeroImage = (seed: string): string => {
  // In a real app, this would call an API to generate an image
  // For now, we'll return a placeholder
  const hash = hashString(seed);
  const backgroundId = hash % 10;
  return `https://robohash.org/${seed}.png?set=set4&size=250x250`;
};

// Generate hero stats based on name hash
export const generateHeroStats = (name: string) => {
  const hash = hashString(name);
  
  // Determine rarity based on hash
  let rarity: Hero["rarity"] = "common";
  const rarityRoll = hash % 100;
  
  if (rarityRoll >= 99) rarity = "legendary";     // 1% chance
  else if (rarityRoll >= 90) rarity = "epic";     // 9% chance
  else if (rarityRoll >= 75) rarity = "rare";     // 15% chance
  else if (rarityRoll >= 50) rarity = "uncommon"; // 25% chance
  
  // Determine element based on hash
  const elements: Hero["element"][] = ["fire", "water", "earth", "air", "light", "dark"];
  const element = elements[(hash % 7) % elements.length];
  
  // Generate base stats (higher based on rarity)
  const rarityMultiplier = {
    common: 1,
    uncommon: 1.2,
    rare: 1.5, 
    epic: 1.8,
    legendary: 2.2
  };
  
  // Use different parts of the hash for different attributes
  const statsBase = Math.floor((hash % 1000) / 100) + 10; // 10-19 base stat
  const multiplier = rarityMultiplier[rarity];
  
  return {
    attributes: {
      strength: Math.floor((statsBase + (hash % 10)) * multiplier),
      defense: Math.floor((statsBase + ((hash / 10) % 10)) * multiplier),
      agility: Math.floor((statsBase + ((hash / 100) % 10)) * multiplier),
      intelligence: Math.floor((statsBase + ((hash / 1000) % 10)) * multiplier),
      luck: Math.floor((statsBase + ((hash / 10000) % 10)) * multiplier),
    },
    rarity,
    element
  };
};

// Generate a random hero name
export const generateRandomHeroName = (): string => {
  const prefix = HERO_NAME_PREFIXES[Math.floor(Math.random() * HERO_NAME_PREFIXES.length)];
  const suffix = HERO_NAME_SUFFIXES[Math.floor(Math.random() * HERO_NAME_SUFFIXES.length)];
  return `${prefix} ${suffix}`;
};

// Create a new hero with a given name and owner
export const createHero = (name: string, ownerAddress: string): Hero => {
  const stats = generateHeroStats(name);
  const heroId = generateRandomId();

  return {
    id: heroId,
    name,
    image: generateHeroImage(name + heroId),
    owner: ownerAddress,
    level: 1,
    experience: 0,
    attributes: stats.attributes,
    rarity: stats.rarity,
    element: stats.element,
    battles: {
      wins: 0,
      losses: 0
    },
    mintedAt: new Date().toISOString()
  };
};
