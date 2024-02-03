import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password, setCurrentUser, navigate, setErrorMsg) {
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
        setErrorMsg("");
        navigate("/")
      }
    }).catch((e) => {
      console.log(e);
      setErrorMsg(e.response.data.message);
      navigate("/login");
    });
  }

  logout(setCurrentUser, navigate) {
    setCurrentUser({});
    navigate("/")
  }

  register(username, email, password, setCurrentUser, navigate, setErrorMsg ) {
    return axios.post(API_URL + "signup", {
      username,
      email, 
      password
    }) .then(response => {
      if (response.data.accessToken) {
        console.log(response.data);
        setCurrentUser(response.data);
        setErrorMsg("")
        navigate("/")
      }
    }).catch(e => {
      console.log(e.response.data);
      setErrorMsg(e.response.data.message)
      navigate("/signup")
    });
  }
}

export default new AuthService();