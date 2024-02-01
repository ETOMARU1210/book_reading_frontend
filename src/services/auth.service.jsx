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
        JSON.parse(localStorage.setItem("user", JSON.stringify(response.data)))
        console.log(JSON.parse(localStorage.getItem("user")))
        setCurrentUser(this.getCurrentUser());
      }
    });
  }

  logout(setCurrentUser) {
    setCurrentUser({});
    localStorage.removeItem("user");
    navigate("/")
  }

  register(username, email, password, setCurrentUser ) {
    return axios.post(API_URL + "signup", {
      username,
      email, 
      password
    }) .then(response => {
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(this.getCurrentUser());
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();