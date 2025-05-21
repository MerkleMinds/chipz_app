import SearchInterface from "@/components/search/SearchInterface";

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <SearchInterface />
      </div>
    </div>
  );
}
