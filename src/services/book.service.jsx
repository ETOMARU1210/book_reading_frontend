import axios from "axios";

const API_URL = 'http://localhost:8080/api/books/';

class BookService {
  addBooks(book) {
    axios.post(API_URL + "add", {
      title: book.Item.title,
      author: book.Item.author,
      publisherName: book.Item.publisherName,
      itemPrice: book.Item.itemPrice,
      reviewAverage: book.Item.reviewAverage
    });
  }
}

export default new BookService();