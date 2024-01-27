import axios from "axios";


class BookService {

  addBooks(book) {
    const API_URL = 'http://localhost:8080/api/books/';

    const user = JSON.parse(localStorage.getItem("user"));

    const authToken = user.accessToken; 

    const axiosInstance = axios.create({
      baseURL: API_URL + "/add",
      headers: {
      Authorization: `Bearer ${authToken}`
      }
      });
      axiosInstance.post(API_URL + "add", {
      title: book.Item.title,
      author: book.Item.author,
      publisherName: book.Item.publisherName,
      itemPrice: book.Item.itemPrice,
      reviewAverage: book.Item.reviewAverage
    }).catch((error) => {
      alert("Error fetching data");
      });
  }
}

export default new BookService();