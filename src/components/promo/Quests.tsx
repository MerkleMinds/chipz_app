import { FaCheck, FaHatWizard, FaHourglassHalf, FaMoon } from "react-icons/fa6";

interface IQuest {
  name: string;
  description: string;
  points: number;
  progress: number;
  completed: boolean;
  status: "completed" | "active" | "failed";
}

const quests: IQuest[] = [
  {
    name: "Daily Quest",
    description: "Bet in 3 matches",
    points: 50,
    progress: 100,
    completed: true,
    status: "completed",
  },
  {
    name: "Weekly Quest",
    description: "Bet in 10 matches",
    points: 200,
    progress: 50,
    completed: false,
    status: "active",
  },
  {
    name: "Monthly Quest",
    description: "Bet in 30 matches",
    points: 500,
    progress: 25,
    completed: false,
    status: "active",
  },
  {
    name: "Special Quest",
    description: "Bet 10 $ 2 times in the EFL week 1",
    points: 100,
    progress: 50,
    completed: false,
    status: "failed",
  },
];

function Quest({ name, description, points, progress, status }: IQuest) {
  const progressBarColor = status === "completed"
    ? "bg-bb-success"
    : status === "failed"
    ? "bg-neutral-400"
    : "bg-bb-accent";

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-bold text-sm">{name}</h1>
        <span
          className={`text-white font-bold text-xs rounded-full px-2 py-1 ${progressBarColor}`}
        >
          {points} pts
        </span>
      </div>
      <p className="text-gray-400 text-xs mt-2">{description}</p>
      <div className="flex items-center mt-2">
        <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full ${progressBarColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="ml-2 text-white font-bold text-xs">{progress}%</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span
          className={`text-xs font-semibold ${
            status === "completed" ? "text-bb-success" : "text-gray-400"
          }`}
        >
          {status === "completed"
            ? (
              <div className="flex items-center justify-center gap-2 flex-row">
                <FaCheck className="text-bb-success" />
                <span>Completed</span>
              </div>
            )
            : status === "failed"
            ? (
              <div className="flex items-center justify-center gap-2 flex-row">
                <FaMoon className="text-neutral-400" />
                <span>Failed</span>
              </div>
            )
            : (
              <div className="flex items-center justify-center gap-2 flex-row">
                <FaHourglassHalf className="text-bb-accent" />
                <span>In Progress</span>
              </div>
            )}
        </span>
      </div>
    </div>
  );
}

export default function Quests() {
  return (
    <div className="flex flex-col mx-4 gap-4 text-xs">
      <div className="flex flex-row gap-2 items-center">
        <FaHatWizard className="text-bb-accent" />
        <h1 className="text-white font-bold text-sm">Quests</h1>
      </div>
      <div className="flex flex-col gap-4">
        {quests.map((quest, index) => (
          <Quest key={`quest-${index}`} {...quest} />
        ))}
      </div>
    </div>
  );
}
