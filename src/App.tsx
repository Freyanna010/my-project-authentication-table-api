import  { FC, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { loginStore } from "./modules/Auth";
import TablePage from "./pages/TablePage";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";

const App: FC = () => {
  useEffect(() => {
    loginStore.getTokenFromLocalStorage();
  }, []);

  return (
    <div>
      {loginStore.loadingPage ? (
        <div>
          {/* TODO:сделать красивую штучку */}
          <p>идет загрузка приложения</p>
        </div>
      ) : (
        // TODO:Нужно?
        // ) : !loginStore.isAuthInitialized ? (
        //   <div>Проверка аутентификации.Подождите пожалуйста.</div>
        <Routes>
          <Route
            path="/"
            element={
              loginStore.isUserAuthenticated ? <TablePage /> : <AuthPage />
            }
          />
          <Route path="/login" element={<AuthPage />} />
          {/* TODO: перделать в div */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      )}
    </div>
  );
};
export default observer(App);
