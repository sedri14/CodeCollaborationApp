import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import CodeBlock from "./components/CodeBlock/CodeBlock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/codeblock/:id" element={<CodeBlock />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
