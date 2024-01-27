const API_URL = 'http://localhost:8080/api/books/';

class BookService {
  addBooks(books) {
    return axios.post(API_URL + "add", books);
  }
}

export default new BookService();