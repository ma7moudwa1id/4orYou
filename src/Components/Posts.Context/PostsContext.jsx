import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { userContext } from "../user.context/UserContext";
import { useParams } from "react-router";

export const poststContext = createContext("");

export function PostsContextProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const [updatedID, setUpdatedID] = useState(null);
  const [postDetails, setPostDetails] = useState(null);
  const { token, fetchUserPosts } = useContext(userContext);
  const [postData, setPostData] = useState(null);
  const [freindSuggestion, setFreindSuggestion] = useState(null);

  async function getAllposts() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleDeletePost(postId) {
    try {
      const { data } = await axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        await getAllposts();
        await fetchUserPosts();
        await getPostDetails(postId);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleEditPost(values) {
    try {
      const myform = new FormData();
      if (values.body) {
        myform.append("body", values.body);
      }
      if (values.image) {
        myform.append("image", values.image);
      }
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/posts/${updatedID}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: myform,
      });
      if (data.success) {
        toast.success(data.message);
        getPostDetails(updatedID);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function getPostDetails(id) {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/posts/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setPostDetails(data.data.post);
      }
    } catch (error) {
      console.log({ error });
      setPostDetails(null);
    }
  }

  useEffect(() => {
    if (token) {
      getAllposts();
    }
  }, [token]);

  return (
    <>
      <poststContext.Provider
        value={{
          posts,
          getAllposts,
          handleDeletePost,
          updatedID,
          setUpdatedID,
          handleEditPost,
          postData,
          setPostData,
          postDetails,
          setPostDetails,
          getPostDetails,
        }}
      >
        {children}
      </poststContext.Provider>
    </>
  );
}
