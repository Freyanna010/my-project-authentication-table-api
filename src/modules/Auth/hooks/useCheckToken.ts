// TODO: 🦄правильно расположила файл внутри модуля?
import { useEffect } from "react";
import loginStore from "../stores/loginStore";

// TODO: 🦄эта штука правильная? для того чтобы каждый раз не вводить пароль
export const useCheckToken = () => {
  useEffect(() => {
    loginStore.getTokenFromLocalStorage();
  }, []);
};
