"use client";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import MarketTrendEventPage from "@/components/components/MarketTrendEventPage";
import OrderBookPart from "@/components/components/OrderBook";
import data from "@/utils/data/events.json" with { type: "json" };

interface PageProps {
  params: {
    id: string;
  }
}

interface Event {
  id: string;
  title: string;
  conditional: string;
  probability: number;
  totalVolume: string;
  imageUrl: string;
}

interface MainPageProps {
  data: Event;
}

interface BuyButtonsProps {
  yesPrice: number;
  noPrice: number;
}

const BuyButtons = ({ yesPrice, noPrice }: BuyButtonsProps) => {
  return (
    <div className="fixed bottom-[64px] left-0 right-0 p-4 bg-gray-900 border border-[#A3A3A3] z-10">
      <div className="flex gap-4 max-w-lg mx-auto">
        <button className="flex-1 py-3 px-4 rounded-lg border border-green-500 text-green-500 hover:bg-green-500/10">
          Buy Yes {yesPrice}$
        </button>
        <button className="flex-1 py-3 px-4 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10">
          Buy No {noPrice}$
        </button>
      </div>
    </div>
  );
};

const MarketTrendPart = () => {
  return (
    <div className="w-full border border-[#A3A3A3] rounded-lg min-h-[250px]">
      <MarketTrendEventPage 
        market={{
          id: "1",
          probabilityChange: "+5.2",
          history: [
            { date: "2024-01-01", probability: 45 },
            { date: "2024-01-02", probability: 50 },
            { date: "2024-01-03", probability: 55 },
            { date: "2024-01-04", probability: 60 },
            { date: "2024-01-05", probability: 65 },
            { date: "2024-01-06", probability: 70 },
            { date: "2024-01-07", probability: 75 },
            { date: "2024-01-08", probability: 80 },
          ]
        }} 
      />
    </div>
  );
};

const MainPage = ({ data }: MainPageProps) => {
  return (
    <div className="flex flex-col mx-3 mt-2 gap-3 text-white">
      <div className="flex flex-row justify-between">
      <img
        src={data.imageUrl}
        alt="event-banner"
        className="w-[45px] h-[45px] object-cover"
        />
        </div>
      <h2 className="text-white text-lg font-bold">{data.title}</h2>
	  <div className="flex flex-col">
		<div className="flex text-xs">
      {data.conditional === "yes" ? <p>Yes</p> : <p>No</p>}
		</div>
		<h2 className="text-white text-lg font-bold">{data.probability}% chance</h2>
	  </div>
	  <MarketTrendPart />
	  <OrderBookPart />
    </div>
  );
};

export default function Page({ params }: PageProps) {
  const event = data.find(event => event.id.toString() === params.id);
  
  if (!event) return null;
  // TODO: return 404 if event is not found

  return (
    <main className="flex flex-col gap-5 pb-20">
      <MainPage data={event} />
      <Partners />

      <Footer />
      <BuyButtons yesPrice={50} noPrice={53} />
    </main>
  );
}
