import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading categories</p>;

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Articles</h1>
      </Link>
      {error ? (
        <p>Error fetching categories, Sorry!</p>
      ) : (
        <nav className="categories">
          <span className="">Filter articles by category:</span>
          {data.categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              {category.name}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
