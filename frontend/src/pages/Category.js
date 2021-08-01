import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
  query getCategory($id: ID!) {
    category(id: $id) {
      id
      name
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
  }
`;

export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: {
      id: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <h2>{data.category.name}</h2>
      {data &&
        data.category.articles.map((article) => (
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
