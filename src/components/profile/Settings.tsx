import {
  FaCheck,
  FaCreditCard,
  FaEnvelope,
  FaFutbol,
  FaKey,
  FaLock,
} from "react-icons/fa6";
import { SiGoogle, SiMeta, SiTwitch } from "react-icons/si";

import { TbPlugConnected } from "react-icons/tb";

export default function Settings() {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg mb-4">Credentials</h3>
        <div className="flex flex-col gap-1 items-center mb-2">
          <div className="flex items-center w-full">
            <FaEnvelope className="mr-2" />
            <span>Email</span>
          </div>
          <div className="flex items-center w-full">
            <input
              type="email"
              className="bg-gray-800 rounded px-3 py-2 text-neutral-400 w-full"
              placeholder="Current email"
              disabled
            />
            <FaLock className="ml-2" />
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center mb-2">
          <div className="flex items-center w-full">
            <FaKey className="mr-2" />
            <span>Password</span>
          </div>
          <div className="flex items-center w-full">
            <input
              type="password"
              className="bg-gray-800 rounded px-3 py-2 text-neutral-400 w-full"
              placeholder="Current password"
              disabled
            />
            <FaLock className="ml-2" />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg mb-4">Get started</h3>
        <ul>
          <li className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>Verify your email</span>
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
      <div>
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
