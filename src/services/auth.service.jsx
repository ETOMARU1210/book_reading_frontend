const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    axios
    .post(API_AUTH + "signin", {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password ) {
    return axios.post(API_URL + "signup", {
      username,
      email, 
      password
    }) .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();