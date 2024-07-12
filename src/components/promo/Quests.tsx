import { FaClock } from "react-icons/fa6";

interface IQuest {
  name: string;
  description: string;
  points: number;
  progress: number;
  completed: boolean;
}

const quests: IQuest[] = [
  {
    name: "Daily Quest",
    description: "Bet in 3 matches",
    points: 50,
    progress: 100,
    completed: true,
  },
  {
    name: "Weekly Quest",
    description: "Bet in 10 matches",
    points: 200,
    progress: 50,
    completed: false,
  },
  {
    name: "Monthly Quest",
    description: "Bet in 30 matches",
    points: 500,
    progress: 25,
    completed: false,
  },
];

function Quest({ name, description, points, progress }: IQuest) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg shadow-md w-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-white font-bold text-sm">{name}</h1>
        <span
          className={`text-white font-bold text-xs rounded-full px-2 py-1 bg-bb-accent`}
        >
          {points} pts
        </span>
      </div>
      <p className="text-gray-400 text-xs">{description}</p>
      <div className="flex items-center gap-2">
        <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-2 bg-bb-accent rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-white font-bold text-xs">{progress}%</span>
      </div>
    </div>
  );
}

export default function Quests() {
  return (
    <div className="flex flex-col mx-4 gap-4 text-xs pb-16">
      <div className="flex flex-row gap-2 items-center">
        <FaClock className="text-bb-accent" />
        <h1 className="text-white font-bold text-sm">Quests</h1>
      </div>
      <div className="flex flex-col gap-4">
        {quests.map((quest, index) => <Quest key={index} {...quest} />)}
      </div>
    </div>
  );
}
