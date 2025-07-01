// Original implementation commented out for future reference
// import Points from "@/components/promo/Points";
// import Quests from "@/components/promo/Quests";
// import Shop from "@/components/promo/Shop";

import ComingSoon from "@/components/ComingSoon";

export default function PromoPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <ComingSoon 
        title="Promotions Coming Soon"
        message="Our rewards and promotions system is currently under development. Check back soon for exciting offers!"
        className="max-w-md w-full my-8"
      />

      {/* <Points />
      <Quests />
      <Shop /> */}

    </main>
  );
}
