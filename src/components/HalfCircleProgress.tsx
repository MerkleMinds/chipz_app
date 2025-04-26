export const HalfCircleProgress = ({ probability }: { probability: number }) => {
    const radius = 30;
    const circumference = Math.PI * radius;
    const progress = ((probability || 0) / 100) * circumference;
    const color = (probability || 0) > 45 ? "#23C45E" : "#FE4E4F";
  
    return (
      <div className="relative w-[64px] h-[48px]">
        <svg width="64" height="32" viewBox="0 0 64 32">
          <circle
            cx="32"
            cy="32"
            r={radius * 0.8}
            fill="none"
            stroke="#555"
            strokeWidth="5"
            strokeDasharray={circumference * 1.6}
            strokeDashoffset="0"
          />
          <circle
            cx="32"
            cy="32"
            r={radius * 0.8}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference * 0.8}
            strokeDashoffset={`${circumference - progress * 0.8}`}
            strokeLinecap="round"
            transform="rotate(180, 32, 32)"
          />
        </svg>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-[10px] font-bold">
          {probability || 0}%
        </div>
        <div className="absolute top-[65%] left-[50%] translate-x-[-50%] text-[8px] text-gray-300">
          chance
        </div>
      </div>
    );
  };