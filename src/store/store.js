import { makeAutoObservable } from "mobx";
import AuthServices from "../services/AuthServices";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
  user = {};
  isAuth = false;
  errorMessage = "";
  doneMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
  }
  setDoneMessage(doneMessage) {
    this.doneMessage = doneMessage;
  }
  async login(email, password) {
    try {
      const response = await AuthServices.login(email, password);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setErrorMessage("");
      this.setDoneMessage("Готово");
    } catch (e) {
      this.setErrorMessage(e.response.data.message);
      this.setDoneMessage("");
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

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setDoneMessage("Готово");
    } catch (e) {
      console.log(e);
      this.setErrorMessage(e.response.data.message);
      this.setDoneMessage("");
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
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.warn(e);
    }
  }
}
