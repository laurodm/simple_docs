import React, { useEffect } from "react";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import md from "markdown-it";
import { ParsedUrlQuery } from "querystring";
import { docsReader } from "@/app";
import { TDoc } from "@/types";
import Layout from "@/components/layout/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("docs");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const layoutDocs = docsReader();

  const { slug } = context.params as IParams;
  const fileName = fs.readFileSync(`docs/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      layoutDocs,
      frontmatter,
      content,
    },
  };
};

type TProps = {
  layoutDocs: TDoc[];
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

const PostPage: React.FC<TProps> = ({ frontmatter, content, layoutDocs }) => {
  const { user } = useUser();

  useEffect(() => {
    if (!user || !user.email_verified) {
      Router.push("/api/auth/login");
      return;
    }
  }, [user]);

  if (!user) return <></>;

  return (
    <Layout docs={layoutDocs} user={user}>
      <div className="prose">
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }}></div>
      </div>
    </Layout>
  );
};

export default PostPage;
