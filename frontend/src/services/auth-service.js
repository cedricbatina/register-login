import http from "../http-common";

class AuthService {
  // post user infos (name email and password) i should erase first and last names on my code, got to keep it quite easy
  login(user) {
    return http
      .post("/login", {
        name: user.name,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    return http.post("/signup", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
