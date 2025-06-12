import { IBetv2 } from "@/components/bets/Betv2";
import { MenuState } from "@/components/bets/Menu";
import { IBetSlipBet } from "@/components/BetSlip";
import { TOTAL_BET_AMOUNT, formatBetAmount } from "@/config/betting";

// Keys for storing different types of bets
const PLACED_BETS_KEY = "chipz-placed-bets";
const SETTLED_BETS_KEY = "chipz-settled-bets";

// Default settled bet for design purposes
// Using configuration values instead of hardcoded numbers
const DEFAULT_BET_QUANTITY = 0.5; // 50% of total bet amount
const DEFAULT_BET_ODDS = 3.2;  // This could be moved to betting config if needed

const DEFAULT_SETTLED_BET: IBetv2 = {
  title: "EuroCup Qualifiers",
  bet: "France vs. Germany - Draw",
  competition: "EuroCup",
  date: new Date("2023-09-10"),
  stake: Number(formatBetAmount(DEFAULT_BET_QUANTITY * TOTAL_BET_AMOUNT)),
  odds: DEFAULT_BET_ODDS,
  potential: Number(formatBetAmount(DEFAULT_BET_QUANTITY * TOTAL_BET_AMOUNT * DEFAULT_BET_ODDS)),
  kind: MenuState.SETTLED,
  result: "win",
  eventId: "ev-002"
};

/**
 * Convert a BetSlip bet to the format used in the bets page
 */
export function convertBetSlipToBetv2(bet: IBetSlipBet, quantity: number): IBetv2 {
  // Calculate stake based on quantity and configured bet amount
  const stake = quantity * TOTAL_BET_AMOUNT;
  
  // Calculate potential profit correctly using multiplication
  // Use the same formatting as defined in the betting config
  const potential = Number(formatBetAmount(stake * bet.odds));
  
  // Ensure the event ID is properly formatted for navigation
  let eventId = bet.id;
  if (!eventId.startsWith('ev-')) {
    // If the ID doesn't have the proper format, prefix it with 'ev-'
    eventId = `ev-${eventId}`;
  }
  
  return {
    title: bet.match,
    bet: `${bet.match} - ${bet.chosen}`,
    competition: bet.match.split(" ")[0], // Use first part of match as competition
    date: new Date(),
    stake: Number(formatBetAmount(stake)), // Use betting config formatting
    odds: bet.odds,
    potential: potential,
    kind: MenuState.OPEN,
    eventId: eventId
  };
}

/**
 * Save placed bets to local storage
 */
export function savePlacedBets(bets: IBetv2[]): void {
  try {
    localStorage.setItem(PLACED_BETS_KEY, JSON.stringify(bets));
  } catch (error) {
    console.error("Failed to save bets to local storage:", error);
  }
}

/**
 * Get placed bets from local storage
 */
export function getPlacedBets(): IBetv2[] {
  try {
    const storedBets = localStorage.getItem(PLACED_BETS_KEY);
    if (!storedBets) return [];
    
    // Parse and fix dates (JSON.parse doesn't convert date strings back to Date objects)
    const parsedBets = JSON.parse(storedBets) as IBetv2[];
    return parsedBets.map(bet => ({
      ...bet,
      date: new Date(bet.date)
    }));
  } catch (error) {
    console.error("Failed to get bets from local storage:", error);
    return [];
  }
}

/**
 * Get settled bets from local storage or return default if none exist
 */
export function getSettledBets(): IBetv2[] {
  try {
    const storedBets = localStorage.getItem(SETTLED_BETS_KEY);
    if (!storedBets) {
      // Return default settled bet if none exist
      return [DEFAULT_SETTLED_BET];
    }
    
    // Parse and fix dates
    const parsedBets = JSON.parse(storedBets) as IBetv2[];
    const bets = parsedBets.map(bet => ({
      ...bet,
      date: new Date(bet.date)
    }));
    
    // If there are no stored settled bets, add the default one
    if (bets.length === 0) {
      return [DEFAULT_SETTLED_BET];
    }
    
    return bets;
  } catch (error) {
    console.error("Failed to get settled bets from local storage:", error);
    return [DEFAULT_SETTLED_BET];
  }
}

/**
 * Save a new bet to local storage
 */
export function saveNewBet(betSlipBets: IBetSlipBet[], quantity: number): void {
  try {
    // For parlay bets (multiple bets), we need to handle them differently
    // than individual bets. For parlays, the total stake is divided among all bets,
    // but the potential is calculated by multiplying all odds together.
    
    if (betSlipBets.length > 1) {
      // This is a parlay bet - create individual bets with the stake divided
      // Each bet gets an equal portion of the total stake
      const stakePerBet = Number(formatBetAmount(quantity / betSlipBets.length));
      const newBets = betSlipBets.map(bet => convertBetSlipToBetv2(bet, stakePerBet));
      
      // Get existing bets and add new ones
      const existingBets = getPlacedBets();
      const updatedBets = [...existingBets, ...newBets];
      
      // Save updated bets
      savePlacedBets(updatedBets);
    } else if (betSlipBets.length === 1) {
      // Single bet - use the full quantity
      const newBet = convertBetSlipToBetv2(betSlipBets[0], quantity);
      
      // Get existing bets and add new one
      const existingBets = getPlacedBets();
      const updatedBets = [...existingBets, newBet];
      
      // Save updated bets
      savePlacedBets(updatedBets);
    }
  } catch (error) {
    console.error("Failed to save new bet to local storage:", error);
  }
}
