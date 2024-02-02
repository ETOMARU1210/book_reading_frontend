import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password, setCurrentUser) {
    axios
    .post(API_URL + "signin", {
      username,
      password
    }
    )
    .then(response => {
      if (response.data.accessToken) {
        // JSON.parse(localStorage.setItem("user", JSON.stringify(response.data)))
        setCurrentUser(response.data);
      }
    });
  }

  logout(setCurrentUser) {
    setCurrentUser({});
    navigate("/")
  }

  register(username, email, password, setCurrentUser ) {
    return axios.post(API_URL + "signup", {
      username,
      email, 
      password
    }) .then(response => {
      setCurrentUser(response.data );
    });
  }

  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem("user"));
  // }
}

export default new AuthService();