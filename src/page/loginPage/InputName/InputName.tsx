import { observer } from "mobx-react-lite";
import { FC } from "react";
import {
  Controller
} from "react-hook-form";
import { NameValidation } from "../validation";
import { TextField } from "@mui/material";

type Props = {
  control: any;
  errors: any;
};

const InputName: FC<Props> = ({ control, errors }) => {
  return (
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
};

export default InputName;
