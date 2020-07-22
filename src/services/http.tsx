import axios from "axios";
import settings from "../settings";
import { history } from "../App";
import { config } from "process";

const REQUEST_METHOD = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};

/**
 * @class
 * @description This service class handles all REST Calls
 */

class HttpServiceClass {
  service: any;
  /**
   * @function
   * @description Init the axios library and register the interceptors.
   */
  constructor() {
    this.service = axios.create({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    // The AuthToken is set after login. If the user was already loaded on init, we need to set it.
    if (localStorage.getItem("authToken")) {
      this.setAuthToken(localStorage.getItem("authToken"), true);
    } else if (sessionStorage.getItem("authToken")) {
      this.setAuthToken(sessionStorage.getItem("authToken"));
    }
  }

  /**
   * @function
   * @description Set the auth token in the request header. Call this after successful login.
   * @param {string} token is a token string.
   * @param {boolean} stayLoggedIn logged in.
   */
  setAuthToken = (token, stayLoggedIn = false) => {
    this.service.defaults.headers.common.Authorization = token
      ? `Token ${token}`
      : "";

    if (stayLoggedIn) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }
  };

  /**
   * @function
   * @description Removes the auth token in the header. Call this after logout.
   */
  removeAuthToken = () => {
    delete this.service.defaults.headers.common.Authorization;
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  };

  /**
   * @function
   * @description Handles unauthorized request, redirects to login
   */
  unauthorizedHandler = () => {
    this.removeAuthToken();
    if (window.location.pathname !== "/") {
      history.push("/login/");
    }
    // Possibly routing to login
  };

  /**
   * @description Method to handle the request by method.
   * @param method {string} th request method type.
   * @param {string} path A relative path that comes after the API URL defined in settings.js, e.g. "reports"
   * @param {*} data is an object with API data.
   * @param {*} params is an object with API params.
   * @param {boolean} noCache is a boolean to whether add a time stamp or not
   * @return {Promise<AxiosResponse<any>>}
   */
  handleRequest = (method, path, data = {}, params = {}, noCache = false) => {
    const authToken = storedAuthToken();
    return this.service
      .request({
        url: `${settings.REACT_APP_API_URL}${path}`,
        method,
        data,
        params: {
          ...params,
          master: settings.API_KEY,
          ts: noCache ? Date.now() : null,
        },
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
      })
      .catch(this.handleError);
  };
  /**
   * @function
   * @description Interceptor for the error response
   * @param {Object} error is a object with the error response from API.
   * @return {*}
   */
  handleError = (error) => {
    console.error(error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.unauthorizedHandler();
          break;
        default:
          break;
      }

      return Promise.reject(error);
    }

    // Possibly toaster or log error

    return Promise.reject(error);
  };

  /**
   * @function
   * @description Fires the get request
   * @param {string} path is a string of API path.
   * @param {*} params is an object with API params.
   * @param {boolean} noCache is a boolean to whether add a time stamp or not
   * @return {*}
   */
  get = (path, params = {}, noCache = false) =>
    this.handleRequest(REQUEST_METHOD.GET, path, {}, params, noCache);

  /**
   * @function
   * @description Fires the patch request
   * @param {string} path A relative path that comes after the API URL defined in settings.js, e.g. "reports"
   * @param {Object} data is an object to submit to API.
   * @return {*}
   */
  patch = (path, data) => this.handleRequest(REQUEST_METHOD.PATCH, path, data);

  /**
   * @function
   * @description Fires the put request
   * @param {string} path A relative path that comes after the API URL defined in settings.js, e.g. "reports"
   * @param {Object} data is an object to submit to API.
   * @return {*}
   */
  put = (path, data) => this.handleRequest(REQUEST_METHOD.PUT, path, data);

  /**
   * @function
   * @description Fires the put request
   * @param {string} path A relative path that comes after the API URL defined in settings.js, e.g. "reports"
   * @param {Object} data is an object to submit to API.
   * @return {*}
   */
  post = (path, data) => this.handleRequest(REQUEST_METHOD.POST, path, data);

  /**
   * @function
   * @description Fires the put request
   * @param {string} path A relative path that comes after the API URL defined in settings.js, e.g. "reports"
   * @param {Object} data is an object to submit to API.
   * @return {*}
   */
  delete = (path, data) =>
    this.handleRequest(REQUEST_METHOD.DELETE, path, data);
}

export const storedAuthToken = () =>
  localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

const HttpService = new HttpServiceClass();

export default HttpService;
