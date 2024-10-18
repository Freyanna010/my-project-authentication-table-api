// src/utils/tableColumns.ts
import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const getColumns = (deleteRecord: (id: string) => void): GridColDef[] =>  [
    
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
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => deleteRecord(params.id as string)}
        >
          <DeleteIcon />
        </IconButton>
      ),
      sortable: false,
      filterable: false,
    },
  ];