"use client";

import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

interface IBannerProps {
  name: string;
  points: number;
}

export default function Banner({ name, points }: IBannerProps) {
  const [show, setShow] = useState<boolean>(true);

  if (!show) {
    return null;
  }

  return (
    <div className="relative w-full rounded-md bg-gray-800 p-2 flex flex-col gap-1">
      <button
        className="absolute top-2 right-2 text-white"
        onClick={() => setShow(false)}
      >
        <FaTimes />
      </button>
      <p className="text-neutral-400">
        Hi <span className="text-white font-mono font-bold">{name}</span>,
      </p>
      <p className="text-neutral-400 text-sm">
        you have <span className="font-bold">{points}</span>{" "}
        points to spend at the{" "}
        <Link href={"/promo#shop"} className="text-neutral-400 underline">
          shop
        </Link>
      </p>
    </div>
  );
}
