import React from "react";
import { Link } from "react-router-dom";

const Articles = ({ articles }) => {
  return (
    <div className="container gap-2 flex flex-wrap">
      {articles.map((article, index) => {
        return (
          <div
            key={index}
            className="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/article/${article.name}`}>
              <img
                className="rounded-t-lg h-64 object-cover w-full"
                src={article.thumbnail}
                alt=""
              />
            </Link>
            <div className="p-5">
              <Link to={`/article/${article.name}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {article.title}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {article.content[0].substring(0, 150)}...
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
