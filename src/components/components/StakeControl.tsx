import { Range, getTrackBackground } from "react-range";
import { useState, useEffect } from "react";

interface StakeControlProps {
  onChange: (value: number) => void;
  defaultValue?: number;
}

export const StakeControl = ({
  onChange,
  defaultValue = 10,
}: StakeControlProps) => {
  const [amount, setAmount] = useState([defaultValue]);

  useEffect(() => {
    setAmount([defaultValue]);
  }, [defaultValue]);

  const handleAmountChange = (values: number[]) => {
    if (values[0] >= 0.2) {
      setAmount(values);
      onChange(values[0]);
    }
  };

  return (
    <div className="mt-4 text-gray-400">
      <div className="flex flex-1 flex-col gap-y-4">
        <div className="flex flex-1 flex-row items-center border border-gray-400 rounded-xl px-3 py-2 text-white ">
          <div className="flex flex-row items-center max-w-1/2 justify-start">
              <input
                type="number"
                value={amount[0].toFixed(1)}
                min="0.2"
                step="0.2"
                onChange={(e) => handleAmountChange([Number(e.target.value)])}
                className="bg-transparent text-center focus:outline-none w-auto"
                style={{ width: `${amount[0].toFixed(1).length}ch` }}
              />
            <span className="text-white"> $
            </span>
          </div>
          <div className="space-x-1 flex flex-1 flex-row min-w-1/2 justify-end">
            <button
              onClick={() => handleAmountChange([amount[0] * 1.25])}
              className="text-[8px] text-gray-400 border border-gray-400 rounded-md px-1 py-1"
            >
              25%
            </button>
            <button
              onClick={() => handleAmountChange([amount[0] * 1.5])}
              className="text-[8px] text-gray-400 border border-gray-400 rounded-md px-1 py-1"
            >
              50%
            </button>
            <button
              onClick={() => handleAmountChange([100])}
              className="text-[8px] text-gray-400 border border-gray-400 rounded-md px-1 py-1"
            >
              Max
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center">
          <Range
            values={amount}
            step={0.2}
            min={0.0}
            max={100}
            onChange={handleAmountChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "8px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  background: getTrackBackground({
                    values: amount,
                    colors: ["#ff5f1f", "transparent"],
                    min: 0.0,
                    max: 100,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "12px",
                  width: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
