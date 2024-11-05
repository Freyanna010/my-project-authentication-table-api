import axios from "axios";
import { makeObservable, observable, action } from "mobx";
class LoginStore {   
  token: string | null = null;
  isUserAuth = false;
  loadingPage = false;
  errorMessage: string | null = null;

  constructor() {
    makeObservable(this, {
      token: observable,
      isUserAuth: observable,
      loadingPage: observable,
      errorMessage: observable,
      fetchAuthToken: action,
      // getTokenFromLocalStorage: action,
    });
  }

  getTokenFromLocalStorage = () => {
    this.token = localStorage.getItem("token");
    this.isUserAuth = !!this.token;
  };

  // TODO: 🦄изменила название (сделала стрелочной)
  fetchAuthToken = async (username: string, password: string) => {
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
        this.isUserAuth = true;
        this.errorMessage = null;
        window.location.href = "/table"
      }
      // TODO: 🦄Эта проверка обязательна? throw new Error('Ошибка аутентификации'); - можно перенести в axiosInstanse?
      if (response.data.error_code === 2004) {
        throw new Error("Ошибка аутентификации");
      }
    } catch (error) {
      this.errorMessage =
        "Ошибка аутентификации. Введите верные имя пользователя и пароль.";
      throw error;
    } finally {
      this.loadingPage = false;
    }
  };

  // TODO: 🦄добавила для работы загрузки/не загрузки  таблицы уже внутри Table.txt
  logout = () => {
    this.isUserAuth = false;
    this.token = null;
    localStorage.removeItem("token");
    window.location.href = "/login"
  };
}

export default new LoginStore();
