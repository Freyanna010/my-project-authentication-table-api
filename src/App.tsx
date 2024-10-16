import { FC, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import loginStore from "./stores/loginStore";
import Table from "./page/TablePage";
import Error from "./page/ErrorPage/error";
import { observer } from "mobx-react-lite";
import Login from "./page/LoginPage";

const App: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loginStore.token = token;
      loginStore.isUserAuthenticated = true;
      navigate("/table");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      {loginStore.loadingPage ? (
        <div>
          {/* TODO:сделать красивую штучку */}
          <p>идет загрузка</p>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={loginStore.isUserAuthenticated ? <Table /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<Error />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      )}
    </div>
  );
};
export default observer(App);
