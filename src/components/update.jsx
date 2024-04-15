import * as React from "react";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Stack from "@mui/material/Stack";
import { Modal, Typography, Input, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function updateComponent({ postId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getPost(postId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [post, setPost] = React.useState({
    title: "",
    image: "",
    description: "",
  });

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      const fetchedPost = response.data;

      setPost({
        title: fetchedPost.title,
        image: fetchedPost.image,
        description: fetchedPost.description,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/posts/${postId}`, post);
      toast.success("Update post successfull");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Update fail");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "3px solid blue",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <ToastContainer />
      <div className=" bottom-4 relative">
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditNoteIcon />}
            onClick={handleOpen}
          >
            Edit
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleUpdate}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-center "
              >
                Edit your blog
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="blogTitle">Blog Title</label>
              </Typography>
              <Input
                type="text"
                placeholder="Title"
                name="title"
                value={post.title}
                onChange={handleInputChange}
                className="input border-b border-blue-950 w-full"
                endAdornment={
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faPen} />
                  </InputAdornment>
                }
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="blogImg">Blog Image</label>
              </Typography>
              <Input
                type="text"
                placeholder="URL image"
                name="image"
                value={post.image}
                onChange={handleInputChange}
                className="input border-b border-blue-950 w-full"
                endAdornment={
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faImage} />
                  </InputAdornment>
                }
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="blogDescription">Description</label>
              </Typography>
              <Input
                type="text"
                placeholder="Description"
                name="description"
                value={post.description}
                onChange={handleInputChange}
                className="input border-b border-blue-950 w-full"
                endAdornment={
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faInfo} />
                  </InputAdornment>
                }
              />
              <input
                className="bg-blue-700 text-slate-50 h-10 w-full mt-2 rounded-3xl hover:bg-blue-950 hover:shadow"
                type="submit"
                value="Save Changes"
              />
            </Box>
          </form>
        </Modal>
      </div>
    </>
  );
}
