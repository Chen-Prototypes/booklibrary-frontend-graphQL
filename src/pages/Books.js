import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const Books = () => {
  const [cur_genre, setGenre] = useState("");

  const genres_query = useQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
  });
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: cur_genre },
    fetchPolicy: "cache-and-network",
    pollInterval: 2000,
  });

  if (result.loading || genres_query.loading)
    return <Typography>loading...</Typography>;
  if (result.error)
    return <Typography color="error">Error fetching books!</Typography>;
  if (genres_query.error)
    return <Typography color="error">Error fetching genres!</Typography>;

  const books = result.data.allBooks;
  const genres = [
    ...new Set(genres_query.data.allBooks.flatMap((book) => book.genres)),
  ];

  return (
    <div>
      <Typography variant="h4">Books</Typography>
      <Typography>
        In genre: <strong>{cur_genre !== "" ? cur_genre : "All Genres"}</strong>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author.name}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography sx={{ marginTop: "15px", marginBottom: "5px" }}>Select Another Genre</Typography>
      <div>
        {genres.map((genre) => (
          <Button
            variant="outlined"
            color="primary"
            key={genre}
            onClick={() => setGenre(genre)}
          >
            {genre !== "" ? genre : "all genres"}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Books;
