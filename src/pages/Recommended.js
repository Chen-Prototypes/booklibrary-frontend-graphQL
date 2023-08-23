import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
} from "@mui/material";

const Recommended = () => {
  const me = useQuery(ME);

  const favoriteGenre = me.data ? me.data.me.favoriteGenre : null;

  const result = useQuery(ALL_BOOKS, {
    skip: favoriteGenre === null,
    variables: { genre: favoriteGenre },
  });

  if (me.error)
    return <Typography color="error">Error loading user data</Typography>;
  if (result.error)
    return <Typography color="error">Error loading books</Typography>;
  if (me.loading || result.loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (favoriteGenre === null)
    return <Typography>No favorite genre found for user</Typography>;

  const books = result.data.allBooks;

  return (
    <Box>
      <Typography variant="h4">Recommended</Typography>
      <Typography>
        Books in your favorite genre: <strong>{favoriteGenre}</strong>
      </Typography>
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
    </Box>
  );
};

export default Recommended;
