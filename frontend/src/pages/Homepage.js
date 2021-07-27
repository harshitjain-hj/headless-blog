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
    }
  }
`;

export default function Homepage() {
  // const { loading, error, data } = useFetch("http://localhost:1337/articles");
  const { loading, error, data } = useQuery(ARTICLES);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error...</p>;

  return (
    <div>
      <div key="1" className="article-card">
        <div className="rating">10</div>
        <h2>Youtube Trend Analysis with Python</h2>
        <small>console list</small>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
          nostrum officia excepturi quisquam earum molestiae porro pariatur? Et
          iusto aspernatur eligendi iure provident commodi sint culpa voluptate
          neque sunt, in, consectetur laborum dolor explicabo quasi maxime vel
          est libero suscipit impedit? Explicabo, iste at nobis a inventore
          tempora autem? Cumque, repellat totam? Dolorum impedit ratione illum
          quis. Nihil consequuntur praesentium consequatur minima quas, ut id a
          nulla, adipisci enim, laudantium similique iste?
        </p>
        <Link to="/details/">Read More..</Link>
      </div>
      {data &&
        data.articles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="rating">{article.review}</div>
            <h2>{article.title}</h2>
            <small>console list</small>

            <p>{article.body.substring(0, 72)}...</p>
            <Link to={`/details/${article.id}`}>Read More..</Link>
          </div>
        ))}
    </div>
  );
}
