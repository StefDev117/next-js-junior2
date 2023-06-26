"use client";

import { useEffect, useState, useContext, useRef } from "react";
import PromptCard from "./PromptCard";
import TestJsxContext from "./TestJsxContext";
import MyContext from "./Context/MyContext";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const { data, updateData } = useContext(MyContext);

  const previousDataRefData = useRef(data);
  const previousDataRefTxt = useRef(searchText);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const dataRes = await response.json();

      setPosts(dataRes);
      setDataFiltered(dataRes);
    };
    fetchPosts();
  }, []);

  // const previousDataRef = useRef(data);

  useEffect(() => {
    console.log(previousDataRefData.current);
    console.log(previousDataRefTxt.current);

    if (previousDataRefTxt.current != searchText) {
      const filteredPromptsTxt = posts.filter(
        (el) =>
          el.prompt.includes(searchText) ||
          el.tag.includes(searchText) ||
          el.creator.username.includes(searchText)
      );
      setDataFiltered(filteredPromptsTxt);
    } else {
      const filteredPrompsTag = posts.filter((el) => el.tag === data);

      setDataFiltered(filteredPrompsTag);
      console.log("change from tag");
    }

    previousDataRefData.current = data;
    previousDataRefTxt.current = searchText;
    console.log(searchText);
  }, [searchText, data]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search_input peer"
        />
      </form>
      {/* <PromptCard */}
      <PromptCardList data={dataFiltered} handleTagClick={() => {}} />
      {/* <TestJsxContext /> */}
      <h1>{data}</h1>
    </section>
  );
};

export default Feed;
