"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBaseballBatBall,
  FaBitcoinSign,
  FaBolt,
  FaCalendarDay,
  FaFootball,
  FaFutbol,
  FaGolfBallTee,
  FaMagnifyingGlass,
  FaSpinner,
  FaTableTennisPaddleBall,
  FaTrophy,
  FaUser,
} from "react-icons/fa6";
import { context } from "./Utils";
import { perform } from "@/utils/client";

const sports = [
  { name: "Live", icon: FaBolt },
  { name: "Today", icon: FaCalendarDay },
  { name: "Lossless", icon: FaBitcoinSign },
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
      }`}
    >
      <div
        className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800 w-full rounded-md m-5"
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
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[155] ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800 w-full rounded-md m-5"
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

  const { amount } = useContext(context);

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full pt-2 pb-3 bg-gray-900 shadow-lg gap-3">
      <nav
        className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto"
        aria-label="Global"
      >
        <Link className="md:col-span-3" href="/">
          <img src="/logo.png" alt="BlockBet" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
          {isLoggedIn
            ? (
              <div className="flex items-center flex-row gap-3">
                <Link
                  href="/profile"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-bb-accent text-bb-accent disabled:opacity-50 disabled:pointer-events-none"
                >
                  Deposit
                </Link>
                <div className="flex items-center justify-center flex-col gap-2">
                  <FaUser className="h-4 w-auto text-neutral-400" />
                  <span className="text-xs text-white font-semibold">
                    {amount.toFixed(2)} cUSD
                  </span>
                </div>
              </div>
            )
            : (
              <>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-gray-200 text-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={openLoginPopup}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-bb-accent text-bb-accent bg-[#ff5f1f30] hover:border-bb-accent transition disabled:opacity-50 disabled:pointer-events-none focus:bg-[#ff5f1f50]"
                  onClick={openRegisterPopup}
                >
                  Register
                </button>
              </>
            )}
        </div>
      </nav>
      <div className="flex mx-4 gap-5 overflow-x-scroll no-scrollbar">
        {sports.map((sport) => <Icon key={sport.name} {...sport} />)}
      </div>

      <LoginPopup isOpen={isLoginOpen} onClose={closeLoginPopup} />
      <RegisterPopup isOpen={isRegisterOpen} onClose={closeRegisterPopup} />
    </header>
  );
}
