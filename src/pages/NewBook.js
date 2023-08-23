import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";
import { updateCache } from "../App";
import {
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addPerson);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    const int_published = parseInt(published);
    addBook({ variables: { title, author, published: int_published, genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <Typography variant="h4" sx={{marginBottom: "10px"}}>Add New Book</Typography>
      <form onSubmit={submit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              fullWidth
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Published"
              type="number"
              fullWidth
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Genre"
              fullWidth
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={addGenre}>
              Add Genre
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Genres: {genres.join(", ")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewBook;
