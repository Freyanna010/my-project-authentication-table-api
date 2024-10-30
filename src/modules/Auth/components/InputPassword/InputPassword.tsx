import { FC, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { passwordValidation } from "../../utils/validation";
import { Input } from "../AuthForm/AuthForm";

type Props = {
  control: Control<Input>;
  errors: FieldErrors<Input>;
};

const inputPassword: FC<Props> = ({ control, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      control={control}
      name="password"
      rules={passwordValidation}
      render={({ field }) => (
        <TextField
          label="password"
          variant="outlined"
          fullWidth
          margin="dense"
          type={showPassword ? "text" : "password"}
          onChange={(e) => field.onChange(e)}
          value={field.value}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default inputPassword;
