import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password, setCurrentUser, navigate) {
    axios
    .post(API_URL + "signin", {
      username,
      password
    }
    )
    .then(response => {
      if (response.data.accessToken) {
        console.log(response.data);
        setCurrentUser(response.data);
        navigate("/")
      }
    });
  }

  logout(setCurrentUser, navigate) {
    setCurrentUser({});
    navigate("/")
  }

  register(username, email, password, setCurrentUser ) {
    return axios.post(API_URL + "signup", {
      username,
      email, 
      password
    }) .then(response => {
      if (response.data.accessToken) {
        console.log(response.data);
        setCurrentUser(response.data);
        navigate("/")
      }
    });
  }

  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem("user"));
  // }
}

export default new AuthService();