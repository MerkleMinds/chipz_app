import SearchInterface from "@/components/search/SearchInterface";
import { getAllSearchItems } from "@/utils/data/dataService";

export default function Page() {
  // Get search items from the data service
  const searchItems = getAllSearchItems();
  
  return (
    <div className="w-full flex items-center justify-center">
      <SearchInterface items={searchItems} />
    </div>
  );
}
