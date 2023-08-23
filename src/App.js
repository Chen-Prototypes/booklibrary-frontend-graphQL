import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import { Routes, Route, Link } from "react-router-dom";

import Authors from "./pages/Authors";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";
import LoginForm from "./pages/LoginForm";
import Recommended from "./pages/Recommended";

import { BOOK_ADDED, ALL_BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      const addedBook = data.data.bookAdded;
      window.alert("new book added");
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

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
      <Link to="/recommended">recommended</Link>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommended" element={<Recommended />} />
      </Routes>
    </div>
  );
};

export default App;
