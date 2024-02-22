import $api from "../http";

export default class AuthServices {
  static async login(email, password, fullName) {
    return $api.post("/auth/login", {
      email: email,
      password: password,
      full_name: fullName,
    });
  }
  static async logout() {
    return $api.post("/logout");
  }
  static async registration(email, password, fullName) {
    return $api.post("/auth/register", {
      email: email,
      password: password,
      full_name: fullName,
    });
  }
}
