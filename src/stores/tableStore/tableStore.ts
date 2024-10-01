import { makeObservable, observable, action } from "mobx";
import { apiService } from "../../api/apiService";

  export type TableRecord = {
  id?: string
  companySigDate: string ;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;or
  employeeSignatureName: string;
};
type TableData = TableRecord[];

class TableStore {
  isDataLoading = false;
  errorMessage: string | null = null;
  tableData: TableData = [];

  constructor() {
    makeObservable(this, {
      isDataLoading: observable,
      errorMessage: observable,
      tableData: observable,
      getDataForTable: action,
      addNewTableRecord: action,
      changeTableRecord: action,
      deleteTableRecord: action,
      performAction: action,
      getTableDataFromLocalStorage: action,
      saveTableDataToLocalStorage: action
    });
        this.getTableDataFromLocalStorage()
  }

  getTableDataFromLocalStorage() {
    const localTableData = localStorage.getItem("tableData");
    if (localTableData) {
      this.tableData = JSON.parse(localTableData);
    }
  }

  saveTableDataToLocalStorage() {
    localStorage.setItem("tableData", JSON.stringify(this.tableData));
  }

  async performAction<T>(
    action: () => Promise<T>,
    onSuccess?: (data: T) => void
  ) {
    this.isDataLoading = true;
    this.errorMessage = null;

    try {
      const result = await action();
      if (onSuccess) {
        onSuccess(result);
          this.saveTableDataToLocalStorage()
      }
    } catch (error) {
      this.errorMessage = "Произошла ошибка(";
      console.error(error)
    } finally {
      this.isDataLoading = false;
    }
  }

  async getDataForTable() {
    await this.performAction(
      () =>
        apiService.get<{ data: TableData }>(
          "/ru/data/v3/testmethods/docs/userdocs/get"
        ),
      (response) => {
        this.tableData = response.data;
        this.saveTableDataToLocalStorage()
      }
    );
  }

  async addNewTableRecord(newTableRecord: TableRecord) {
    await this.performAction(
      () =>
        apiService.post(
          "/ru/data/v3/testmethods/docs/userdocs/create",
          newTableRecord
        ),
      () => this.getDataForTable()
    );
  }

  async changeTableRecord(updatedDocument: TableRecord) {
    await this.performAction(
      () =>
        apiService.put(
          `/ru/data/v3/testmethods/docs/userdocs/update/${updatedDocument.id}`,
          updatedDocument
        ),
      () => this.getDataForTable()
    );
  }

  async deleteTableRecord(tableRecordId: string) {
    await this.performAction(
      () =>
        apiService.delete(
          `/ru/data/v3/testmethods/docs/userdocs/delete/${tableRecordId}`
        ),
      () => this.getDataForTable()
    );
  }
}
export default new TableStore();
