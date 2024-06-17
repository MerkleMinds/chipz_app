"use client";
import { FaCheckCircle } from "react-icons/fa";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface IPopupProps {
  fn: () => void;
}

export default function Popup({ fn }: IPopupProps) {
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-all duration-300">
      <div className="relative bg-gray-900 text-white font-bold py-6 px-10 rounded-lg shadow-2xl flex flex-col gap-6 animate-fadeIn w-[80%]">
        <div className="flex flex-col items-center text-center">
          <FaCheckCircle className="text-green-500 text-4xl mb-3" />
          <h2 className="text-3xl mb-2">Success</h2>
          <p className="text-lg">Your bet has been placed successfully.</p>
          <button
            onClick={fn}
            className="mt-6 py-3 px-5 bg-bb-success text-white rounded-md w-full transition-colors duration-200 hover:bg-bb-success-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bb-success-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
