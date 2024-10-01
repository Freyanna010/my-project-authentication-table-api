import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId, GridToolbar } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import tableStore from "./stores/tableStore";
import { Button, TextField, Box, CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Table = () => {
const [TableRow, setTableRow] = useState({
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
});



return <div></div>;
};

export default observer(Table);
