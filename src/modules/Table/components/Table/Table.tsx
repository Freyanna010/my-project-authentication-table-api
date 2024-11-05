import { observer } from "mobx-react-lite";
import { DataGrid } from "@mui/x-data-grid";
import { FC, useEffect } from "react";
import tableStore from "../../stores/tableStore";

import { useNavigate } from "react-router-dom";
import loginStore from "../../../Auth/stores/loginStore";

import { getColumns } from "../../utils/tableColumns";
import { useNavigateOnAuth } from "../../../../shared/hooks/useNavigate";

const Table: FC = () => {
  // useNavigateOnAuth("/table", "/login");

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
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        showColumnVerticalBorder
      />
    </div>
  );
};

export default observer(Table);
