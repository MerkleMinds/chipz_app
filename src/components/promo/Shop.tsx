import { FaShoppingBasket } from "react-icons/fa";

interface IShopItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

const shopItems: IShopItem[] = [
  {
    name: "Free bet",
    description: "Value of 10 cUSD",
    price: 250,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Free bet",
    description: "Value of 50 cUSD",
    price: 2000,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Odds boost",
    description: "Boosts your odds by 1.5x",
    price: 500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Odds boost",
    description: "Boosts your odds by 2.5x",
    price: 1250,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Instant cashout",
    description: "Cash out 10 cUSD instantly",
    price: 2500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Instant cashout",
    description: "Cash out 50 cUSD instantly",
    price: 22500,
    image: "https://via.placeholder.com/150",
  },
];

const ShopItem: React.FC<IShopItem> = ({ image, name, description, price }) => {
  return (
    <div className="flex flex-col bg-gray-800 p-2 rounded-lg shadow-md">
      <img
        className="w-full h-36 object-cover rounded-lg mb-2"
        src={image}
        alt={name}
      />
      <div className="flex flex-col justify-between h-full gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-bold text-sm">{name}</h1>
          <p className="text-gray-300">{description}</p>
          <p className="text-gray-400">{price} pts.</p>
        </div>
        <div className="flex justify-end mt-auto">
          <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Shop() {
  return (
    <div className="flex flex-col mx-4 gap-4 text-xs">
      <div className="flex flex-row gap-2 items-center">
        <FaShoppingBasket className="text-bb-accent" />
        <h1 className="text-white font-bold text-sm">Shop</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {shopItems.map((item, index) => <ShopItem key={index} {...item} />)}
      </div>
    </div>
  );
}
