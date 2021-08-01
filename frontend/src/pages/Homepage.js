import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// import useFetch from "../hooks/useFetch";

const ARTICLES = gql`
  query getArticles {
    articles {
      id
      title
      body
      review
      categories {
        id
        name
      }
    }
  }
`;

export default function Homepage() {
  // const { loading, error, data } = useFetch("http://localhost:1337/articles");
  const { loading, error, data } = useQuery(ARTICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      {data &&
        data.articles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="title-wrapper">
              <div className="rating">{article.review}</div>
              <h2>{article.title}</h2>

              <div className="categories-tag">
                {article.categories.map((cate) => (
                  <small key={cate.id}>{cate.name}</small>
                ))}
              </div>
            </div>

            <p>{article.body.substring(0, 72)}...</p>
            <Link to={`/details/${article.id}`}>Read More..</Link>
          </div>
        ))}
    </div>
  );
}
