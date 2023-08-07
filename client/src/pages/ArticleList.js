import React from "react";
import articles from "./articel-content";
import Articles from "../components/Articles";

const ArticleList = () => {
  return (
    <div>
      <h1 className="text-gray-900 text-2xl mt-[2em] font-bold">
        Article List
      </h1>
      <Articles articles={articles} />
    </div>
  );
};

export default ArticleList;
