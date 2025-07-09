import { Range, getTrackBackground } from "react-range";
import { useState, useEffect } from "react";
import { useAppContext } from "@/components/Context";

interface StakeControlProps {
  onChange: (value: number) => void;
  defaultValue?: number;
}

export const StakeControl = ({
  onChange,
  defaultValue = 10,
}: StakeControlProps) => {
  const MAX_ACCOUNT_AMOUNT = 200;
  const { amount: [walletBalance] } = useAppContext();
  const maxAmount = walletBalance > 0 ? walletBalance : MAX_ACCOUNT_AMOUNT;
  
  const [amount, setAmount] = useState([defaultValue]);
  const [inputValue, setInputValue] = useState(defaultValue.toString());
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAmount([defaultValue]);
    setInputValue(defaultValue.toString());
  }, [defaultValue]);

  const handleAmountChange = (values: number[]) => {
    if (values[0] >= 0.2) {
      if (values[0] > maxAmount) {
        setError(`Your account max is ${maxAmount}`);
        setAmount([maxAmount]);
        setInputValue(maxAmount.toString());
        onChange(maxAmount);
      } else {
        setError(null);
        setAmount(values);
        setInputValue(values[0].toString());
        onChange(values[0]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      if (numValue > maxAmount) {
        setError(`Your account max is ${maxAmount}`);
      } else if (numValue < 0.2) {
        setError("Minimum amount is 0.2$");
      } else {
        setError(null);
        setAmount([numValue]);
        onChange(numValue);
      }
    }
  };

  return (
    <div className="mt-4 text-gray-400">
      <div className="flex flex-1 flex-col gap-y-4">
        <div className="flex flex-1 flex-row items-center border-chipz-custom rounded-xl px-3 py-1 text-white ">
          <div className="flex flex-row items-center max-w-1/2 justify-start">
              <input
                type="number"
                value={inputValue}
                min="0.2"
                step="0.2"
                onChange={(e) => handleInputChange(e)}
                className="bg-transparent text-center focus:outline-none w-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[15px]"
                style={{ width: `${inputValue.length + 1}ch` }}
              />
            <span className="text-white p-0 m-0"> $
            </span>
          </div>
          <div className="space-x-1 flex flex-1 flex-row min-w-1/2 justify-end">
            <button
              onClick={() => handleAmountChange([MAX_ACCOUNT_AMOUNT * 0.25])}
              className="text-[12px] text-gray-400 border-chipz-custom rounded-sm px-[5px] py-[5px]"
            >
              25%
            </button>
            <button
              onClick={() => handleAmountChange([MAX_ACCOUNT_AMOUNT * 0.5])}
              className="text-[12px] text-gray-400 border-chipz-custom rounded-sm px-[5px] py-[5px]"
            >
              50%
            </button>
            <button
              onClick={() => handleAmountChange([MAX_ACCOUNT_AMOUNT])}
              className="text-[12px] text-gray-400 border-chipz-custom rounded-sm px-[5px] py-[5px]"
            >
              Max
            </button>
          </div>
        </div>
        {_error && (
          <div className="text-red-500 text-xs mt-1">
            {_error}
          </div>
        )}
        <div className="flex flex-1 items-center">
          <Range
            values={amount}
            step={0.2}
            min={0.0}
            max={maxAmount}
            onChange={handleAmountChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "8px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid border-chipz-custom",
                  background: getTrackBackground({
                    values: amount,
                    colors: ["#ff5f1f", "transparent"],
                    min: 0.0,
                    max: maxAmount,
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
