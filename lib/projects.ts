export type CompanyProject = {
  id: string;
  coverImg: string;
  isOpen: boolean;
  isLink: boolean;
  link: string;
};

export const COMPANY_PROJECTS: CompanyProject[] = [
  {
    id: "quickmind",
    coverImg: "/quickmind.png",
    isOpen: false,
    isLink: true,
    link: "https://quickmindesign.com",
  },
  {
    id: "zhiyang110",
    coverImg: "/zy.png",
    isOpen: false,
    isLink: true,
    link: "https://test.shwread.cn:8088/10000355/",
  },
  {
    id: "boyu",
    coverImg: "/boyu.png",
    isOpen: false,
    isLink: true,
    link: "https://test.shwread.cn:8088/10000355/",
  },
];
