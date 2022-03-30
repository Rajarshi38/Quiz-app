import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Starter from "./components/Starter";
import Header from "./components/Header";
import Question from "./components/Questions";
import Result from "./components/Result";
import Signup from "./components/Signup";
import { AuthProvider } from "./components/Contexts/AuthContext";

function App() {
  return (
    <Router>
      <div className="App">
        <header
          style={{
            marginBottom: "10px",
          }}
        >
          <Header />
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Starter />} />
            <Route path="/home" element={<Home />} />
            <Route path="/questions" element={<Question />} />
            <Route path="/result" element={<Result />} />
            <AuthProvider>
              <Route path="/signup" element={<Signup />} />
            </AuthProvider>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
