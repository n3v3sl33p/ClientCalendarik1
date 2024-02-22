import { makeAutoObservable } from "mobx";
import AuthServices from "../services/AuthServices";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
  user = {};
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
  async login(email, password) {
    try {
      const response = await AuthServices.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.warn(e);
    }
  }
  async registration(email, password, fullName) {
    try {
      console.log(fullName, password, email);
      const response = await AuthServices.registration(
        email,
        password,
        fullName
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async logout() {
    try {
      const response = await AuthServices.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.warn(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data);
      lo;
    } catch (e) {
      console.log(e.response);
    }
  }
}
