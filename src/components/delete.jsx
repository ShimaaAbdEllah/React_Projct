import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteComponent({ postId, onDelete, posts, setPosts }) {
  const deletePost = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await axios.delete(`http://localhost:3000/posts/${postId}`);
      const responseToGetUserPosts = await axios.get(
        `http://localhost:3000/users?id=${userId}`
      );
      const userPosts = responseToGetUserPosts.data[0].postsOfUser;
      console.log(userPosts, postId);
      const responseToRemovePostFromUser = await axios.patch(
        `http://localhost:3000/users/${userId}`,
        {
          postsOfUser: userPosts.filter((post) => post !== postId),
        }
      );
      onDelete(postId);
      toast.success("Deleted post successfull");
      let newPosts = posts.filter((post) => post.id !== postId);
      setPosts([...newPosts]);
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
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Stack>
    </div>
  );
}
