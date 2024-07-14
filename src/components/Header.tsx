"use client";

import {
  FaBaseballBatBall,
  FaBitcoinSign,
  FaBolt,
  FaCalendarDay,
  FaFootball,
  FaFutbol,
  FaGift,
  FaGolfBallTee,
  FaMagnifyingGlass,
  FaSpinner,
  FaTableTennisPaddleBall,
  FaTrophy,
  FaUser,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

import Link from "next/link";
import { perform } from "@/utils/client";
import { useAppContext } from "@/components/Context";

const sports = [
  { name: "Live", icon: FaBolt },
  { name: "Today", icon: FaCalendarDay },
  { name: "Lossless", icon: FaBitcoinSign },
  { name: "Promo", icon: FaGift },
  { name: "NFL", icon: FaFootball },
  { name: "Soccer", icon: FaFutbol },
  { name: "Baseball", icon: FaBaseballBatBall },
  { name: "Tennis", icon: FaTableTennisPaddleBall },
  { name: "Golf", icon: FaGolfBallTee },
  { name: "Euros", icon: FaTrophy },
  { name: "Search", icon: FaMagnifyingGlass },
];

const Icon = ({
  name,
  icon: IconComponent,
}: {
  name: string;
  icon: React.ComponentType<{ size: number }>;
}) => (
  <div className="flex items-center justify-center gap-1 flex-col min-w-10 max-w-10 text-neutral-400 hover:text-white transition-colors duration-300">
    <IconComponent size={24} />
    <span className="text-xs">{name}</span>
  </div>
);

const LoginPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("auth_token", "custom_token");
    onClose();
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[155] ${
        isOpen ? "" : "hidden"
      } mx-2`}
    >
      <div
        className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800 rounded-md m-5 w-[24rem] mx-auto"
        onClick={stopPropagation}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/logo.png" alt="BlockBet" />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="emailLogin"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="emailLogin"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm bg-gray-900 text-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="passwordLogin"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="text-bb-accent">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="passwordLogin"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm bg-gray-900 text-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex text-white w-full justify-center rounded-md bg-bb-accent px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-xs text-gray-500">
            Not a member?{" "}
            <a href="#" className="leading-6 text-bb-accent">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const RegisterPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await perform("user_create", {
      email,
      password,
      username: email.split("@")[0],
      balance: 0,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (result.error) {
      console.error(result.error);
      setLoading(false);
    } else {
      setLoading(false);
      localStorage.setItem("auth_token", "custom_token");
      localStorage.setItem("user_data", JSON.stringify(result.data));
      onClose();
    }
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[155] ${
        isOpen ? "" : "hidden"
      } mx-2`}
    >
      <div
        className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800 rounded-md m-5 w-[24rem] mx-auto"
        onClick={stopPropagation}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/logo.png" alt="BlockBet" />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled={loading}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="disabled:opacity-50 px-2 block w-full rounded-md border-0 py-1.5 shadow-sm bg-gray-900 text-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="disabled:opacity-50 px-2 block w-full rounded-md border-0 py-1.5 shadow-sm bg-gray-900 text-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="disabled:opacity-50 flex items-center gap-2 text-white w-full justify-center rounded-md bg-bb-accent px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm"
              >
                {loading && <FaSpinner className="animate-spin mr-2" />}
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-gray-500 text-xs">
            Already have an account?{" "}
            <a href="#" className="leading-6 text-bb-accent">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { amount: [amount] } = useAppContext();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("auth_token");
    if (isUserLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoginOpen, isRegisterOpen]);

  const openLoginPopup = () => {
    setLoginOpen(true);
  };

  const closeLoginPopup = () => {
    setLoginOpen(false);
  };

  const openRegisterPopup = () => {
    setRegisterOpen(true);
  };

  const closeRegisterPopup = () => {
    setRegisterOpen(false);
  };

  return (
    <header className="w-full bg-gray-900 shadow-lg">
      <div className="flex justify-between items-center px-4 py-2 pt-4 md:px-4">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="BlockBet" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-2">
          {isLoggedIn
            ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-bb-accent text-bb-accent"
                >
                  Deposit
                </Link>
                <div className="flex items-center gap-2 flex-col">
                  <FaUser className="h-4 text-neutral-400" />
                  <span className="text-xs text-white font-semibold">
                    {amount.toFixed(2)} $
                  </span>
                </div>
              </div>
            )
            : (
              <>
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium border-2 border-gray-200 text-gray-200 rounded-lg"
                  onClick={openLoginPopup}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium border-2 border-bb-accent text-bb-accent bg-[#ff5f1f30] hover:bg-[#ff5f1f50] rounded-lg"
                  onClick={openRegisterPopup}
                >
                  Register
                </button>
              </>
            )}
        </div>
      </div>
      <div className="flex overflow-x-auto no-scrollbar p-4">
        {sports.map((sport) => (
          <Link
            key={sport.name}
            href={`/${sport.name.toLowerCase()}`}
            className="mr-5"
          >
            <Icon {...sport} />
          </Link>
        ))}
      </div>
      <LoginPopup isOpen={isLoginOpen} onClose={closeLoginPopup} />
      <RegisterPopup isOpen={isRegisterOpen} onClose={closeRegisterPopup} />
    </header>
  );
}
