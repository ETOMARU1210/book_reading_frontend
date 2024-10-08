import axios from "axios";

const API_URL = "https://book-reading-backend.onrender.com/api/auth/";

class AuthService {

  //ログイン処理
  login(username, password, setCurrentUser, navigate, setErrorMsg) {
    axios
      .post(API_URL + "signin", {
        username,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "https://book-reading-backend.onrender.com",
      }})
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response.data);
          setCurrentUser(response.data);
          setErrorMsg("");
          navigate("/");
        }
      })
      .catch((e) => {
        if (e.response) {
          // サーバーからのレスポンスがある場合
          if (e.response.status === 400) {
            setErrorMsg(e.response.data.message);
          }
        }
      });
  }

  //ログアウト処理
  logout(setCurrentUser, navigate) {
    setCurrentUser({});
    navigate("/login");
  }

  //新規登録+
  register(username, email, password, setCurrentUser, navigate, setErrorMsg) {
    return axios
      .post(API_URL + "signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response.data);
          setCurrentUser(response.data);
          setErrorMsg("");
          navigate("/");
        }
      })
      .catch((e) => {
        // console.log(e.response.data);
        if (e.response) {
          // サーバーからのレスポンスがある場合
          if (e.response.status === 400) {
            setErrorMsg(e.response.data.message);
            navigate("/signup");
          }
        }
      });
  }
}

export default new AuthService();
