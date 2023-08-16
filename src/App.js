import { Routes, Route } from "react-router-dom";

import { Link } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import BirthAuthor from "./components/BirthAuthor";

const App = () => {
  return (
    <div>
      <Link to="/">authors</Link>
      <Link to="/books">books</Link>
      <Link to="/add"> add book</Link>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Authors /> <BirthAuthor />
            </>
          }
        />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
