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
  paymentError = "";
  responseInfo = "";
  userPoints = 0;

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
      this.setResponseInfo(response.statusText);
    } catch (error) {
      this.setResponseInfo(error.response.data.message);
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
  setPaymentError(error) {
    this.paymentError = error;
  }
  setUserPoints(points) {
    this.userPoints = points;
  }
  setResponseInfo(info) {
    this.responseInfo = info;
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
      const response = await $api.get(`${API_URL}/events`);

      if (response.data.length !== this.eventList.length) {
        this.eventList = [];
        response.data.forEach((obj) => {
          this.eventList.push({
            start: moment(obj.start).toDate(),
            end: moment(obj.end).toDate(),
            title: obj.title,
            description: obj.description,
            resource: { color: obj.resource.color, id: obj.id },
          });
        });
      }
    } catch (e) {
      console.warn(e);
    }
  }
  async signUpEvent(eventId, userId) {
    try {
      const response = await $api.post(`${API_URL}/user/event/signup`, {
        user_id: userId,
        event_id: eventId,
      });
      this.setResponseInfo(response.statusText);
      console.log(response.statusText);
    } catch (error) {
      this.setResponseInfo(error.response.data.message);
      console.log(error);
    }
  }
  async getAllUsers() {
    try {
      const response = await $api.get(`${API_URL}/adm/getall`);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllSignUp(userId) {
    try {
      const response = await $api.get(`${API_URL}/user/event/signup/${userId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllUsersById(eventId) {
    try {
      const response = await $api.get(`${API_URL}/events/${eventId}`);

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

      this.setResponseInfo(response.statusText);
      console.log(response.statusText);
    } catch (error) {
      this.setResponseInfo(error.response.data.message);
      console.log(error);
    }
  }
  async getAllSignUpUser(userId) {
    try {
      const response = await $api.get(
        `${API_URL}/user/events/signed/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllVisitsUser(userId) {
    try {
      const response = await $api.get(
        `${API_URL}/user/events/visited/${userId}`
      );
      return response.data;
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
  async postComment(eventId, userId, comment) {
    try {
      const response = await $api.post(`${API_URL}/user/event/comment`, {
        event_id: eventId,
        user_id: userId,
        comment: comment,
      });
      this.setResponseInfo(response.statusText);
    } catch (error) {
      this.setResponseInfo(error.response.data.message);
      console.log(error);
    }
  }
  async getAllComments(eventId) {
    try {
      console.warn(eventId);
      const response = await $api.get(`${API_URL}/events/comments/${eventId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async addSubj(itemName, cost) {
    try {
      const response = await $api.post(`${API_URL}/adm/product`, {
        name: itemName,
        price: cost,
      });
      this.setResponseInfo(response.statusText);
    } catch (error) {
      this.setResponseInfo(error.response.data.message);
      console.log(error);
    }
  }
  async getProducts() {
    try {
      const response = await $api.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async buyProduct(productId, userId) {
    try {
      const response = await $api.post(`${API_URL}/product/buy`, {
        product_id: productId,
        user_id: userId,
      });
      this.setResponseInfo(response.statusText);
      console.log(response.statusText);
    } catch (error) {
      this.setResponseInfo(error.response.data.message);
      console.log(error);
    }
  }
  async getLidderBoard() {
    try {
      const response = await $api.get(`${API_URL}/leaderboard`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getMyPoints(userId) {
    try {
      const response = await $api.get(`${API_URL}/user/${userId}`);
      this.setUserPoints(response.data.points);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Store();
