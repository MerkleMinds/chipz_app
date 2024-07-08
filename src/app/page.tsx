import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import HeadToHead from "@/components/HeadToHead";
import League from "@/components/League";
import Live from "@/components/Live";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <main className="flex flex-col gap-5">
      <League />
      <Featured />
      <Live />
      <HeadToHead />
      <Partners />
      <Footer />
    </main>
  );
}
