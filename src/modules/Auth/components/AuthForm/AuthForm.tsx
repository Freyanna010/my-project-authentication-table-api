import { ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import { useForm, useFormState } from "react-hook-form";
import { themeForm } from "../../../../shared/styles/theme/theme";
import classes from "./AuthForm.module.css";
import loginStore from "../../stores/loginStore/loginStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import InputName from "../InputName";
import InputPassword from "../InputPassword";

//TODO:вынести
 export type Input = {
  name: string;
  password: string;
};

const AuthForm: FC = () => {
  const { handleSubmit, control, setValue } = useForm<Input>({
    mode: "onBlur",
  });
  const { errors } = useFormState({ control });
  const navigate = useNavigate();

  const onSubmit = async (data: Input) => {
    try {
      await loginStore.getResponseFromServer(data.name, data.password);
      if (loginStore.token) {
        navigate("/");
        console.log(loginStore.token);
      } else {
        navigate("/error");
        console.log(loginStore.token);
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    } finally {
      setValue("name", "");
      setValue("password", "");
    }
  };

  return (
    <ThemeProvider theme={themeForm}>
      <div className={classes.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputName control={control} errors={errors} />
          <InputPassword control={control} errors={errors} />
          <input type="submit" value="login" />
        </form>
      </div>
    </ThemeProvider>
  );
};

export default observer(AuthForm);
