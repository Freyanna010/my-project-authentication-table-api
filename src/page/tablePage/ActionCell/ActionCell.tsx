import { observer } from "mobx-react-lite";
import { FC } from "react";

//TODO: перенести
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type ActionCellProps = {
  id: string;
  onDelete: (id: string) => void;
}

const ActionCell: FC<ActionCellProps> = (props) => {

 const { id, onDelete } = props

  return (
    <IconButton color="error" aria-label="delete" onClick={() => onDelete(id)}>
    <DeleteIcon />
  </IconButton>
  );
};

export default observer(ActionCell);
