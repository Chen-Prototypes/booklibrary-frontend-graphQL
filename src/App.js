import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import { Routes, Route, Link } from "react-router-dom";

import Authors from "./pages/Authors";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";
import LoginForm from "./pages/LoginForm";
import Recommended from "./pages/Recommended";

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Link to="/">authors</Link>
      <Link to="/books">books</Link>
      <Link to="/add"> add book</Link>
      {token ? (
        <button onClick={logout}>logout</button>
      ) : (
        <Link to="/login">login</Link>
      )}
      <Link to="/recomended">recomended</Link>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="recomended" element={<Recommended />} />
      </Routes>
    </div>
  );
};

export default App;
