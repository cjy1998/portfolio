import InfoCard from "@/components/InfoCard";
import { Typewriter } from "@/components/Typewriter";
import { MapPinCheckInside } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-8 max-w-3xl px-3 mx-auto xl:max-w-5xl xl:px-0">
      <div className="w-full flex  gap-5 justify-between ">
        <div className="flex flex-col">
          <Typewriter
            text={["Hello, Welcome to my space!"]}
            speed={0.05}
            className="text-2xl font-bold md:text-4xl bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent dark:from-lime-300 dark:to-lime-500"
          />
          <span>My name is ChenJianYan</span>
        </div>
        <div className="hidden md:flex">
          <InfoCard />
        </div>
        {/* <span className="flex gap-1">
          <MapPinCheckInside />
          杭州
        </span> */}
      </div>
    </div>
  );
}
