import React from "react";
import Link from "next/link";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type TProps = {
  docsFoldersNames: any[];
  children: React.ReactNode;
  user?: UserProfile;
};

const Layout: React.FC<TProps> = ({ children, user, docsFoldersNames }) => {
  function renderMenu(docItens: { [key: string]: any }[], dir?: string) {
    return (
      <ul className="even:pl-3">
        {docItens.map((doc, index): any => {
          if (doc.dir) {
            return (
              <li key={index}>
                <Link
                  href={`/posts/${dir ? dir + "/" : ""}${doc.slug}`}
                  className="border-b-2 border-b-gray-100 border-solid block py-2"
                >
                  {doc.frontmatter.title}
                </Link>
                {renderMenu(doc.files, `${dir ? dir + "/" : ""}${doc.dir}`)}
              </li>
            );
          }
          return (
            <li key={index}>
              <Link
                href={`/posts/${dir ? dir + "/" : ""}${doc.slug}`}
                className="border-b-2 border-b-gray-100 border-solid block py-2"
              >
                {doc.frontmatter.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <div className="bg-black py-5 px-10 text-white flex justify-between">
        <span className="inline-block font-bold uppercase">SimpleDoc</span>
        <span className="inline-block">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>{user?.nickname}</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="block bg-white px-5 py-3 m-3 w-60 drop-shadow-md border-solid border-1 border-gray-200 rounded-sm">
                <DropdownMenu.Item>
                  <Link href={"/api/auth/logout"}>Logout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </span>
      </div>
      <div className="flex flex-row h-screen">
        <aside className="basis-2/12 h-full border-r-2 border-neutral-200 pt-10 px-10">
          {renderMenu(docsFoldersNames)}
        </aside>
        <div className="basis-10/12 bg-white h-full pt-10">
          <div className="container mx-auto px-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
