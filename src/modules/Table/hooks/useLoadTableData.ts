import { useEffect } from "react";
import { loginStore } from "../../Auth";
import tableStore from "../stores/tableStore";

export const useLoadTableData = () => {
  useEffect(() => {
    if (loginStore.isUserAuth) {
      tableStore.getDataForTable();
    }
  }, [loginStore.isUserAuth]);
};
