import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase.tsx"; // ודא שהנתיב נכון לקובץ Firebase.tsx שלך
import { signOut } from "firebase/auth";


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
  
    // אם המשתמש התחבר עם גוגל – נעשה signOut ב-Firebase
    if (authMethod === "google") {
      try {
        await signOut(auth);
        console.log("Logged out from Firebase");
      } catch (error) {
        console.warn("Firebase logout failed:", error);
      }
    }
  
    // מחיקת כל הנתונים המקומיים
    localStorage.removeItem("token");       // למשתמשים רגילים
    localStorage.removeItem("user");        // לכולם
    localStorage.removeItem("authMethod");  // ניקוי סוג ההתחברות
  
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  };
  
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#f3f3f3", position: "relative" }}>
  
       
  {isLoggedIn && (
  <button onClick={handleLogout} style={{ marginRight: "1rem" }}>
    Logout
  </button>
)}
  <div>{username ? `Hello, ${username}` : "Not logged in"}</div>

  <h2>📰 TimesHub</h2>
  <div style={{ display: "flex", alignItems: "center" }}>
    <input placeholder="Search articles" style={{ marginRight: "1rem" }} />


    <div style={{ display: "inline-block", position: "relative" }}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        My Account ⌄
      </button>
      {dropdownOpen && (
        <div style={{ position: "absolute", right: 0, background: "#fff", border: "1px solid #ccc", marginTop: "0.5rem", zIndex: 10 }}>
          {!isLoggedIn ? (
            <button style={{ display: "block", width: "100%", padding: "0.5rem" }} onClick={() => navigate("/auth")}>
              Login / Register
            </button>
          ) : (
            <>
              <button style={{ display: "block", width: "100%", padding: "0.5rem" }} onClick={() => navigate("/my-articles")}>
                My Articles
              </button>
              <button style={{ display: "block", width: "100%", padding: "0.5rem" }} onClick={handleLogout}>
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
