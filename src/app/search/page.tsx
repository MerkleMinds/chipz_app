import SearchPanel, { type SearchItem } from "@/components/search/SearchPanel";
import searchData from "@/utils/data/searchData.json" with { type: "json" };

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center">
      <SearchPanel items={searchData as SearchItem[]} />
    </div>
  );
}
