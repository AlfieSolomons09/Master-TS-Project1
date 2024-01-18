import { Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ) => void;
};


const TodoItem = ({
  completeHandler,
  deleteHandler,
  todo,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);
  const [buttonText, setButtonText] = useState("Edit");


  const handleButtonClick = ()=>{
    setEditActive((edit) => !edit)

    if(buttonText == "Done"){
      editHandler(todo.id, textVal);
    }

    setButtonText(() => (editActive ? "Edit" : "Done"));
  }

  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal !== "") {
                editHandler(todo.id, textVal);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button
          onClick={() => deleteHandler(todo.id)}
          sx={{ opacity: 0.5, color: "black" }}
        >
          <Delete />
        </Button>
        <Button
          sx={{
            fontWeight: "600",
          }}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
