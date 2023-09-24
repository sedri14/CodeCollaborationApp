import HomePage from "./components/HomePage";
import CodeBlock from "./components/CodeBlock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/codeblock/:id" element={<CodeBlock />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
