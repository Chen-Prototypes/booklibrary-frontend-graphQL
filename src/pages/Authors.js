import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CHANGE_BIRTH, ALL_AUTHORS } from "../queries";

const BirthAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const query_result = useQuery(ALL_AUTHORS);

  const [changeBirth, result] = useMutation(CHANGE_BIRTH, {
    onError: (error) => {
      console.log("Could not change birthyear");
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null)
      console.log("person not found");
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    const bornYear = parseInt(born);

    changeBirth({ variables: { name, setBornTo: bornYear } });

    setName("");
    setBorn("");
  };

  if (query_result.loading) return <div>loading...</div>;
  const authors = query_result.data.allAuthors;

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option value="" disabled>
            Select an author
          </option>
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          birthyear:
          <input value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) return <div>loading...</div>;

  const authors = result.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthAuthor />
    </div>
  );
};

export default Authors;
