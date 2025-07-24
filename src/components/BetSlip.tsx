"use client";

import { FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { saveNewBet } from "@/utils/localStorage";
import { TOTAL_BET_AMOUNT, formatBetAmount } from "@/config/betting";

import Popup from "@/components/events/Popup";
import { useAppContext } from "@/components/Context";
import useGetAddress from "@/hooks/useGetAddress";
import useGetBalance from "@/hooks/useGetBalance";
import useTransaction from "@/hooks/useTransaction";
import { StakeControl } from "@/components/components/StakeControl";

export interface IBetSlipBet {
  id: string;
  chosen: string;
  bet: string;
  match: string;
  odds: number;
}

function Bet(bet: IBetSlipBet) {
  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex-1 pr-4">
        <p className="text-base text-white">{bet.match} - {bet.chosen}</p>
      </div>
    </div>
  );
}

export default function Betslip() {
  const [expand, setExpand] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const {
    bets: [bets, setBets],
    show: [show, setShow],
    amount: [, setAmount],
  } = useAppContext();
  const [{ error, success }, dispatch] = useTransaction("cUSD");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { address, connectWallet: _connectWallet, isConnecting: _isConnecting } = useGetAddress();
  const [balance, getBalance] = useGetBalance();
  const [placedBet, setPlacedBet] = useState<boolean>(false);
  const [isPlacingBet, setIsPlacingBet] = useState<boolean>(false);

  useEffect(() => {
    const body = document.querySelector("body")!;
    body.style.overflow = expand ? "hidden" : "auto";
  }, [expand]);

  useEffect(() => {
    setAmount(balance);
    
    // If quantity is greater than balance, adjust it
    if (quantity > balance && balance > 0) {
      setQuantity(Math.floor(balance));
    }
  }, [balance, setAmount, quantity]);

  useEffect(() => {
    if (!address || !placedBet) {
      return;
    }

    if (!error) {
      // Save bets to local storage before clearing them
      saveNewBet(bets, quantity);
      
      setBets([]);
      setShow(false);
      setExpand(false);
      setQuantity(0);
      setShowPopup(true);
      getBalance(address);
    } else {
      setErrorMessage(error);
    }
    setPlacedBet(false);
    setIsPlacingBet(false);
  }, [error, setBets, setShow, success, getBalance, address, placedBet, bets, quantity]);

  const handleClose = () => {
    setExpand(false);
    setBets([]);
    setShow(false);
    setQuantity(1);
  };

  useEffect(() => {
    if (bets.length === 0) {
      setShow(false);
      setExpand(false);
    } else {
      setShow(true);
      setExpand(true);
    }
  }, [bets, setShow]);

  const handlePlaceBet = async () => {
    setIsPlacingBet(true);
    await dispatch("0x6E2D3e6a1D03f196f86311F773abC019Eb098fD9", quantity);
    setPlacedBet(true);
  };

  return (
    <>
      {show && (
        <>
          <div
            className={`fixed bottom-0 w-full bg-gray-700 text-white flex justify-center items-end z-[150] transition-all duration-300 mb-16`}
          >
            <div className="flex items-center justify-between w-full p-4">
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">Betslip</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-sm text-gray-400">
                  {bets.length} {bets.length === 1 ? "bet" : "bets"}
                </p>
                <button
                  onClick={handleClose}
                  className="text-bb-accent hover:text-gray-400"
                >
                  {expand ? <FaChevronDown /> : <FaChevronUp />}
                </button>
              </div> 
            </div>
          </div>
          {expand && (
            <>
              <div
                onClick={handleClose}
                className={`fixed bottom-[60px] mx-auto w-[24rem] h-full bg-bb-bg-card-dark bg-opacity-75 text-white flex justify-center items-end z-[150] transition-opacity ${
                  show ? "opacity-100" : "opacity-0"
                }`}
              >
              </div>
              <div className="fixed bottom-[60px] mx-auto w-[24rem] bg-bb-bg-card rounded-t-lg shadow-lg max-w-md p-4 z-[151]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Betslip</h2>
                  <button
                    onClick={handleClose}
                    className="text-bb-accent hover:text-gray-400"
                  >
                    <FaChevronDown />
                  </button>
                </div>
                <div>
                  {bets.map((bet) => (
                    <Bet {...bet} key={bet.id} />
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <StakeControl 
                    onChange={setQuantity} 
                    defaultValue={quantity}
                    maxAmount={balance}
                  />
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-white">Potential Profit</p>
                    <p className="text-bb-success font-bold">
                      {formatBetAmount(
                        quantity * TOTAL_BET_AMOUNT * bets.reduce((acc, bet) => acc * bet.odds, 1)
                      )} $
                    </p>
                  </div>
                  {errorMessage && (
                    <div className="flex flex-row justify-between items-center w-full overflow-scroll mx-auto">
                      <p className="text-bb-error text-xs">{errorMessage}</p>
                    </div>
                  )}
                  <button
                    disabled={!address || quantity <= 0 || isPlacingBet}
                    onClick={handlePlaceBet}
                    className={`${
                      address
                        ? "bg-bb-accent hover:bg-orange-600"
                        : "bg-neutral-400 hover:bg-neutral-500"
                    } text-white px-4 py-2 rounded-md w-full disabled:opacity-50 flex justify-center items-center gap-2`}
                  >
                    {isPlacingBet
                      ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Placing bet...
                        </>
                      )
                      : (
                        "Place Bet"
                      )}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
      
      {showPopup && <Popup fn={() => setShowPopup(false)} />}
    </>
  );
}
