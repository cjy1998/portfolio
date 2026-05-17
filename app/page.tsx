import InfoCard from "@/components/InfoCard";
import ProjectCard from "@/components/ProjectCard";
import TechnologyStack from "@/components/TechnologyStack";
import { Typewriter } from "@/components/Typewriter";
import { COMPANY_PROJECTS } from "@/lib/projects";
import { useTranslations } from "next-intl";
import GitHubCalendar from "react-github-calendar";
const COMPETENCIES = ["ai", "fullstack", "graphics", "engineering"] as const;
const SELF_DRIVEN = ["explorer", "pragmatic"] as const;

export default function Home() {
  const $t = useTranslations("CompanyProject");
  const $a = useTranslations("About");

  return (
    <div className="mt-8 max-w-3xl px-3 pb-10 mx-auto xl:max-w-5xl xl:px-0">
      <div id="about" className="w-full flex  gap-5 justify-between ">
        <div className="flex flex-col md:w-3/5 w-full">
          <Typewriter
            text={["Hello, Welcome to my space!"]}
            speed={0.05}
            className="text-2xl font-bold md:text-4xl bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent dark:from-lime-300 dark:to-lime-500"
          />
          <p className="font-bold leading-8">{$a("headline")}</p>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-[14px] mb-2">
            {$a("intro")}
          </p>

          <p className="font-bold leading-relaxed text-[14px]">
            {$a("competenciesTitle")}
          </p>
          <ul>
            {COMPETENCIES.map((id) => (
              <li
                key={id}
                className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed mb-2"
              >
                <span className="font-bold">
                  {$a(`competencies.${id}.label`)}
                </span>{" "}
                {$a(`competencies.${id}.text`)}
              </li>
            ))}
          </ul>

          <p className="font-bold leading-relaxed text-[14px]">
            {$a("selfDrivenTitle")}
          </p>
          <ul>
            {SELF_DRIVEN.map((id) => (
              <li
                key={id}
                className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed mb-2"
              >
                <span className="font-bold">
                  {$a(`selfDriven.${id}.label`)}
                </span>{" "}
                {$a(`selfDriven.${id}.text`)}
              </li>
            ))}
          </ul>

          <p className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed mb-2">
            {$a.rich("outro", {
              link: (chunks) => (
                <em>
                  <a className="font-bold" href="#projects">
                    {chunks}
                  </a>
                </em>
              ),
            })}
          </p>
        </div>
        <div className="hidden md:flex w-2/5 h-full">
          <InfoCard />
        </div>
        {/* <span className="flex gap-1">
          <MapPinCheckInside />
          杭州
        </span> */}
      </div>
      <div className="w-full flex flex-wrap md:justify-center justify-between  my-5">
        <div className="w-full md:w-1/4 md:px-2 py-2 ">
          <TechnologyStack />
        </div>
        <div className="w-full md:w-3/4 md:px-2 py-2">
          <GitHubCalendar username="cjy1998" />
        </div>
      </div>

      <div className="w-full h-0.5 bg-gray-300 my-5 dark:bg-gray-700"></div>
      <span className="text-xl font-bold text-gray-600 dark:text-gray-200">
        {$t("title")}
      </span>
      <div
        id="projects"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
      >
        {COMPANY_PROJECTS.map((p) => (
          <ProjectCard
            key={p.id}
            name={$t(`projects.${p.id}.name`)}
            description={$t(`projects.${p.id}.description`)}
            coverImg={p.coverImg}
            isOpen={p.isOpen}
            isLink={p.isLink}
            link={p.link}
          />
        ))}
      </div>
    </div>
  );
}
