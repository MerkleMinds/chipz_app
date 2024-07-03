import { FaFire } from "react-icons/fa6";

interface IRating {
  rating: number;
  previousRating: number;
  description: string;
}

const ratings = [
  {
    rating: 4.5,
    previousRating: 3.9,
    description: "FC Barcelona: 3 goals",
  },
  {
    rating: 3.8,
    previousRating: 3.5,
    description: "Real Madrid: 2 goals",
  },
  {
    rating: 2.2,
    previousRating: 1.95,
    description: "Atlético Madrid: 1 goal",
  },
];

function Card(item: IRating) {
  return (
    <div className="w-64 shadow-md rounded-lg p-4 border border-neutral-700 flex-grow-0 flex-shrink-0 flex-auto bg-gray-800  transition-colors duration-300">
      <h2 className="text-lg font-semibold text-white">
        {item.rating}{" "}
        <span className="text-gray-700 line-through ml-1">
          {item.previousRating}
        </span>
      </h2>
      <p className="text-gray-200">{item.description}</p>
      <span className="font-medium text-sm text-bb-accent pb-1 border-b-2 border-neutral-700 group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]">
        Place Bet
      </span>
    </div>
  );
}

export default function Hot() {
  return (
    <div className="flex flex-col mx-3 gap-3">
      <div className="flex flex-row gap-1 items-center">
        <FaFire className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just">Hot Today</h1>
      </div>
      <div className="flex overflow-x-scroll gap-3 no-scrollbar">
        {ratings.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
