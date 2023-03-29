import React, { useEffect } from "react";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import md from "markdown-it";
import { ParsedUrlQuery } from "querystring";
import Layout from "@/components/layout/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";
import {
  doscFoldersNamesReader,
  doscFoldersReader,
} from "@/app/controllers/docs/docsFoldersReader";

export const getStaticPaths: GetStaticPaths = async () => {
  const files = doscFoldersNamesReader("docs");

  const paths = files.map((dir) => {
    const parsedDir = dir.replace("docs/", "").replace(".md", "").split("/");
    return {
      params: {
        slug: parsedDir,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const docsFoldersNames = doscFoldersReader("docs");

  const { slug } = context.params as IParams;
  const path = slug.join("/");
  const fileName = fs.readFileSync(`docs/${path}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      docsFoldersNames,
      frontmatter,
      content,
    },
  };
};

type TProps = {
  docsFoldersNames: { [key: string]: any }[];
  frontmatter: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    socialImage: string;
    date: string;
    tags: string[];
  };
  content: string;
};

const PostPage: React.FC<TProps> = ({
  frontmatter,
  content,
  docsFoldersNames,
}) => {
  const { user } = useUser();

  useEffect(() => {
    if (!user || !user.email_verified) {
      Router.push("/api/auth/login");
      return;
    }
  }, [user]);

  if (!user) return <></>;

  return (
    <Layout {...{ docsFoldersNames, user }}>
      <div className="prose">
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }}></div>
      </div>
    </Layout>
  );
};

export default PostPage;
