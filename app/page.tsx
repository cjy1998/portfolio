import InfoCard from "@/components/InfoCard";
import ProjectCard from "@/components/ProjectCard";
import TechnologyStack from "@/components/TechnologyStack";
import { Typewriter } from "@/components/Typewriter";

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
          <div className="w-full md:w-1/2 p-5">
            <TechnologyStack />
          </div>
        </div>
        <div className="hidden md:flex">
          <InfoCard />
        </div>
        {/* <span className="flex gap-1">
          <MapPinCheckInside />
          杭州
        </span> */}
      </div>
      <div className="w-full h-0.5 bg-gray-300 my-10"></div>
      <div className="w-full grid grid-cols-2 gap-5">
        <ProjectCard
          name="QuickMind AI"
          coverImg="/quickmind.png"
          description="QuickMind AI是一个专门为工业设计领域打造的设计平台，它提供了灵感库、设计台、智能助手等模块，帮助用户快速实现符合需求的设计图或设计方案。"
          isOpen={true}
          isLink={false}
          link="https://www.baidu.com"
        />
      </div>
    </div>
  );
}
