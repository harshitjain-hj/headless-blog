import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// import useFetch from "../hooks/useFetch";

const ARTICLE = gql`
  query getArticle($id: ID!) {
    article(id: $id) {
      id
      title
      body
      review
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
      <div className="rating">{data.article.review}</div>
      <h2>{data.article.title}</h2>
      <small>console list</small>

      <p>{data.article.body}</p>
    </div>
  );
}
