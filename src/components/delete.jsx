import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteComponent({ postId, onDelete }) {
  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      onDelete(postId);
      toast.success("Deleted post successfull");
    } catch (error) {
      console.log(error);
      toast.error("Deleted fail");
    }
  };
  return (
    <div className=" bottom-4 relative">
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={deletePost}
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
}
