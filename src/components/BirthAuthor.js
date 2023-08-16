import { useMutation, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const CHANGE_BIRTH = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
    }
  }
`;

const BirthAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBirth, result] = useMutation(CHANGE_BIRTH, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
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

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          birthyear:
          <input value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BirthAuthor;
