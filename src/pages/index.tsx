import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-5xl font-bold">Simple Docs</h1>
      <div className="mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vero
        nostrum magni consequatur accusantium alias numquam temporibus deserunt
        mollitia odit sunt, exercitationem quaerat delectus ut. Perspiciatis
        alias vitae accusantium perferendis.
      </div>
      <Link
        href={"/posts/introduction"}
        className="bg-cyan-800 rounded-md text-white px-4 py-2 mt-5 inline-block"
      >
        go to docs
      </Link>
    </div>
  );
};

export default Home;
