import Hot from "@/components/Hot";
import Trending from "@/components/Trending";
import HeadToHead from "@/components/HeadToHead";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <main className="flex flex-col gap-5">
      <Hot />
      <Trending />
      <HeadToHead />
      <Partners />
      <Footer />
    </main>
  );
}
