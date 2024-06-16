interface IHeadToHeadProps {
  home: {
    name: string;
    odds: string;
  };
  draw: {
    odds: string;
  };
  away: {
    name: string;
    odds: string;
  };
}

export default function HeadToHead({ home, draw, away }: IHeadToHeadProps) {
  return (
    <div className="flex justify-evenly items-center rounded-md p-2 mb-3 bg-gray-900">
      <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">{home.name}</p>
        <p className="font-bold text-white">{home.odds}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">X</p>
        <p className="font-bold text-white">{draw.odds}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">{away.name}</p>
        <p className="font-bold text-white">{away.odds}</p>
      </div>
    </div>
  );
}
