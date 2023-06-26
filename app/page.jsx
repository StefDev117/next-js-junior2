"use client";

import Feed from "@components/Feed";
// import { MyContext } from "components/Context/mycontext";
import MyContextProvider from "@components/Context/MyContextProvider";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Home = () => {
  const [dataProvider, setDataProvider] = useState("zertui");
  const modifyProvider = () => {
    setDataProvider("setdata");
  };
  const pathName = usePathname();
  // const router = useRouter();
  // console.log(router);
  console.log(pathName);


  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
        consequatur dolorem obcaecati eum repellendus nemo illum, ipsum ipsa
        sed, autem dolore placeat repudiandae corporis architecto. Molestias
        dolor voluptatum libero
      </p>
      <MyContextProvider>
        <Feed />
      </MyContextProvider>
    </section>
  );
};

export default Home;
