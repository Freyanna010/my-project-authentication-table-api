 import { grey, pink } from "@mui/material/colors";
import { createTheme} from "@mui/material/styles";

 export const themeForm = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    error: {
      main: pink[500],
    },
  },
});
