import { observer } from "mobx-react-lite";
import { DataGrid } from "@mui/x-data-grid";
import { FC, useEffect } from "react";
import tableStore from "../../stores/tableStore";

import { useNavigate } from "react-router-dom";
import loginStore from "../../stores/loginStore";

import { getColumns } from "./utils/tableColumns";

const Table: FC = () => {
  const navigate = useNavigate();

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
      <DataGrid
        rows={tableStore.tableData}
        columns={getColumns(tableStore.deleteTableRecord)}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        loading={tableStore.isDataLoading}
        getRowId={(row) => row.id }
        disableRowSelectionOnClick
        showColumnVerticalBorder
      />
    </div>
  );
};

export default observer(Table);
