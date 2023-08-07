import Navbar from "./components/Navbar";
import About from "./pages/About";
import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="mx-auto max-w-screen-lg ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/article-list" element={<ArticleList />} />
          <Route path="/article/:name" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
