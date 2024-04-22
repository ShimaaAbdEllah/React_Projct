import React, { useState } from "react";
import NavBar from "../components/navBar.jsx";
import Posts from "../components/posts.jsx";
import Dial from "../components/add.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div>
          <NavBar />
          <Posts posts={posts} setPosts={setPosts} />
        </div>
        <Dial posts={posts} setPosts={setPosts} />
      </div>
    </>
  );
}
