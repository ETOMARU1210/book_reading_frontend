import axios from "axios";

import { useNavigate } from "react-router-dom";

class BookService {
  addBooks(book, navigate) {
    const API_URL = "http://localhost:8080/api/books/";

    const user = JSON.parse(localStorage.getItem("user"));

    const authToken = user.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    axiosInstance
      .post(
        API_URL + "add",
        {
          username: user.username,
          title: book.Item.title,
          author: book.Item.author,
          largeImageUrl: book.Item.largeImageUrl,
          publisherName: book.Item.publisherName,
          itemPrice: book.Item.itemPrice,
          status: "未読了",
          reviewAverage: book.Item.reviewAverage,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      )
      .then((response) => {
        navigate("/");
        window.location.reload();
      });
  }

  allBooks() {
    const API_URL = "http://localhost:8080/api/books/";

    const user = JSON.parse(localStorage.getItem("user"));

    const authToken = user.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    axiosInstance
      .get(
        API_URL + "all",
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      )
      // .then((response) => {
      //   console.log(response);
      // });
  }
}

export default new BookService();
