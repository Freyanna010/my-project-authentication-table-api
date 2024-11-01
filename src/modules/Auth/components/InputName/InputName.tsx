import { FC } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { NameValidation } from "../../utils/validation";
import { Input } from "../AuthForm/AuthForm";

type Props = {
  control: Control<Input>;
  errors: FieldErrors<Input>;
};

const InputName: FC<Props> = ({ control, errors }) => (
  <Controller
    control={control}
    name="name"
    rules={NameValidation}
    render={({ field }) => (
      <TextField
        label="name"
        variant="outlined"
        fullWidth
        margin="dense"
        onChange={(e) => field.onChange(e)}
        value={field.value}
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />
    )}
  />
);

export default InputName;
