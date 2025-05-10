import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase.tsx";
import { signOut } from "firebase/auth";
import "./Navbar.css"; // ודא שקיים הקובץ

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authMethod = localStorage.getItem("authMethod");
    const storedUser = localStorage.getItem("user");

    setIsLoggedIn(!!authMethod && !!storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.email);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    const authMethod = localStorage.getItem("authMethod");

    if (authMethod === "google") {
      try {
        await signOut(auth);
        console.log("Logged out from Firebase");
      } catch (error) {
        console.warn("Firebase logout failed:", error);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authMethod");

    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <h2 className="logo">📰 TimesHub</h2>
      </div>

      <div className="navbar-right">
        {username && <span className="welcome-text">Welcome, {username.split("@")[0]}</span>}

        <div className="dropdown">
          <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            My Account ⌄
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {!isLoggedIn ? (
                <button onClick={() => navigate("/auth")}>Login / Register</button>
              ) : (
                <>
                  <button onClick={() => navigate("/article")}>My Articles</button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
