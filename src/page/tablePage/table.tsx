import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId, GridToolbar } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import tableStore from "./stores/tableStore";
import { Button, TextField, Box, CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { TableRecord } from "../../stores/tableStore/tableStore";

const Table = () => {
const [TableRecord, setTableRecord] = useState({
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
});

const [isChangeModalOpen, setisChangeMadalOpen] = useState(false);
const [changeRecordinMadal, setChangeInMadal] = useState <TableRecord | null>(null);

useEffect(() => {
    const loadData = async () => {
    await tableStore.getDataForTable();
    //TODO: если при первой загрузке пришли какие-то данные с сервера - отобразить их в первой строке
    if (tableStore.tableData.length > 0) {
        const firstRow = tableStore.tableData[0];
        setTableRecord({
        companySigDate: firstRow.companySigDate || "",
        companySignatureName: firstRow.companySignatureName || "",
        documentName: firstRow.documentName || "",
        documentStatus: firstRow.documentStatus || "",
        documentType: firstRow.documentType || "",
        employeeNumber: firstRow.employeeNumber || "",
        employeeSigDate: firstRow.employeeSigDate || "",
        employeeSignatureName: firstRow.employeeSignatureName || "",
        });
    }
    };
    loadData();
}, []);



return <div></div>;
};

export default observer(Table);
