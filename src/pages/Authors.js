import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CHANGE_BIRTH, ALL_AUTHORS } from "../queries";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const BirthAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const query_result = useQuery(ALL_AUTHORS, {
    fetchPolicy: "network-only",
    pollInterval: 2000,
  });

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

  if (query_result.loading) return <Typography>loading...</Typography>;
  const authors = query_result.data.allAuthors;

  return (
    <div>
      <Typography variant="h6" sx={{marginTop: "20px"}}>Set Author Birth Year</Typography>
      <form onSubmit={submit}>
        <FormControl fullWidth>
          <InputLabel>Select an author</InputLabel>
          <Select value={name} onChange={(e) => setName(e.target.value)}>
            <MenuItem value="">
              <em>Select an author</em>
            </MenuItem>
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.name}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Birthyear"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: "5px"}}>
          Submit
        </Button>
      </form>
    </div>
  );
};

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) return <Typography>loading...</Typography>;

  const authors = result.data.allAuthors;

  return (
    <div>
      <Typography variant="h4">Authors</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Born</TableCell>
            <TableCell>Books</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((a) => (
            <TableRow key={a.name}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.born}</TableCell>
              <TableCell>{a.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BirthAuthor />
    </div>
  );
};

export default Authors;
