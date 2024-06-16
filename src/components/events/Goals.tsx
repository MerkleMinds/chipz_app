interface IGoalsProps {
  amount: number;
  over: number;
  under: number;
}

export default function Goals(goal: IGoalsProps) {
  return (
    <div className="flex justify-evenly items-center rounded-md p-2 mb-3 bg-gray-900">
      <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">U{goal.amount}</p>
        <p className="font-bold text-white">{goal.under}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">O{goal.amount}</p>
        <p className="font-bold text-white">{goal.over}</p>
      </div>
    </div>
  );
}
