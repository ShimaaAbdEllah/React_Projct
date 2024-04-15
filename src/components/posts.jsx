import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DeleteComponent from "./delete";
import UpdateComponent from "./update";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const fetchedPosts = response.data;

      setPosts(fetchedPosts.reverse());

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 pt-5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col justify-center items-center gap-5 pt-5"
        >
          <div className="">
            <h1 className=" text-3xl w-full text-blue-900">{post.title}</h1>
          </div>
          <div>
            <img src={post.image} alt="" className="rounded-xl " />
          </div>
          <div className=" w-3/6">
            <p>{post.description}</p>
          </div>
          <div className="border-b border-blue-700 w-3/6 opacity-30"></div>
          <div className="flex gap-2">
            {sessionStorage.getItem("postId")?.includes(post.id) && (
              <>
                <DeleteComponent postId={post.id} onDelete={handleDelete} />
                <UpdateComponent postId={post.id} />
              </>
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
