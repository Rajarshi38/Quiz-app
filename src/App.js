import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Starter from "./components/Starter";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Starter />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
