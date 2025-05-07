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
      <h2>📰 TimesHub</h2>
      <div>
        <input placeholder="Search articles" style={{ marginRight: "1rem" }} />
        <div style={{ display: "inline-block", position: "relative" }}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            My Account ⌄
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                background: "#fff",
                border: "1px solid #ccc",
                marginTop: "0.5rem",
                zIndex: 10,
              }}
            >
              {!isLoggedIn ? (
                <button
                  style={{ display: "block", width: "100%", padding: "0.5rem" }}
                  onClick={() => navigate("/auth")}
                >
                  Login / Register
                </button>
              ) : (
                <>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem",
                    }}
                    onClick={() => navigate("/my-articles")}
                  >
                    My Articles
                  </button>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
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
