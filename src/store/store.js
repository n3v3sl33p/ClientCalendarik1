import { action, makeAutoObservable, observable, runInAction } from "mobx";

import AuthServices from "../services/AuthServices";
import axios from "axios";
import { API_URL } from "../http";
import moment from "moment";
import $api from "../http";

class Store {
  user = {};
  users = [];
  isAuth = false;
  errorMessage = "";
  eventList = [];
  signUpError = "";

  constructor() {
    this.user = {};
    this.isAuth = false;
    this.errorMessage = "";
    this.eventList = [];
    makeAutoObservable(this);
  }

  async addEvent(event) {
    try {
      const response = await $api.post(`${API_URL}/events`, event);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEvent(id) {
    try {
      console.log(id);
      const response = await $api.delete(`${API_URL}/events/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
  setSignUpError(errorMessage) {
    this.signUpError = errorMessage;
  }
  async login(email, password) {
    try {
      const response = await AuthServices.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setErrorMessage("");
    } catch (e) {
      console.log(e);
      this.setErrorMessage(e.response.data.message);
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
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setErrorMessage("");
    } catch (e) {
      console.log(e);
      this.setErrorMessage(e.response.data.message);
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

  async getAllEvent() {
    try {
      const response = await axios.get(`${API_URL}/events`);

      if (response.data.length !== this.eventList.length) {
        this.eventList = [];
        response.data.forEach((obj) => {
          this.eventList.push({
            start: moment(obj.start).toDate(),
            end: moment(obj.end).toDate(),
            title: obj.title,
            resource: { color: obj.resource.color, id: obj.id },
          });
        });

        console.log("update");
      }
    } catch (e) {
      console.warn(e);
    }
  }
  async signUpEvent(eventId, userId) {
    console.log(eventId, userId);
    try {
      const response = await $api.post(`${API_URL}/user/event/signup`, {
        user_id: userId,
        event_id: eventId,
      });
      console.log(response);
    } catch (error) {
      this.setSignUpError(error.response.data.message);

      console.log(error);
    }
  }
  async getAllUsers() {
    try {
      const response = await $api.get(`${API_URL}/adm/getall`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllSignUp(userId) {
    try {
      const response = await $api.get(`${API_URL}/user/event/signup/${userId}`);
      return response;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllUsersById(eventId) {
    try {
      const response = await $api.get(`${API_URL}/events/${eventId}`);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async markVisit(eventId, userId, condition) {
    try {
      const response = await $api.patch(`${API_URL}/adm/setVisited`, {
        event_id: eventId,
        user_id: userId,
        visited: condition,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getPersoneScore(userId) {
    try {
      const response = await $api.get(`${API_URL}/user/${userId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Store();
