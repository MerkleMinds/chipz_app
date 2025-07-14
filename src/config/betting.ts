/**
 * Betting configuration
 * 
 * This file contains configuration values for the betting system.
 */

// The total bet amount scale (default: 100)
// For testing, you can use smaller values like 0.1 or 10
export const TOTAL_BET_AMOUNT = 0.1;

// Calculate the scale factor based on the total bet amount
// This converts from the percentage (0-100) to the actual bet amount
export const BET_SCALE_FACTOR = TOTAL_BET_AMOUNT / 100;

/**
 * Formats a bet amount with appropriate decimal places
 * @param amount The bet amount to format
 * @returns Formatted bet amount string
 */
export function formatBetAmount(amount: number): string {
  // Determine decimal places based on total bet amount
  const decimalPlaces = TOTAL_BET_AMOUNT >= 1 ? 2 : 3;
  return amount.toFixed(decimalPlaces);
}
