import Points from "@/components/promo/Points";
import Quests from "@/components/promo/Quests";

export default function Hello() {
  return (
    <main className="flex flex-col gap-5">
      <Points />
      <Quests />
    </main>
  );
}
