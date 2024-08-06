import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { listByShop } from "./api-book.js";
import DeleteBook from "./DeleteBook.jsx";

const useStyles = makeStyles((theme) => ({
  books: {
    padding: "24px",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  cover: {
    width: 110,
    height: 100,
    margin: "8px",
  },
  details: {
    padding: "10px",
  },
}));

export default function MyBooks(props) {
  const classes = useStyles();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByShop(
      {
        shopId: props.shopId,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBooks(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const removeBook = (book) => {
    const updatedBooks = [...books];
    const index = updatedBooks.indexOf(book);
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  return (
    <Card className={classes.books}>
      <Typography type="title" className={classes.title}>
        Books
        <span className={classes.addButton}>
          <Link to={"/librarian/" + props.shopId + "/books/new"}>
            <Button color="primary" variant="contained">
              <Icon className={classes.leftIcon}>add_box</Icon> New Book
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {books.map((book, i) => {
          return (
            <span key={i}>
              <ListItem>
                <CardMedia
                  className={classes.cover}
                  image={
                    "/api/book/image/" +
                    book._id +
                    "?" +
                    new Date().getTime()
                  }
                  title={book.name}
                />
                <div className={classes.details}>
                  <Typography
                    type="headline"
                    component="h2"
                    color="primary"
                    className={classes.bookTitle}
                  >
                    {book.name}
                  </Typography>
                  <Typography
                    type="subheading"
                    component="h4"
                    className={classes.subheading}
                  >
                    Quantity: {book.quantity} | Price: ${book.price}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link
                    to={
                      "/librarian/" +
                      book.shop._id +
                      "/" +
                      book._id +
                      "/edit"
                    }
                  >
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteBook
                    book={book}
                    shopId={props.shopId}
                    onRemove={removeBook}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </span>
          );
        })}
      </List>
    </Card>
  );
}
MyBooks.propTypes = {
  shopId: PropTypes.string.isRequired,
};
