import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import News from "./pages/News";
import { UserProvider } from "./components/UserContext";
function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/article" element={<News />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
