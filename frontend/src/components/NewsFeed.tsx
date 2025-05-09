import React, { useEffect, useState } from "react";

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=10e92041a1c545a9be9a2ac3c40e7df8"
        );
        const data = await res.json();
        const filtered = data.articles.filter(
          (article: any) => article.urlToImage && article.urlToImage !== ""
        );
        setArticles(filtered);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  if (articles.length === 0) return <p>No articles with real images found.</p>;

  return (
    <div>
      <h2>📰 TechCrunch News</h2>
      {articles.map((article, index) => (
        <div key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <img
            src={article.urlToImage}
            alt={article.title}
            style={{ maxWidth: "300px", height: "auto" }}
          />
          <p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
