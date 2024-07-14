"use client";

import { useEffect, useState } from "react";

import { FaShoppingBasket } from "react-icons/fa";
import { useAppContext } from "@/components/Context";
import useTransaction from "@/hooks/useTransaction";

interface IShopItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

const shopItems: IShopItem[] = [
  {
    name: "Free bet",
    description: "Value of 10 $",
    price: 250,
    image: "/promo_freebet.png",
  },
  {
    name: "Free bet",
    description: "Value of 50 $",
    price: 2000,
    image: "/promo_freebet.png",
  },
  {
    name: "Odds boost",
    description: "Boosts your odds by 1.5x",
    price: 500,
    image: "/promo_oddboost.png",
  },
  {
    name: "Odds boost",
    description: "Boosts your odds by 2.5x",
    price: 1250,
    image: "/promo_oddboost.png",
  },
  {
    name: "Instant cashout",
    description: "Cash out 10 $ instantly",
    price: 2500,
    image: "/promo_cashout.png",
  },
  {
    name: "Instant cashout",
    description: "Cash out 50 $ instantly",
    price: 22500,
    image: "/promo_cashout.png",
  },
];

const ShopItem: React.FC<IShopItem> = ({ image, name, description, price }) => {
  const [bought, setBought] = useState<boolean | null>(null);
  const { points: [points, setPoints] } = useAppContext();
  const [{ error, success }, dispatch] = useTransaction("lHKTHN");

  useEffect(() => {
    if (success) {
      setBought(true);
      setPoints((prev) => prev - price);
    }
    if (error) {
      console.error(error);
      setBought(false);
    }
  }, [error, success]);

  return (
    <div className="flex flex-col bg-gray-800 p-2 rounded-lg shadow-md">
      <img
        className="w-full h-36 object-cover rounded-lg mb-2"
        src={image}
        alt={name}
      />
      <div className="flex flex-col justify-between h-full gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-bold text-sm">{name}</h1>
          <p className="text-gray-300">{description}</p>
          <p className="text-gray-400">{price} pts.</p>
        </div>
        <div className="flex justify-end mt-auto">
          <button
            onClick={async () => {
              if (points < price) {
                return;
              }
              await dispatch(
                "0x6E2D3e6a1D03f196f86311F773abC019Eb098fD9",
                price,
              );
            }}
            className={`text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition-all duration-300 ${
              bought === null
                ? "bg-neutral-400"
                : bought
                ? "bg-bb-success"
                : "bg-bb-error"
            }`}
          >
            {bought === null ? "Buy now" : bought ? "Bought" : "Error"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Shop() {
  return (
    <div className="flex flex-col mx-4 gap-4 text-xs" id="shop">
      <div className="flex flex-row gap-2 items-center">
        <FaShoppingBasket className="text-bb-accent" />
        <h1 className="text-white font-bold text-sm">Shop</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {shopItems.sort((a, b) => a.price - b.price).map((item, index) => (
          <ShopItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
