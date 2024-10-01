import { observer } from "mobx-react-lite";
import { DataGrid, GridColDef, GridCellParams} from "@mui/x-data-grid";
import { FC, useEffect } from "react";
import tableStore from "../../stores/tableStore";
import dayjs from 'dayjs'

const columns: GridColDef[] = [
  {
    field: "companySigDate",
    headerName: "Company Sig Date",
    width: 180,
    valueFormatter: (params: GridCellParams) =>
        dayjs(params.value).format('DD.MM.YYYY HH:mm'),
  },
  {
    field: "companySignatureName",
    headerName: "Company Signature Name",
    width: 220,
  },
  { field: "documentName", headerName: "Document Name", width: 180 },
  { field: "documentStatus", headerName: "Document Status", width: 180 },
  { field: "documentType", headerName: "Document Type", width: 180 },
  { field: "employeeNumber", headerName: "Employee Number", width: 180 },
  {
    field: "employeeSigDate",
    headerName: "Employee Sig Date",
    width: 180,
    valueFormatter: (params: GridCellParams) =>
        dayjs(params.value).format('DD.MM.YYYY HH:mm'),
  },
  {
    field: "employeeSignatureName",
    headerName: "Employee Signature Name",
    width: 220,
  },
];

const Table: FC = () => {
  useEffect(() => {
    tableStore.getDataForTable();
  }, [tableStore.getDataForTable]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableStore.tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={tableStore.isDataLoading}
        getRowId={(row) => row.id}
        disableSelectionOnClick
        showColumnVerticalBorder
      />
    </div>
  );
};

export default observer(Table);

