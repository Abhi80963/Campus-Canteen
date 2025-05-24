import HeroSection from "@/components/hsection/hero";
import ChooseUsSection from "@/components/hsection/choose";
import TodayMealSection from "@/components/hsection/meal";
import WaveDivider from "@/components/hsection/wave";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <WaveDivider/>
      <ChooseUsSection />
      <TodayMealSection />
    </div>
  );
}
