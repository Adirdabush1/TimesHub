import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import "./Home.css";

// סוג של המאמרים
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]); // סוג נתונים מדויק
  const [loading, setLoading] = useState<boolean>(true); // סוג boolean
  const [user, setUser] = useState<any>(null); // סוג נתונים למשתמש

  useEffect(() => {
    // אם יש משתמש מחובר ב-localStorage, נאחסן אותו ב-state
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=10e92041a1c545a9be9a2ac3c40e7df8"
        );
        const data = await res.json();
        const filtered = data.articles.filter(
          (article: any) => article.urlToImage && article.urlToImage !== ""
        );
        setArticles(filtered); // עדכון המאמרים
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); // מסיים את טעינת המאמרים
      }
    };

    fetchNews();
  }, []);

  const handleArticleClick = (articleUrl: string) => {
    if (user) {
      window.open(articleUrl, "_blank"); // פותח את המאמר במצב חדש
    } else {
      navigate("/Payment"); // אם המשתמש לא מחובר, מעבירים לדף תשלום
    }
  };

  return (
    <div className="home-wrapper">
      <div className="overlay" />
      <Navbar />
      <div style={{ display: "flex" }}>
        <main className="main-container glass">
          <div className="buttons-wrapper">
            <button onClick={() => navigate("/auth")} className="primary-button animated-button">
              Login / Register
            </button>
            <button
              onClick={() => (user ? navigate("/article") : navigate("/auth"))}
              className="primary-button animated-button"
            >
              Articles
            </button>
          </div>

          <h2 className="title">🔥 Featured Paid Articles 🔥</h2>

          {loading ? (
            <p className="loading-text">Loading articles...</p>
          ) : (
            <div className="articles-grid">
              {articles.map((article, index) => (
                <div key={index} className="card-wrapper">
                  <ArticleCard
                    title={article.title}
                    preview={article.description}
                    price={Math.floor(Math.random() * 20) + 5}
                    imageUrl={article.urlToImage} // העברת התמונה לכרטיס המאמר
                    onClick={() => handleArticleClick(article.url)}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
