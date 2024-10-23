// src/utils/tableColumns.ts
import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import ActionCell from "../ActionCell";

// TODO:перенести файл?
// TODO:перенести фкнкци?

const createTextColumn = (field: string, headerName: string, width: number = 180): GridColDef => ({
  field,
  headerName,
  width,
});
const createActionsColumn = (deleteRecord: (id: string) => void): GridColDef => ({
  field: "actions",
  headerName: "Actions",
  width: 100,
  renderCell: (params: GridCellParams) => (
    <ActionCell id={params.id as string} onDelete={deleteRecord} />
  ),
  sortable: false,
  filterable: false,
});
const createDateColumn = (field: string, headerName: string): GridColDef => ({
  field,
  headerName,
  width: 220,
  valueFormatter: (params: GridCellParams) => {
    const dateValue = params.value as string | undefined;
    return dateValue ? dayjs(dateValue).format("DD.MM.YYYY HH:mm") : "";
  },
});


export const getColumns = (deleteRecord: (id: string) => void): GridColDef[] => [
  createDateColumn("companySigDate", "Company Sig Date"),
  createTextColumn("companySignatureName", "Company Signature Name", 220),
  createTextColumn("documentName", "Document Name"),
  createTextColumn("documentStatus", "Document Status"),
  createTextColumn("documentType", "Document Type"),
  createTextColumn("employeeNumber", "Employee Number"),
  createDateColumn("employeeSigDate", "Employee Sig Date"),
  createTextColumn("employeeSignatureName", "Employee Signature Name", 220),
  createActionsColumn(deleteRecord),
];
