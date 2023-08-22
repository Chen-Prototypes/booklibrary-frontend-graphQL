import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommended = () => {
  const me = useQuery(ME);

  const favoriteGenre = me.data ? me.data.me.favoriteGenre : null;

  const result = useQuery(ALL_BOOKS, {
    skip: favoriteGenre === null,
    variables: { genre: favoriteGenre },
  });
    console.log(favoriteGenre);
  if (me.error) return <div>Error loading user data</div>;
  if (result.error) return <div>Error loading books</div>;
  if (me.loading) return <div>Loading user data...</div>;
  if (favoriteGenre === null) return <div>No favorite genre found for user</div>;
  if (result.loading) return <div>Loading books...</div>;


  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
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
    </div>
  );
};

export default Recommended;
