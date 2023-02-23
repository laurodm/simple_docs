export type TDoc = {
  slug: string;
  frontmatter: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    socialImage: string;
    date: string;
    tags: string[];
  };
};
