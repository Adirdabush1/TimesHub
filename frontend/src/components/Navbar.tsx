import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#f3f3f3",
        position: "relative",
      }}
    >
      <h2>📰 ArticleStore</h2>
      <div>
        <input placeholder="Search articles" style={{ marginRight: '1rem' }} />
        <button>My Account</button>
      </div>
    </nav>
  );
};

export default Navbar;
