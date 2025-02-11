import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

function TaskCard({
  title,
  category,
  description,
  dueDate,
  createdAt,
  getTaskColor,
  onClickDelete,
  onClickMarkDone,
  isDone,
}) {
 

  const displayCreatedAt = createdAt || "N/A";
  const displayDueDate = dueDate || "N/A";

  return (
    <Card
      sx={{
        width: "17em",
        mb: 1,
        border: isDone ? "2px solid #3e9c05" : `2px solid ${getTaskColor()}`,
        borderRadius: "10px",
        boxShadow: "none",
      }}
    >
      <CardHeader
        action={
          <>
            <IconButton
              title="Delete Task"
              aria-label="delete"
              size="large"
              onClick={onClickDelete}
            >
              <DeleteIcon
                fontSize="inherit"
                style={{ color: "#ff570f" }}
              />
            </IconButton>
            <IconButton
              aria-label="done"
              size="large"
              title="Mark as completed"
              onClick={onClickMarkDone} 
            >
              <DoneOutlineRoundedIcon
                fontSize="inherit"
                style={{ color: "#3e9c05", zIndex: "1" }}
              />
            </IconButton>
          </>
        }
        title={title || "Untitled Task"}
        subheader={`Created: ${displayCreatedAt}`}
      />
      <CardContent>
        <CircleIcon
          style={{
            color: isDone ? "#3e9c05" : getTaskColor(), 
          }}
        />
        <Typography variant="h6" component="div">
          {category || "No Category"}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {description || "No Description"}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Due Date:</strong> {displayDueDate}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
