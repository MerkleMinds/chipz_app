interface IAsianProps {
  team: string;
  choices: {
    left: {
      odds: number;
      description: string;
    };
    middle: {
      odds: number;
      description: string;
    };
    right: {
      odds: number;
      description: string;
    };
  };
}

export default function Asian(team: IAsianProps) {
  return (
    <div className="flex justify-evenly items-center rounded-md p-2 mb-3 bg-gray-900">
      <div className="flex flex-row items-center gap-2 justify-center min-w-0 max-w-xs hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">{team.choices.left.description}</p>
        <p className="font-bold text-white">{team.choices.left.odds}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div className="flex flex-row items-center gap-2 justify-center min-w-0 max-w-xs hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">{team.choices.middle.description}</p>
        <p className="font-bold text-white">{team.choices.middle.odds}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div className="flex flex-row items-center gap-2 justify-center min-w-0 max-w-xs hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">{team.choices.right.description}</p>
        <p className="font-bold text-white">{team.choices.right.odds}</p>
      </div>
    </div>
  );
}
