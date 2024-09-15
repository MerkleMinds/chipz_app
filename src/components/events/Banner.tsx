import Image from "next/image";

interface IBannerProps {
  home: {
    name: string;
    url: string;
  };
  away: {
    name: string;
    url: string;
  };
  date: string;
  time: string;
}

export default function Banner(props: IBannerProps) {
  return (
    <div className="flex items-center justify-center h-[200px] mx-2 rounded-md bg-[url('/cover.jpeg')] bg-center">
      <div className="flex flex-row gap-10 justify-between w-full">
        <div className="flex flex-col gap-1 items-center justify-center w-full">
          <Image src={props.home.url} width={48} height={48} alt="Spain" />
          <p className="text-white font-bold whitespace-break-spaces">
            {props.home.name}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <p className="text-xs text-neutral-200">{props.date}</p>
          <p className="text-xs text-neutral-200">{props.time}</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center w-full">
          <Image src={props.away.url} width={48} height={48} alt="Italy" />
          <p className="text-white font-bold whitespace-break-spaces">
            {props.away.name}
          </p>
        </div>
      </div>
    </div>
  );
}
