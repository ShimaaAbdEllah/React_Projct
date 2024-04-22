import { React, useState, useEffect } from "react";
import axios from "axios";
import DeleteComponent from "./delete";
import UpdateComponent from "./update";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Posts({ posts, setPosts }) {
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function getAllPosts() {
      setLoading(true);

      const { data } = await axios.get("http://localhost:3000/posts");
      setLoading(false);
      setPosts(data);
    }

    getAllPosts();
  }, []);

  useEffect(() => {
    async function getUserPosts() {
      const response = await axios.get(
        `http://localhost:3000/users?id=${userId}`
      );
      setMyPosts(response.data[0].postsOfUser);
    }

    getUserPosts();
  }, [posts]);

  const handleDelete = async (deletedPostId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${deletedPostId}`);
      handleDelete(deletedPostId);
      let newPosts = posts.filter((post) => post.id !== deletedPostId);
      setPosts(newPosts);
      toast.success("Post deleted successfully.");
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 pt-5">
      {loading ? (
        <>
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col justify-center items-center gap-5 pt-5">
            <div>
              <img src={post.image} alt="" className="rounded-xl" />
            </div>
            <div className="">
              <h1 className="text-3xl w-full text-blue-900">{post.title}</h1>
            </div>
            <div className="w-3/6">
              <p>{post.description}</p>
            </div>
            <div className="border-b border-blue-700 w-3/6 opacity-30"></div>
            <div className="flex gap-2">
              {myPosts.includes(post.id) && (
                <>
                  <DeleteComponent
                    postId={post.id}
                    onDelete={handleDelete}
                    posts={posts}
                    setPosts={setPosts}
                    currentUser={post.userId}
                  />
                  <UpdateComponent postId={post.id} currentUser={post.userId} />
                </>
              )}
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
