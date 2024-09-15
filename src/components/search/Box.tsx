"use client";

import {
  FaBaseballBatBall,
  FaBasketball,
  FaFootball,
  FaFutbol,
  FaHockeyPuck,
  FaTrophy,
} from "react-icons/fa6";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/navigation";

export type Item = {
  id: number;
  name: string;
  kind:
    | "Baseball"
    | "Basketball"
    | "Football"
    | "Hockey"
    | "Soccer"
    | "Euro";
};

const kindToIcon: {
  [key in Item["kind"]]: JSX.Element;
} = {
  Baseball: <FaBaseballBatBall />,
  Basketball: <FaBasketball />,
  Football: <FaFootball />,
  Hockey: <FaHockeyPuck />,
  Soccer: <FaFutbol />,
  Euro: <FaTrophy />,
};

interface IBoxProps {
  items: Item[];
}

export default function Box({ items }: IBoxProps) {
  const router = useRouter();

  const handleOnSelect = (item: Item) => {
    router.push(`/event/${item.id}`);
  };

  const formatResult = (item: Item) => {
    return (
      <div className="flex items-center">
        <div className="mr-2">{kindToIcon[item.kind]}</div>
        <div>
          <p>{item.name}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-4 h-[200px] w-full my-4">
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        showIcon={false}
        placeholder="Search"
        showNoResults
        showNoResultsText="No results found"
        styling={{
          height: "34px",
          border: "1px solid #374151",
          borderRadius: "4px",
          backgroundColor: "#1f2937",
          boxShadow: "none",
          hoverBackgroundColor: "#1f2937",
          color: "#ffffff",
          fontSize: "18px",
          fontFamily: `system-ui`,
          iconColor: "#ffffff",
          lineColor: "#737373",
          placeholderColor: "#737373",
          clearIconMargin: "3px 8px 0 0",
          zIndex: 2,
        }}
      />
    </div>
  );
}
