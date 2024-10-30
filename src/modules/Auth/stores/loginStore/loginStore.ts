import axios from "axios";
import { makeObservable, observable, action } from "mobx";
class LoginStore {
  token: string | null = null;
  isUserAuthenticated = false;
  isAuthInitialized = false;
  loadingPage = false;
  errorMessage: string | null = null;

  constructor() {
    makeObservable(this, {
      token: observable,
      isUserAuthenticated: observable,
      isAuthInitialized: observable,
      loadingPage: observable,
      errorMessage: observable,
      getTokenFromLocalStorage: action,
      getResponseFromServer: action,
    });
  }

  getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
      this.isUserAuthenticated = true;
    }
    // TODO:Нужно?
    // this.isAuthInitialized = true;
  };

  getResponseFromServer = async (username: string, password: string) => {
    this.loadingPage = true;
    const url =
      "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login";
    try {
      const response = await axios.post(url, {
        username,
        password,
      });
      this.token = response.data?.data?.token || null;
      if (this.token) {
        localStorage.setItem("token", this.token);
        this.isUserAuthenticated = true;
        this.errorMessage = null;
      }
    } catch {
      this.errorMessage =
        "Ошибка аутентификации. Введите верные имя пользователя и пароль.";
    } finally {
      this.loadingPage = false;
    }
  };
}
export default new LoginStore();
