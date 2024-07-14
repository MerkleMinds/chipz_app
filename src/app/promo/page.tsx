import Points from "@/components/promo/Points";
import Quests from "@/components/promo/Quests";
import Shop from "@/components/promo/Shop";

export default function Hello() {
  return (
    <main className="flex flex-col gap-5 mb-16">
      <Points />
      <Quests />
      <Shop />
    </main>
  );
}
