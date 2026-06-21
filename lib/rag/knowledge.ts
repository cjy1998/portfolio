import fs from "node:fs";
import path from "node:path";
import cnMessages from "@/messages/cn.json";
import enMessages from "@/messages/en.json";
import { COMPANY_PROJECTS } from "@/lib/projects";

export interface KnowledgeDocument {
  id: string;
  text: string;
  source: string;
  lang: "cn" | "en";
}

type Messages = typeof cnMessages;

/**
 * 将结构化 messages JSON 扁平化为文本段落，每段为一个逻辑知识单元
 */
function flattenMessages(
  messages: Messages,
  lang: "cn" | "en"
): KnowledgeDocument[] {
  const docs: KnowledgeDocument[] = [];
  const source = `messages/${lang}.json`;
  const isCn = lang === "cn";

  // 个人基本信息
  const info = messages.InfoCard;
  docs.push({
    id: `${lang}-info`,
    text: `${isCn ? "个人信息" : "Personal Info"}: ${isCn ? "姓名" : "Name"}=${info.name}, ${isCn ? "座右铭" : "Motto"}=${info.motto}, ${isCn ? "地址" : "Address"}=${info.address}`,
    source,
    lang,
  });

  // 职位简介与自我介绍
  const about = messages.About;
  docs.push({
    id: `${lang}-headline`,
    text: `${isCn ? "职位简介" : "Headline"}: ${about.headline}`,
    source,
    lang,
  });
  docs.push({
    id: `${lang}-intro`,
    text: `${isCn ? "个人介绍" : "Introduction"}: ${about.intro}`,
    source,
    lang,
  });

  // 核心竞争力
  const comp = about.competencies;
  for (const key of Object.keys(comp) as Array<keyof typeof comp>) {
    docs.push({
      id: `${lang}-comp-${key}`,
      text: `${about.competenciesTitle} - ${comp[key].label} ${comp[key].text}`,
      source,
      lang,
    });
  }

  // 自我驱动
  const sd = about.selfDriven;
  for (const key of Object.keys(sd) as Array<keyof typeof sd>) {
    docs.push({
      id: `${lang}-sd-${key}`,
      text: `${about.selfDrivenTitle} - ${sd[key].label} ${sd[key].text}`,
      source,
      lang,
    });
  }

  // 项目介绍（结合 messages 文案与 projects.ts 中的链接元数据）
  const cp = messages.CompanyProject;
  for (const p of COMPANY_PROJECTS) {
    const proj = cp.projects[p.id as keyof typeof cp.projects];
    if (proj) {
      docs.push({
        id: `${lang}-proj-${p.id}`,
        text: `${cp.title} - ${proj.name}: ${proj.description}${p.isLink ? ` (${p.link})` : ""}`,
        source,
        lang,
      });
    }
  }

  return docs;
}

/**
 * 读取 data/docs/ 目录下的所有 Markdown 文件作为可扩展知识源
 */
function readDocs(): KnowledgeDocument[] {
  const docsDir = path.join(process.cwd(), "data", "docs");
  const docs: KnowledgeDocument[] = [];

  if (!fs.existsSync(docsDir)) return docs;

  const files = fs
    .readdirSync(docsDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  for (const file of files) {
    const content = fs.readFileSync(path.join(docsDir, file), "utf-8");
    docs.push({
      id: `doc-${file}`,
      text: content,
      source: `data/docs/${file}`,
      lang: "cn",
    });
  }

  return docs;
}

/**
 * 聚合全部知识文档：中英文作品集内容 + data/docs 自定义文档
 */
export function getKnowledgeDocuments(): KnowledgeDocument[] {
  return [
    ...flattenMessages(cnMessages, "cn"),
    ...flattenMessages(enMessages, "en"),
    ...readDocs(),
  ];
}
