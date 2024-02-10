import axios from "axios";

class BookService {
  addBooks(book, navigate, currentUser) {
    const API_URL = "https://book-reading-backend.onrender.com/api/books/";

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
            "Access-Control-Allow-Origin": "https://book-reading-backend.onrender.com",
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
    const API_URL = "https://book-reading-backend.onrender.com/api/books/";

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
          "Access-Control-Allow-Origin": "https://book-reading-backend.onrender.com",
        },
      })
      .then((response) => {
        return response.data;
      }).catch(e => {
        setBookErrorMessage("本が追加できません")
      });
  }

  async allUnStatusBooks(currentUser, setBookErrorMessage) {
    const API_URL = "https://book-reading-backend.onrender.com/api/books/";

    const authToken = currentUser.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return await axiosInstance
      .get(API_URL + "allunstatus", {
        headers: {
          "Access-Control-Allow-Origin": "https://book-reading-backend.onrender.com",
        },
      })
      .then((response) => {
        return response.data;
      }).catch(e => {
        setBookErrorMessage("本が取得できません");
      });
  }

  async allCompleteStatusBooks(currentUser, setBookErrorMessage) {
    const API_URL = "https://book-reading-backend.onrender.com/api/books/";

    const authToken = currentUser.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return await  axiosInstance
      .get(API_URL + "allcompletestatus", {
        headers: {
          "Access-Control-Allow-Origin": "https://book-reading-backend.onrender.com",
        },
      })
      .then((response) => {
        return response.data;
      }).catch(e => {
        setBookErrorMessage("本が取得できません");
      });
  }

  async statusComplete(isbn, currentUser, setBookErrorMessage) {
    const API_URL = "https://book-reading-backend.onrender.com/api/books/";

    const authToken = currentUser.accessToken;

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
     await axiosInstance
      .post(
        API_URL + "statuscomplete",
        {
          isbn: isbn
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "https://book-reading-backend.onrender.com",
          },
        }
      ).catch(e => {
        setBookErrorMessage("本が取得できません");
      });
  }
}

export default new BookService();
