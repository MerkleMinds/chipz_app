import SearchInterface, { type SearchItem } from "@/components/search/SearchInterface";
import searchData from "@/utils/data/searchData.json" with { type: "json" };

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center">
      <SearchInterface items={searchData as SearchItem[]} />
    </div>
  );
}
