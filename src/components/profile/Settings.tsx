import { SiGoogle, SiMeta, SiTwitch } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";

import Image from "next/image";

export default function Settings() {
  return (
    <>
    <div className="grid grid-cols gap-y-4">
      <div>
        <h3 className="text-lg mb-2">Change Email</h3>
        <div className="flex flex-col space-y-2">
          <button className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <div className="flex items-center gap-2">
              <Image 
                src="/change-email-arrows.svg" 
                alt="Promo icon" 
                width={15} 
                height={15} 
                className="text-bb-accent"
              />
              <span className="p-0 text-neutral-400">current.email@example.com</span>
            </div>
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg mb-2">Link account</h3>
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
      <div>
        <div className="flex items-center gap-x-2">
          <h3>Contact</h3>
          <MdOutlineEmail size={17} />
        </div>
      </div>
    </div>

    </>
  );
}
