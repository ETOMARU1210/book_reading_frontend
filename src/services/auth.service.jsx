import axios from "axios";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../store/UserState";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    axios
    .post(API_URL + "signin", {
      username,
      password
    }
    )
    .then(response => {
      if (response.data.accessToken) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        const [currentUser, setCurrentUser] = useRecoilState(UserState);
        setCurrentUser(response.data);
        console.log(currentUser);
      }
    });
  }

  logout(navigate) {
    localStorage.removeItem("user");
    navigate("/")
  }

  register(username, email, password, navigate ) {
    return axios.post(API_URL + "signup", {
      username,
      email, 
      password
    }) .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        const [, setCurrentUser] = useRecoilState(UserState);
        setCurrentUser(this.getCurrentUser());
      }
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();