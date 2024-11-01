import { FC } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { loginStore } from "./modules/Auth";
import TablePage from "./pages/TablePage";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import { useCheckToken } from "./modules/Auth/hooks/useCheckToken";
import { useNavigateOnAuth } from "./shared/hooks/useNavigate";

const App: FC = () => {
  // TODO: 🦄переделала  логику, вынесла хуки. Правильно расположила их по папкам?
  useCheckToken();
  useNavigateOnAuth("/table", "/error");

  return (
    <div>
      {loginStore.loadingPage ? (
        <div>
          <p>идет загрузка приложения</p>
        </div>
      ) : (
        <Routes>
          <Route
            // TODO: 🦄здесь нужно указывать маршрут?
            path="/"
            element={loginStore.isUserAuth ? <TablePage /> : <AuthPage />}
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      )}
    </div>
  );
};
export default observer(App);
