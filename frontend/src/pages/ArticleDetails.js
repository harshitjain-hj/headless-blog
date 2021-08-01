import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Markdown from "markdown-to-jsx";

// import useFetch from "../hooks/useFetch";

const ARTICLE = gql`
  query getArticle($id: ID!) {
    article(id: $id) {
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

export default function ArticleDetails() {
  const { id } = useParams();
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/articles/" + id
  // );
  const { loading, error, data } = useQuery(ARTICLE, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="article-card">
      <div className="title-wrapper">
        <div className="rating">{data.article.review}</div>
        <h2>{data.article.title}</h2>

        <div className="categories-tag">
          {data.article.categories.map((cate) => (
            <small key={cate.id}>{cate.name}</small>
          ))}
        </div>
      </div>
      <Markdown>{data.article.body}</Markdown>
    </div>
  );
}
