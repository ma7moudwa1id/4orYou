import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "../user.context/UserContext";
import { toast } from "sonner";
import { poststContext } from "../Posts.Context/PostsContext";

export const CommentContext = createContext("");

export default function CommentContextProvider({ children }) {
  const { token, fetchUserPosts } = useContext(userContext);
  const { getAllposts, getPostDetails } = useContext(poststContext);

  const [commentUpdate, setCommentUpdate] = useState(null);

  async function handleDeleteComment(postId, commentId) {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        console.log(data);
        toast.success(data.message);
        getPostDetails(postId);
        getAllposts();
        fetchUserPosts();
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <>
      <CommentContext.Provider
        value={{ handleDeleteComment, setCommentUpdate, commentUpdate }}
      >
        {children}
      </CommentContext.Provider>
    </>
  );
}
