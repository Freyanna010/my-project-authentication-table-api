import { observer } from "mobx-react-lite";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { FC, useEffect } from "react";
import tableStore from "../../stores/tableStore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import loginStore from "../../stores/loginStore";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  // TODO:вынести?
  {
    field: "companySigDate",
    headerName: "Company Sig Date",
    width: 220,
    valueFormatter: (params: GridCellParams) => {
      //TODO: не работает
      const dateValue = params.value as string | undefined;
      return dateValue ? dayjs(dateValue).format("DD.MM.YYYY HH:mm") : "";
    },
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
    width: 220,
    valueFormatter: (params: GridCellParams) => {
      const dateValue = params.value as string | undefined;
      return dateValue ? dayjs(dateValue).format("DD.MM.YYYY HH:mm") : "";
    },
  },
  {
    field: "employeeSignatureName",
    headerName: "Employee Signature Name",
    width: 220,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params: GridCellParams) => (
      <IconButton color="error" aria-label="delete"
      onClick={() => tableStore.deleteTableRecord(params.id as string)} >
        <DeleteIcon />
      </IconButton>
    ),
    sortable: false,
    filterable: false,
  },
];

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
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        loading={tableStore.isDataLoading}
        getRowId={(row) => row.id as string}
        disableRowSelectionOnClick
        showColumnVerticalBorder
      />
    </div>
  );
};

export default observer(Table);
