import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Modal, Typography, Input, InputAdornment } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faImage } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function OpenIconSpeedDial({ onPostSuccess, posts, setPosts }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setBlogTitleValues({ blogTitle: "" });
    setBlogImageValues({ blogImg: "" });
    setDescriptionValues({ description: "" });
  };

  const [blogTitleValues, setBlogTitleValues] = useState({
    blogTitle: "",
  });

  const handleBlogTitleChange = (event) => {
    setBlogTitleValues({
      ...blogTitleValues,
      blogTitle: event.target.value,
    });
  };

  const [blogImageValues, setBlogImageValues] = useState({
    blogImg: "",
  });

  const handleBlogImageChange = (event) => {
    setBlogImageValues({
      ...blogImageValues,
      blogImg: event.target.value,
    });
  };

  const [descriptionValues, setDescriptionValues] = useState({
    description: "",
  });

  const handleDescriptionChange = (event) => {
    setDescriptionValues({
      ...descriptionValues,
      description: event.target.value,
    });
  };

  const [blogData, setBlogData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!blogTitleValues.blogTitle) {
      alert("Title is required!");
      return;
    }

    if (!blogImageValues.blogImg) {
      alert("Image is required!");
      return;
    }

    if (!descriptionValues.description) {
      alert("Description is required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/posts", {
        title: blogTitleValues.blogTitle,
        image: blogImageValues.blogImg,
        description: descriptionValues.description,
      });

      const blog = response.data;
      setBlogData(blog);
      // setPosts([...posts, blog]);
      console.log(posts, blog);
      const existingPostIds =
        JSON.parse(sessionStorage.getItem("postId")) || [];
      existingPostIds.push(blog.id);
      sessionStorage.setItem("postId", JSON.stringify(existingPostIds));

      // toast.success("Post blog successfull");
      handleClose();

      if (onPostSuccess) {
        onPostSuccess(blog);
      }
    } catch (error) {}
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
      <div>
        <Box
          onClick={handleOpen}
          sx={{
            transform: "translateZ(0px)",
            flexGrow: 1,
            position: "fixed",
            bottom: 25,
            right: 20,
          }}
        >
          <SpeedDial
            ariaLabel=""
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            FabProps={{
              sx: {
                bgcolor: "blue",
                "&:hover": {
                  bgcolor: "#172554",
                },
              },
            }}
          ></SpeedDial>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleSubmit}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-center "
              >
                Share your blog
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="blogTitle">Blog Title</label>
              </Typography>
              <Input
                type="text"
                placeholder="Title"
                name="blogTitle"
                value={blogTitleValues.blogTitle}
                onChange={handleBlogTitleChange}
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
                name="blogImg"
                value={blogImageValues.blogImg}
                onChange={handleBlogImageChange}
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
                name="blogDescription"
                value={descriptionValues.description}
                onChange={handleDescriptionChange}
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
                value="Post Now"
              />
            </Box>
          </form>
        </Modal>
      </div>
    </>
  );
}
