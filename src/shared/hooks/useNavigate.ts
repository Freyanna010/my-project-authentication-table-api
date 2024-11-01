// TODO:🦄правильно расположен файл? хук использую в нескольких местах
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginStore } from "../../modules/Auth";

export const useNavigateOnAuth = (authPath: string, unauthPath: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStore.isUserAuth) {
      navigate(authPath);
    } else {
      navigate(unauthPath);
    }
  }, [loginStore.isUserAuth, navigate, authPath, unauthPath]);
};
