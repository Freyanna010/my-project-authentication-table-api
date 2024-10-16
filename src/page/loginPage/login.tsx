import { ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import { useForm, useFormState } from "react-hook-form";
import { themeForm } from "../../theme/theme";
import classes from "./login.module.css";
import InputName from "./InputName";
import InputPassword from "./InputPassword";
import loginStore from "../../stores/loginStore/loginStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

type Input = {
  name: string;
  password: string;
};

const Login: FC = () => {
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
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setValue("name", "");
      setValue("password", "");
    }
  };

  return (
    // TODO: добавить  какую-то штучку  для загрузки + div  c сообщением об ошибки
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

export default observer(Login);
