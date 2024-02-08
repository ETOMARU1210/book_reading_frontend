import axios from "axios";

class BookService {
  addBooks(book, navigate, currentUser) {
    const API_URL = "https://book-reading-backend.fly.dev/api/books/";

    const user = currentUser;

    const authToken = currentUser.accessToken;

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
          isbn: book.Item.isbn,
          status: "未読了",
          reviewAverage: book.Item.reviewAverage,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "https://book-reading-backend.fly.dev",
          },
        }
      )
      .then((response) => {
        navigate("/profile");
        window.location.reload();
      }).catch(e => {
        console.log(e);
      });
  }

  allBooks(currentUser, setBookErrorMessage) {
    const API_URL = "https://book-reading-backend.fly.dev/api/books/";

    const authToken = currentUser.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return axiosInstance
      .get(API_URL + "all", {
        headers: {
          "Access-Control-Allow-Origin": "https://book-reading-backend.fly.dev/",
        },
      })
      .then((response) => {
        return response.data;
      }).catch(e => {
        setBookErrorMessage("本が追加できません")
      });
  }

  allUnStatusBooks(currentUser, setBookErrorMessage) {
    const API_URL = "https://book-reading-backend.fly.dev/api/books/";

    const authToken = currentUser.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return axiosInstance
      .get(API_URL + "allunstatus", {
        headers: {
          "Access-Control-Allow-Origin": "https://book-reading-backend.fly.dev",
        },
      })
      .then((response) => {
        return response.data;
      }).catch(e => {
        setBookErrorMessage("本が取得できません");
      });
  }

  allCompleteStatusBooks(currentUser, setBookErrorMessage) {
    const API_URL = "https://book-reading-backend.fly.dev/api/books/";

    const authToken = currentUser.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return axiosInstance
      .get(API_URL + "allcompletestatus", {
        headers: {
          "Access-Control-Allow-Origin": "https://book-reading-backend.fly.dev",
        },
      })
      .then((response) => {
        return response.data;
      }).catch(e => {
        setBookErrorMessage("本が取得できません");
      });
  }

  statusComplete(isbn, currentUser, setBookErrorMessage) {
    const API_URL = "https://book-reading-backend.fly.dev/api/books/";

    const authToken = currentUser.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    axiosInstance
      .post(
        API_URL + "statuscomplete",
        {
          isbn: isbn
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "https://book-reading-backend.fly.dev",
          },
        }
      ).catch(e => {
        setBookErrorMessage("本が取得できません");
      });
  }
}

export default new BookService();
