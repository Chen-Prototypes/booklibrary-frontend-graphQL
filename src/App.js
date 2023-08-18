import { useState } from "react";
import { useApolloClient } from '@apollo/client'

import { Routes, Route, Link } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import BirthAuthor from "./components/BirthAuthor";
import LoginForm from "./components/LoginForm";

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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Authors /> <BirthAuthor />
            </>
          }
        />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
