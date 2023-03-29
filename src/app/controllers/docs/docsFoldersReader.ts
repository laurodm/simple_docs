import fs from "fs";
import { TDoc } from "@/types";
import matter from "gray-matter";

export function doscFoldersNamesReader(dirname: string): string[] {
  const docs = fs.readdirSync(dirname);
  return docs
    .map((name): any => {
      if (!name.includes(".md")) {
        return doscFoldersNamesReader(`${dirname}/${name}`);
      }
      return `${dirname || ""}/${name}`;
    })
    .join()
    .split(",");
}

export function doscFoldersReader(dirname: string): { [key: string]: any }[] {
  const docs = fs
    .readdirSync(dirname)
    .filter((fileName) => fileName !== "index.md");
  return docs.map((name): any => {
    const slug = name.replace(".md", "");
    if (!name.includes(".md")) {
      const readFile = fs.readFileSync(`${dirname}/${name}/index.md`, "utf-8");
      const { data: frontmatter } = matter(readFile);
      return {
        dir: name,
        files: doscFoldersReader(`${dirname}/${name}`),
        slug,
        frontmatter,
      };
    }
    const readFile = fs.readFileSync(`${dirname}/${name}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return { slug, frontmatter } as TDoc;
  });
}
