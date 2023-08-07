import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articles from "./articel-content";
import Articles from "../components/Articles";
import NotFound from "./NotFound";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddComments";
const Article = () => {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);
  const [articleInfo, setArticleInfo] = useState({ comments: [] });
  // Set up an effect to fetch data when the 'name' dependency changes
  useEffect(() => {
    // Define an asynchronous function to fetch data from the specified API endpoint
    const fetchData = async () => {
      // Make a GET request to the API endpoint for the specified article name
      const result = await fetch(`/api/articles/${name}`);

      // Parse the JSON response from the API
      const body = await result.json();

      // Log the fetched data to the console
      console.log(body);

      // Update the 'articleInfo' state with the fetched data
      setArticleInfo(body);
    };

    // Call the 'fetchData' function when the component mounts or when 'name' changes
    fetchData();
  }, [name]);

  if (!article) return <NotFound />;

  const otherArticles = articles.filter((article) => article.name !== name);

  return (
    <>
      <h1 className="text-gray-900 text-2xl mt-[2em] font-bold">
        {article.title}
      </h1>
      <div className="text-gray-700 text-lg mt-[2em]">
        {article.content.map((paragraph, index) => {
          return <p key={index}> {paragraph} </p>;
        })}
        <CommentsList comments={articleInfo.comments} />
        <AddCommentForm articleName={name} setArticleInfo={articleInfo} />
        <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
          Other Articles
        </h1>
        <div className="container gap-2 flex flex-wrap">
          <Articles articles={otherArticles} />
        </div>
      </div>
    </>
  );
};

export default Article;
