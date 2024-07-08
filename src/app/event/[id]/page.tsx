import Banner from "@/components/events/Banner";
import Footer from "@/components/Footer";
import Mainv2 from "@/components/events/Mainv2";
import Menu from "@/components/events/Menu";

export default function Page(_params: { params: { id: string } }) {
  return (
    <main className="flex flex-col gap-2 text-xs">
      <Banner
        home={{ name: "Spain", url: "/spain.png" }}
        away={{ name: "Italy", url: "/italy.png" }}
        date="20/06/2024"
        time="21:00"
      />
      <Menu />
      <Mainv2 />
      <Footer />
    </main>
  );
}
