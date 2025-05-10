import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
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

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "1rem" }}>
          <h2>Available Articles</h2>

          <button
            onClick={() => navigate("/auth")}
            style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
          >
            Login / Register
          </button>

          <button
            onClick={() => navigate("/article")}
            style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
          >
            Articles
          </button>

          {loading ? (
            <p>Loading articles...</p>
          ) : (
            articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                preview={article.description}
                price={Math.floor(Math.random() * 20) + 5} // מחיר מדומה
                onClick={() => window.open(article.url, "_blank")}
              />
            ))
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
