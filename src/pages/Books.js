import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const [cur_genre, setGenre] = useState("");

  const genres_query = useQuery(ALL_BOOKS);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: cur_genre },
    fetchPolicy: "network-only",
  });

  if (result.loading || genres_query.loading) return <div>loading...</div>;
  if (result.error) return <div>Error fetching books!</div>;
  if (genres_query.error) return <div>Error fetching genres!</div>;

  const books = result.data.allBooks;
  const genres = [
    ...new Set(genres_query.data.allBooks.flatMap((book) => book.genres)),
  ];

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{cur_genre !== "" ? cur_genre : "all genres"}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setGenre(genre);
          }}
        >
          {genre !== "" ? genre : "all genres"}
        </button>
      ))}
    </div>
  );
};

export default Books;
