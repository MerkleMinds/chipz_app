import Box, { type SearchItem } from "@/components/search/Box";
import searchData from "@/utils/data/searchData.json" with { type: "json" };

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center">
      <Box items={searchData as SearchItem[]} />
    </div>
  );
}
