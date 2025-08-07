import InfoCard from "@/components/InfoCard";
import ProjectCard from "@/components/ProjectCard";
import TechnologyStack from "@/components/TechnologyStack";
import { Typewriter } from "@/components/Typewriter";
import GitHubCalendar from "react-github-calendar";
export default function Home() {
  return (
    <div className="mt-8 max-w-3xl px-3 pb-10 mx-auto xl:max-w-5xl xl:px-0">
      <div id="about" className="w-full flex  gap-5 justify-between ">
        <div className="flex flex-col md:w-3/5 w-full">
          <Typewriter
            text={["Hello, Welcome to my space!"]}
            speed={0.05}
            className="text-2xl font-bold md:text-4xl bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent dark:from-lime-300 dark:to-lime-500"
          />
          <span className="text-xl font-bold">My name is ChenJianYan</span>
          <p>
            我是一名拥有三年扎实经验的前端工程师，专注于构建高性能、可访问性强且视觉精美的
            Web
            应用。我对前端技术的热情驱使我不断深入核心原理，并积极拥抱现代生态。
          </p>

          <p>
            <strong>我的核心专长在于：</strong>
          </p>
          <ul>
            <li>
              <strong>基础坚实：</strong> 精通 HTML5、CSS3（包括现代布局如
              Flexbox/Grid、预处理器）和原生 JavaScript
              (ES6+)，深刻理解浏览器原理与 Web 标准。
            </li>
            <li>
              <strong>强类型与框架专家：</strong> 深度运用{" "}
              <strong>TypeScript</strong> 提升代码健壮性和开发体验，是{" "}
              <strong>Vue.js</strong> 框架的熟练实践者，精通其核心概念、状态管理
              (Vuex/Pinia) 和生态系统工具。
            </li>
            <li>
              <strong>全栈视角与现代化开发：</strong> 深入理解{" "}
              <strong>Next.js</strong> 框架，能够构建服务端渲染
              (SSR)、静态站点生成 (SSG) 同时熟悉 <strong>NestJS</strong>
              ，具备后端思维，能更有效地进行前后端协作。
            </li>
            <li>
              <strong>交互与可视化：</strong> 对 <strong>Three.js</strong>{" "}
              和原生 <strong>Canvas</strong> API 有实践经验，有能力开发 2D/3D
              数据可视化、创意交互动画，为产品增添独特价值。
            </li>
            <li>
              <strong>工程化实践：</strong> 熟悉现代前端工具链 (如 Vite,
              Webpack, npm/yarn/pnpm)、版本控制 (Git)
              及协作流程，致力于编写可维护、可测试的代码。
            </li>
          </ul>

          <p>
            <strong>超越技术本身，我关注：</strong>
          </p>
          <ul>
            <li>
              <strong>问题解决者：</strong>{" "}
              善于分析需求、拆解复杂问题并寻找创新且务实的解决方案。
            </li>
            <li>
              <strong>持续学习者：</strong>{" "}
              前端领域日新月异，我保持旺盛的好奇心和学习动力，积极跟进新技术和最佳实践。
            </li>
          </ul>

          <p>
            我期待利用我的技能和经验，参与构建有影响力、技术驱动的 Web
            产品。欢迎浏览我的{" "}
            <em>
              <a className="font-bold" href="#projects">
                项目作品集
              </a>{" "}
            </em>
            以了解更多我的实践成果。
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
        公司项目
      </span>
      <div
        id="projects"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
      >
        <ProjectCard
          name="QuickMind AI"
          coverImg="/quickmind.png"
          description="QuickMind AI是一个专门为工业设计领域打造的设计平台，它提供了灵感库、设计台、智能助手等模块，帮助用户快速实现符合需求的设计图或设计方案。"
          isOpen={true}
          isLink={false}
          link="https://www.baidu.com"
        />
        <ProjectCard
          name="紫阳邻里 110"
          coverImg="/zy.png"
          description="依托“邻里值班室”的成功经验，创新打造紫阳邻里110社会治理与服务平台，通过整合政府部门和社会组织、单位资源，及时回应和解决居民群众急难求助，主动将“矛盾化在邻里、服务送到邻里。”"
          isOpen={false}
          isLink={true}
          link="https://test.shwread.cn:8088/10000355/"
        />

        <ProjectCard
          name="博喻云管控家长端（微信小程序）"
          coverImg="/boyu.png"
          description="博喻云管控家长端是一个基于微信小程序的平板管控平台，家长可以通过小程序给平板设置策略来管理平板的使用，帮助家长及时掌握孩子使用平板的情况。"
          isOpen={false}
          isLink={true}
          link="https://test.shwread.cn:8088/10000355/"
        />
      </div>
    </div>
  );
}
