import {
  ArrowLeft,
  Bookmark,
  Edit,
  Ellipsis,
  Heart,
  MessageCircleMore,
  Package,
  Send,
  Share2,
  Trash,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { data, Link, useParams } from "react-router";
import { poststContext } from "../../Components/Posts.Context/PostsContext";
import { userContext } from "../../Components/user.context/UserContext";
import axios from "axios";
import Post from "../../Components/Post/Post";
import { CommentContext } from "../../Components/Comment.Context/Comment.Context";
import UpdateComment from "../../Components/Comment/UpdateComment/UpdateComment";

export default function PostDetails() {
  const { handleDeleteComment, setCommentUpdate, commentUpdate } =
    useContext(CommentContext);

  const { getPostDetails, postDetails, getAllposts } =
    useContext(poststContext);
  const { userData, token, fetchUserPosts, userPosts } =
    useContext(userContext);
  const { id } = useParams();

  const [postComments, setPostComments] = useState(null);

  const [topCommentShown, setTopCommentShown] = useState(false);

  const loadingUi = (
    <div className="loading fixed inset-0 flex flex-col justify-center items-center z-20 bg-zinc-900 overflow-x-hidden">
      <div className="absolute animate-pulse rounded-full -z-10 left-1/2 -translate-x-1/2 blur-3xl -top-150 size-200 bg-radial-[at_50%_110%] to-zinc-950 via-blue-500 via-40% from-blue-300"></div>
      <h2 className="text-8xl animate-bounce font-black bg-linear-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
        4orYou
      </h2>
      <Ellipsis size={100} className="animate-pulse text-blue-500" />
    </div>
  );

  const [loading, setLoading] = useState(true);

  const [commentMenu, setCommentMenu] = useState(null);

  const {
    body,
    image,
    commentsCount,
    createdAt,
    _id,
    likesCount,
    sharesCount,
    likes,
    user,
  } = postDetails || {};

  function handleDate(str) {
    const date = new Date(str);
    const now = new Date();
    const dif = now - date;
    const seconds = Math.floor(dif / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 1000) {
      return `Just Now`;
    }
    if (minutes < 60) {
      return `${minutes} m`;
    }
    if (hours < 24) {
      return `${hours} h`;
    }
    if (days < 7) {
      return `${days} d`;
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  async function getPostComments() {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/posts/${id}/comments`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setPostComments(data.data.comments);
      }
    } catch (error) {
      console.log(data);
    }
  }

  useEffect(() => {
    getPostDetails(id);
    getPostComments();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getPostComments();
    setCommentUpdate(null);
  }, [postDetails]);

  async function handleLikeComment(postId, commentId) {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        getPostDetails(id);
        getPostComments();
        getAllposts();
        fetchUserPosts();
      }
    } catch (error) {}
  }

  return (
    <>
      {loading && loadingUi}
      {postDetails ? (
        <div className="w-full max-w-4xl mx-auto lg:ml-70.5 p-6 flex flex-col gap-6 overflow-x-hidden">
          {/* Page Header */}
          <div className="flex items-center gap-4">
            <Link
              onClick={() => {
                window.history.back();
              }}
              className="size-11 rounded-full bg-zinc-800/80 border border-zinc-700/30 flex justify-center items-center text-zinc-300 hover:bg-zinc-800 hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200 group"
            >
              <ArrowLeft className="size-5 group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <div>
              <h2 className="text-white font-bold text-xl">Post</h2>
              <p className="text-zinc-500 text-xs font-medium">
                Thread and comments
              </p>
            </div>
          </div>

          {/* Post Card */}
          <Post postDetails={postDetails} topCommentShown={topCommentShown} />

          {/* Comments Card */}
          {postComments?.length > 0 && (
            <div className="shadow-xl p-6 rounded-3xl bg-linear-to-br from-zinc-900/80 to-zinc-950 border border-zinc-700/30 w-full overflow-hidden">
              <h3 className="mb-5 text-sm font-bold text-zinc-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                Comments
                <span className="text-zinc-500 font-medium">
                  ({commentsCount})
                </span>
              </h3>

              {/* Comments List */}
              <div className="mt-5 flex flex-col gap-4 max-h-150 overflow-y-auto scrollbar-none">
                {/* Comment  */}
                {postComments &&
                  postComments.map((comment) => (
                    <div className="flex flex-col shrink-0">
                      <div
                        key={comment._id}
                        className={`flex shrink-0 items-start gap-3 p-4 rounded-2xl  border border-zinc-700/30 ${commentUpdate?.id === comment._id ? "bg-blue-900/50" : "bg-zinc-800/50"} hover:border-zinc-600/50 transition-all duration-200`}
                      >
                        <div className="size-10 rounded-full overflow-hidden shrink-0 ring-2 ring-zinc-600/50">
                          <img
                            src={comment.commentCreator.photo}
                            alt={comment.commentCreator.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h5 className="text-white font-semibold text-sm truncate order-1 md:order-1">
                              {comment.commentCreator.name}
                            </h5>
                            <span className="text-zinc-400 text-xs truncate order-3 md:order-1">
                              @{comment.commentCreator.username}
                            </span>
                            <span className="text-zinc-500 text-xs shrink-0 order-4 md:order-1">
                              {handleDate(comment.createdAt)}
                            </span>

                            {(userPosts?.find((userPost) => {
                              return userPost._id === comment.post;
                            }) ||
                              comment.commentCreator._id === userData.id) && (
                              <>
                                <span className="relative ml-auto order-2 md:order-1">
                                  <Ellipsis
                                    onClick={() => {
                                      setCommentMenu(
                                        commentMenu === comment._id
                                          ? null
                                          : comment._id,
                                      );
                                    }}
                                  />
                                  {commentMenu === comment._id && (
                                    <div
                                      key={comment._id}
                                      className="absolute top-8 right-0 p-3 rounded-2xl bg-zinc-700 shadow-2xl border border-zinc-700/50 z-10 min-w-40 animate-in fade-in slide-in-from-top-2 duration-200"
                                    >
                                      <ul className="text-zinc-100 font-medium flex flex-col gap-1">
                                        <li
                                          className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-500/15 hover:text-green-300 transition-colors cursor-pointer`}
                                          onClick={() => {
                                            setCommentMenu(null);
                                            setCommentUpdate({
                                              content: comment.content || "",
                                              image: comment.image || null,
                                              id: comment._id,
                                            });
                                          }}
                                        >
                                          <Edit className="size-4" />
                                          <span className="text-sm">Edit</span>
                                        </li>
                                        <li
                                          className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/15 hover:text-red-300 transition-colors cursor-pointer`}
                                          onClick={(e) => {
                                            setCommentMenu(null);
                                            e.stopPropagation();
                                            handleDeleteComment(
                                              comment.post,
                                              comment._id,
                                            );
                                          }}
                                        >
                                          <Trash className="size-4" />
                                          <span className="text-sm">
                                            Delete
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </span>
                              </>
                            )}
                          </div>
                          {comment.image && (
                            <Link
                              to={comment.image}
                              target="_blank"
                              className="block w-40"
                            >
                              <img
                                src={comment.image}
                                alt={comment.image}
                                className="size-full"
                              />
                            </Link>
                          )}
                          <p className="text-zinc-200 text-sm leading-relaxed wrap-break-word mb-3">
                            {comment.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => {
                                handleLikeComment(comment.post, comment._id);
                              }}
                              className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 transition-colors group"
                            >
                              <Heart
                                className={`size-4 fill-current group-hover:scale-110 transition-transform ${comment.likes.includes(userData.id) ? "text-red-500" : ""}`}
                              />
                              <span className="text-xs font-medium text-zinc-300">
                                {comment.likes.length}
                              </span>
                            </button>
                            <button className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 transition-colors group">
                              <MessageCircleMore className="size-4 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-medium text-zinc-300">
                                Reply
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {commentUpdate && (
                        <UpdateComment
                          commentId={comment._id}
                          postId={comment.post}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col gap-4 justify-center items-center text-zinc-400">
          <Package size={90} />
          <h2 className="text-4xl font-black">Not Found Post</h2>
        </div>
      )}
    </>
  );
}
