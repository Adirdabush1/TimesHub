import { useNavigate, useLocation } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const articleUrl = location.state?.articleUrl; // קבלת כתובת המאמר מ-state

  const handleArticleClick = () => {
    if (articleUrl) {
      navigate(articleUrl); // מעבר ישיר לכתובת המאמר
    } else {
      navigate("/Article"); // אפשרות ברירת מחדל אם אין URL
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Thank You for Your Purchase!</h2>
      <p>Your payment was successful. You now have access to the article.</p>
      <button
        onClick={handleArticleClick}
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1.5rem",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Read Your Article
      </button>
    </div>
  );
};

export default ThankYou;
