import { TDoc } from "@/types";
import fs from "fs";
import matter from "gray-matter";

export function docsReader(): TDoc[] {
  const files = fs.readdirSync("docs");

  const onlyFiles = files.filter((fileName) => fileName.includes(".md"));

  return onlyFiles.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`docs/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return { slug, frontmatter } as TDoc;
  });
}
