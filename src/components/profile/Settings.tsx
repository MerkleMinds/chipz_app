import { FaCheck, FaCreditCard, FaEnvelope, FaFutbol } from "react-icons/fa6";
import { SiGoogle, SiMeta, SiTwitch } from "react-icons/si";

import { TbPlugConnected } from "react-icons/tb";

export default function Settings() {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg mb-4">Get started</h3>
        <ul>
          <li className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>Connect Opera MiniPay</span>
            </div>
            <FaCheck className="text-green-500" />
          </li>
          <li className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FaCreditCard className="mr-2" />
              <span>Deposit</span>
            </div>
            <FaCheck className="text-green-500" />
          </li>
          <li className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FaFutbol className="mr-2" />
              <span>Place a bet</span>
            </div>
            <FaCheck className="text-green-500" />
          </li>
        </ul>
      </div>
      <div className="mb-[4.5rem]">
        <h3 className="text-lg mb-4">Link account</h3>
        <div className="flex flex-col space-y-2">
          <button className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <div className="flex items-center">
              <SiGoogle className="mr-2" />
              <span>Google</span>
            </div>
            <TbPlugConnected className="text-neutral-400" />
          </button>
          <button className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <div className="flex items-center">
              <SiMeta className="mr-2" />
              <span>Meta</span>
            </div>
            <TbPlugConnected className="text-neutral-400" />
          </button>
          <button className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <div className="flex items-center">
              <SiTwitch className="mr-2" />
              <span>Twitch</span>
            </div>
            <TbPlugConnected className="text-neutral-400" />
          </button>
        </div>
      </div>
    </>
  );
}
