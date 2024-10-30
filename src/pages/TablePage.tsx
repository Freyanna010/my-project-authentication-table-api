import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Table, tableStore } from "../modules/Table";
import { loginStore } from "../modules/Auth";

const TablePage: React.FC = () => {
  const navigate = useNavigate();

  //TODO:убрать
  useEffect(() => {
    const token = loginStore.token || localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      tableStore.getDataForTable();
    }
  }, [navigate]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Table />
    </div>
  );
};

export default observer(TablePage);
