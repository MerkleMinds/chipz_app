import { useAppContext } from "@/components/Context";
import { hashBet } from "@/components/bets/Betv2";
import { Event, EventOption } from "@/utils/data/types";

export type BetType = "yes" | "no" | "option" | "opposite";

// Using the EventOption type directly from the application

/**
 * Custom hook for handling bet operations across the application
 * Provides a consistent API for adding bets to the betslip
 */
export function useBetHandler() {
  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  /**
   * Add a bet to the betslip for a simple yes/no market
   * @param market - The market to bet on
   * @param betType - The type of bet (yes/no)
   */
  const addSimpleBet = (market: { title: string; probability: number }, betType: "yes" | "no") => {
    if (!market?.title) return;

    const bet = {
      id: hashBet({
        date: new Date(),
        title: market.title,
      }),
      chosen: betType === "yes" ? "Yes" : "No",
      bet: betType,
      match: market.title,
      odds: betType === "yes" ? market.probability : 100 - market.probability,
    };

    setBets((bets) => [bet, ...bets]);
    setShow(true);
  };

  /**
   * Add a bet to the betslip for a multi-option market
   * @param event - The event containing the market
   * @param option - The selected option
   * @param betType - Whether to bet on the option or against it
   */
  const addOptionBet = (
    event: { title: string },
    option: EventOption,
    betType: "option" | "opposite"
  ) => {
    if (!event?.title || !option?.title) return;

    const betTitle = `${event.title} - ${option.title}`;
    const odds = betType === "option" ? option.probability : 100 - option.probability;

    const bet = {
      id: hashBet({
        date: new Date(),
        title: betTitle,
      }),
      chosen: option.title,
      bet: betType === "option" ? "yes" : "no",
      match: betTitle,
      odds: odds,
    };

    setBets((bets) => [bet, ...bets]);
    setShow(true);
  };

  /**
   * Unified method to handle all types of bets
   * @param event - The event containing the market
   * @param betType - The type of bet
   * @param selectedOptionId - The ID of the selected option (for multi-option bets)
   */
  const placeBet = (
    event: Event | { title: string; probability: number; options?: EventOption[] },
    betType: BetType,
    selectedOptionId?: string
  ) => {
    if (!event?.title) return;

    // For simple yes/no bets
    if (betType === "yes" || betType === "no") {
      if (typeof event.probability !== 'number') return;
      
      addSimpleBet(
        { title: event.title, probability: event.probability },
        betType
      );
      return;
    }

    // For multi-option bets
    if ((betType === "option" || betType === "opposite") && event.options) {
      const selectedOption = selectedOptionId
        ? event.options.find((opt) => opt.id === selectedOptionId)
        : event.options[0];

      if (!selectedOption) return;

      addOptionBet(event, selectedOption, betType);
    }
  };

  return { placeBet, addSimpleBet, addOptionBet };
}
