import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardHeader,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

interface Props {
  title: string;
  createdOn: string;
  description: string;
  onCompleted: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const TodoCard = ({
  title,
  createdOn,
  description,
  onCompleted,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <Card sx={{ width: "100%", marginBottom: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="edit" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        }
        title={title}
        subheader={format(new Date(createdOn), "MMMM dd, yyyy")}
      />

      <CardContent>
        <Typography variant="body1">{description}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="complete" onClick={onCompleted} color="success">
          <CheckIcon />
        </IconButton>

        <IconButton aria-label="delete" onClick={onDelete} color="error">
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
