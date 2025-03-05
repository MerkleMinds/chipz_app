import Footer from "@/components/Footer";
import Partners from "@/components/Partners";

import { FaArrowDown } from "react-icons/fa";

import data from "@/utils/data/events.json" with { type: "json" };

interface OrderBook {
  id: number;
  title: string;
  probability: number;
}

interface Event {
  id: number;
  title: string;
  probability: number;
  totalVolume: string;
  imageUrl: string;
  orderBook: OrderBook[];
}

interface MainPageProps {
  data: Event;
}

const MainPage = ({ data }: MainPageProps) => {
  return (
    <div className="flex flex-col mx-3 mt-2 gap-3 text-xs text-white">
      <img
        src={data.imageUrl}
        alt="event-banner"
        className="w-[45px] h-[45px] object-cover"
      />
      <h2 className="text-white text-lg font-bold">{data.title}</h2>
	  <div className="flex flex-col">
		<div className="flex">
			<p>Yes</p> <p>No</p>
		</div>
		<h2 className="text-white text-lg font-bold">{data.probability}% chance</h2>
	  </div>
	  <div>
		Market Trend
	  </div>
	<div className="w-full border border-gray-700 rounded-lg p-2 flex flex-row justify-between">
		<h2 className="text-lg">Order Book</h2>
		<div>
			<FaArrowDown />           
		</div>
	</div>
    </div>
  );
};

interface PageProps {
  params: {
    id: string;
  }
}

export default function Page({ params }: PageProps) {
  const event = data.find(event => event.id.toString() === params.id);
  
  if (!event) return null;
  // TODO: return 404 if event is not found

  return (
    <main className="flex flex-col gap-5">
      <MainPage data={event} />
      <Partners />
      <Footer />
    </main>
  );
}
