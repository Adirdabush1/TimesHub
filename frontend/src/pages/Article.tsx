// fetch an article from the api and display it in a form

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Article: React.FC = () => {
  const navigate = useNavigate();
  interface ArticleType {
    title: string;
    content: string;
  }

  const [article, setArticle] = React.useState<ArticleType | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(""); // Replace with your API endpoint
        if (!response.ok) {
          console.error("Error fetching article:", response.statusText);
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};
export default Article;
