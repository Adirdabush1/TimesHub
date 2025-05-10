import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Auth from "./pages/Auth";
import News from "./pages/News";
import { UserProvider } from "./components/UserContext";
import Payment from "./pages/Payment";
import ThankYou from "./pages/TankYou";
function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/article" element={<News />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/TankYou" element={<ThankYou />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
