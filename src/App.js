import { useEffect, useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import { Routes, Route, Link } from "react-router-dom";
import { Container } from "@mui/material";

import Authors from "./pages/Authors";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";
import LoginForm from "./pages/LoginForm";
import Recommended from "./pages/Recommended";

import { BOOK_ADDED, ALL_BOOKS } from "./queries";

import { AppBar, Button, Toolbar, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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

  useEffect(() => {
    const storedToken = localStorage.getItem("booklibrary-user-token");
    if (storedToken) setToken(storedToken);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Container>
      <AppBar position="static" sx={{ marginBottom: "20px" }}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Button color="inherit" component={RouterLink} to="/">
              authors
            </Button>
            <Button color="inherit" component={RouterLink} to="/books">
              books
            </Button>
            <Button color="inherit" component={RouterLink} to="/add">
              add book
            </Button>
            {token && (
              <Button color="inherit" component={RouterLink} to="/recommended">
                recommended
              </Button>
            )}
          </Box>
          {token ? (
            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommended" element={<Recommended />} />
      </Routes>
    </Container>
  );
};

export default App;
