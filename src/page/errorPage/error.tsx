import { FC } from "react";
import classes from "./error.module.css";
import { observer } from "mobx-react-lite";
import loginStore from "../../stores/loginStore/loginStore";


const Error: FC = () => {
  return <p>{loginStore.errorMessage}</p>
  // TODO: добавить кнопочку вернуться к логину
};

export default observer(Error);
