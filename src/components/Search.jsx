import {
  Container,
  Grid,
  List,
  TextField,
  ListItem,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SearchState }  from "../store/SearchState";
import bookService from "../services/book.service";

const Search = () => {
  const {
    register,
    handleSubmit,
    getValues
  } = useForm();

  const [books, setBooks] = useRecoilState(SearchState);

  const onSubmit = () => {
    searchBooks(getValues("search"));
  };

  const searchBooks = (author) => {
    axios
      .get(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&author=${author}&applicationId=1029688552373040370`
       )
      .then((response) => {
        setBooks(response.data.Items);
        console.log(response.data.Items)
      })
  };

  const booksSubmit = (book) => {
    bookService.addBooks(book);
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom textAlign="center" mt={3}>
        著者検索
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          margin="0 auto"
          maxWidth="500px"
          alignItems="center"
          mb={5}
        >
          <Grid item xs={9} md={10}>
            <TextField
              variant="outlined"
              label="本の検索"
              fullWidth
              {...register("search")}
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <Button type="submit" style={{padding: "10px", background: "linear-gradient(#b08d5b,#c2a274"}}>
              <SearchIcon fontSize="large" style={{color: "white"}}/>
            </Button>
          </Grid>
        </Grid>
      </form>

      <List>

       {
        books[0].id != -1 &&
        books.map(book => (
          <ListItem
          style={{ color: "white", marginBottom: "10px" }}
          sx={{
            width: "100%",
            background: "linear-gradient(#b08d5b,#c2a274)",
            padding: "20px 16px 0",
            gridTemplateRows: "1fr 1fr 56px",
            gridTemplateColumns: "174px 1fr",
            display: "grid"
          }}
          key={book.Item.isbn}
        >
          <Box
            style={{
              marginTop: "40px",
              gridRow: "1/4",
              gridColumn: 1,
              alignSelf: "end",
            }}
          >
            <img
              src={book.Item.largeImageUrl}
              style={{
                display: "block",
                height: "auto",
                width: "100%",
                maxWidth: "100%",
              }}
            />
          </Box>
          <Typography
            variant="h5"
            gutterBottom
            style={{ gridRow: 1, gridColumn: 2, marginBottom: "auto" }}
          >
            {book.Item.title}
          </Typography>
          <Box
            style={{
              gridRow: 2,
              gridColumn: 2,
              marginTop: "auto",
              textAlign: "right",
            }}
          >
            <Typography variant="body2"  gutterBottom>
              {book.Item.author + " / " + book.Item.publisherName}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {book.Item.itemPrice + "円" + " / " +  "評価 :" + book.Item.reviewAverage}
            </Typography>
          </Box>
          <Box style={{ gridRow: 3, gridColumn: 2, marginLeft: "auto" }}>
            <Box
              style={{
                display: "flex",
                alignItems: "flex-end",
                flexFlow: "row nowrap",
                marginTop: "8px",
              }}
            >
              <Button style={{ background: "#776f59", color: "#fff" }} onClick={() => booksSubmit(book)}>
                これを読む
                <BookIcon style={{ marginLeft: "0.1875em" }} />
              </Button>
            </Box>
          </Box>
        </ListItem>
       ))
       }
      </List>
    </Container>
  );
};

export default Search;