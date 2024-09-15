import Box, { type Item } from "@/components/search/Box";
import available from "@/utils/data/available.json" with { type: "json" };

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center">
      <Box items={available as Item[]} />
    </div>
  );
}
