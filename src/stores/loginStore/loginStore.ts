import axios from "axios";
import { makeObservable, observable, action } from "mobx";
class LoginStore {
  token: string | null = null;
  isUserAuthenticated: boolean = false;
  loadingPage: boolean = false;
  errorMessage: string | null = null;

  constructor() {
    makeObservable(this, {
      token: observable,
      isUserAuthenticated: observable,
      loadingPage: observable,
      errorMessage: observable,
      getTokenFromLocalStorage: action,
      getResponseFromServer: action,
    });
  }

  getTokenFromLocalStorage() {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      this.token = getToken;
      this.isUserAuthenticated = true;
    }
  }

  async getResponseFromServer(username: string, password: string) {
    this.loadingPage = true;
    const url =
      "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login";
    try {
      const response = await axios.post(url, {
        username,
        password,
      });
      this.token = response.data.token;
      if (this.token) {
        localStorage.setItem("token", this.token);
      }
      this.isUserAuthenticated = true;
      this.errorMessage = null;
    } catch (error) {
      this.errorMessage =
        "Ошибка аутентификации. Введите верные имя пользователя и пароль.";
    } finally {
      this.loadingPage = false;
    }
  }
}
export default new LoginStore();
