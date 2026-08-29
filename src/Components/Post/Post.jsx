import {
  Bookmark,
  Edit,
  Ellipsis,
  Heart,
  MessageCircleMore,
  Share2,
  Trash,
  Send,
} from "lucide-react";
import { useContext, useState } from "react";
import { userContext } from "../user.context/UserContext";
import { poststContext } from "../Posts.Context/PostsContext";
import axios from "axios";
import { data, Link } from "react-router";
import Comment from "../Comment/Comment/Comment";
import { CommentContext } from "../Comment.Context/Comment.Context";
import UpdateComment from "../Comment/UpdateComment/UpdateComment";

export default function Post({ postDetails, setDeletePost, topCommentShown }) {
  const {
    id,
    body,
    user,
    createdAt,
    commentsCount,
    topComment,
    sharesCount,
    likesCount,
    image,
    likes,
  } = postDetails || {};

  const [editMenu, setEditMenu] = useState(false);
  const { userData, setUpdateModal, token, fetchUserPosts } =
    useContext(userContext);

  const { commentUpdate, setCommentUpdate } = useContext(CommentContext);

  const {
    handleDeletePost,
    setUpdatedID,
    setPostData,
    getAllposts,
    getPostDetails,
  } = useContext(poststContext);
  const arabicRegex = /[\u0600-\u06FF]/;

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
      dateStyle: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  const [likedPost, setLikedPost] = useState(likes?.includes(userData.id));
  const [likedComment, setLikeComment] = useState(
    topComment?.likes?.includes(userData.id),
  );

  const [commentMenu, setCommentMenu] = useState(null);

  async function handleLikePost(id) {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/posts/${id}/like`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setLikedPost(data.data.liked);
        await getPostDetails(id);
        getAllposts();
        fetchUserPosts();
      }
    } catch (error) {
      console.log({ error });
    }
  }

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
        setLikeComment(data.data.liked);
        getAllposts();
        fetchUserPosts();
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="shadow-xl post p-6 rounded-3xl bg-linear-to-br from-zinc-900/80 to-zinc-950 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/50 w-full overflow-hidden">
        <header className="flex items-center justify-between mb-4">
          <div className="flex gap-3 min-w-0 flex-1">
            <div className="size-12 rounded-full overflow-hidden ring-2 ring-zinc-600/50 hover:ring-blue-400/50 transition-all duration-300 shrink-0">
              <img src={user.photo} alt="" className="size-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="text-white font-bold text-base truncate hover:text-blue-300 transition-colors">
                {user.name}
              </h4>
              <div className="flex flex-wrap gap-2 items-center text-xs text-zinc-400 font-medium">
                <span className="hover:text-blue-300 transition-colors truncate">
                  @{user.username}
                </span>
                <span className="shrink-0 text-zinc-600">•</span>
                <span className="shrink-0">{handleDate(createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="relative shrink-0">
            <button
              className="size-9 rounded-full hover:bg-zinc-800/50 flex items-center justify-center transition-colors duration-200 text-zinc-400 hover:text-zinc-100"
              onClick={() => {
                setEditMenu(!editMenu);
              }}
            >
              <Ellipsis className="size-5" />
            </button>
            {editMenu && (
              <div className="absolute top-10 right-0 p-3 rounded-2xl bg-zinc-700 shadow-2xl border border-zinc-700/50 z-10 min-w-40 animate-in fade-in slide-in-from-top-2 duration-200">
                <ul className="text-zinc-100 font-medium flex flex-col gap-1">
                  <li
                    className={`${userData._id === user._id ? "flex" : "hidden"} items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-500/15 hover:text-green-300 transition-colors cursor-pointer`}
                    onClick={() => {
                      setUpdateModal(true);
                      setUpdatedID(id);
                      setPostData({ body, image });
                      setEditMenu(false);
                    }}
                  >
                    <Edit className="size-4" />
                    <span className="text-sm">Edit</span>
                  </li>
                  <li
                    className={`${userData._id === user._id ? "flex" : "hidden"} items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/15 hover:text-red-300 transition-colors cursor-pointer`}
                    onClick={async () => {
                      await handleDeletePost(id);
                      setEditMenu(false);
                      setDeletePost(true);
                    }}
                  >
                    <Trash className="size-4" />
                    <span className="text-sm">Delete</span>
                  </li>
                  <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-500/15 hover:text-yellow-300 transition-colors cursor-pointer">
                    <Bookmark className="size-4" />
                    <span className="text-sm">Save</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <div className="space-y-4 w-full overflow-hidden">
          <div className="body text-white font-normal text-[15px] leading-relaxed wrap-break-word">
            <p dir={`${arabicRegex.test(body) ? "rtl" : "ltr"}`}>{body}</p>
          </div>
          {image && (
            <div className="image w-full max-h-150 rounded-2xl overflow-hidden ring-1 ring-zinc-700/30 hover:ring-zinc-600/50 transition-all duration-300">
              <img
                src={image}
                alt={id}
                className="w-full max-h-150 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Stats Section */}
          <div className="flex justify-between items-center text-zinc-300 text-xs pt-2">
            <div className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <Heart
                className={`size-3.5 fill-current ${likedPost === true ? "text-red-500" : ""}`}
              />
              <span className="font-semibold text-white">{likesCount}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <MessageCircleMore className="size-3.5" />
                <span className="font-semibold text-white">
                  {commentsCount}
                </span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                <Share2 className="size-3.5" />
                <span className="font-semibold text-white">{sharesCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <footer className="mt-6 flex justify-between pt-4 border-t border-zinc-700/30">
          <div className="flex gap-2">
            <button
              className="size-10 bg-zinc-800/80 rounded-xl flex justify-center items-center hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 text-zinc-300 group"
              onClick={() => {
                handleLikePost(id);
              }}
            >
              <Heart
                className={`size-5 group-hover:scale-110 transition-transform ${likedPost ? "text-red-500 fill-current" : ""}`}
              />
            </button>
            <Link
              to={`/postDetails/${id}`}
              className="size-10 bg-zinc-800/80 rounded-xl flex justify-center items-center hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-200 text-zinc-300 group"
            >
              <MessageCircleMore className="size-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
          <button className="flex items-center gap-2 px-4 h-10 bg-zinc-800/80 rounded-xl hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200 text-zinc-300 font-medium text-sm group">
            <Share2 className="size-4 group-hover:scale-110 transition-transform" />
            <span>Share</span>
          </button>
        </footer>

        {/* Top Comment Section */}
        {topComment && topCommentShown && (
          <div className="mt-5 pt-5 border-t border-zinc-700/30">
            <h3 className="mb-4 text-sm font-bold text-zinc-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Top Comment
            </h3>
            <div className="flex ml-5 items-start gap-3 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200">
              <div className="size-10 rounded-full overflow-hidden shrink-0 ring-2 ring-zinc-600/50">
                <img
                  src={topComment.commentCreator.photo}
                  alt={topComment.commentCreator.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h5 className="text-white font-semibold text-sm truncate order-1 md:order-1">
                    {topComment.commentCreator.name}
                  </h5>
                  <span className="order-3 md:order-1 text-zinc-400 text-xs hover:text-blue-300 transition-colors truncate">
                    @{topComment.commentCreator.username}
                  </span>
                  <span className="text-zinc-500 text-xs shrink-0 order-4 md:order-1">
                    {handleDate(topComment.createdAt)}
                  </span>

                  {topComment.commentCreator._id === userData.id && (
                    <>
                      <span className="relative ml-auto order-2 md:order-1">
                        <Ellipsis
                          onClick={() => {
                            setCommentMenu(
                              commentMenu === topComment._id
                                ? null
                                : topComment._id,
                            );
                          }}
                        />
                        {commentMenu === topComment._id && (
                          <div
                            key={topComment._id}
                            className="absolute top-8 right-0 p-3 rounded-2xl bg-zinc-700 shadow-2xl border border-zinc-700/50 z-10 min-w-40 animate-in fade-in slide-in-from-top-2 duration-200"
                          >
                            <ul className="text-zinc-100 font-medium flex flex-col gap-1">
                              <li
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-500/15 hover:text-green-300 transition-colors cursor-pointer`}
                                onClick={() => {
                                  setCommentMenu(null);
                                  setCommentUpdate({
                                    content: topComment.content || "",
                                    image: topComment.image || null,
                                    id: topComment._id,
                                  });
                                }}
                              >
                                <Edit className="size-4" />
                                <span className="text-sm">Edit</span>
                              </li>
                              <li
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/15 hover:text-red-300 transition-colors cursor-pointer`}
                                onClick={() => {
                                  setCommentMenu(null);
                                }}
                              >
                                <Trash className="size-4" />
                                <span className="text-sm">Delete</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </span>
                    </>
                  )}
                </div>
                {topComment.image && (
                  <Link
                    to={topComment.image}
                    target="_blank"
                    className="block w-20"
                  >
                    <img
                      src={topComment.image}
                      alt={topComment.image}
                      className="size-full"
                    />
                  </Link>
                )}
                <p
                  className="text-zinc-200 text-sm leading-relaxed wrap-break-word mb-3"
                  dir={`${arabicRegex.test(topComment.content) ? "rtl" : "ltr"}`}
                >
                  {topComment.content}
                </p>
                {/* Comment Actions */}
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 transition-colors group"
                    onClick={() => handleLikeComment(id, topComment._id)}
                  >
                    <Heart
                      className={`size-4 group-hover:scale-110 transition-transform ${likedComment ? "text-red-500 fill-current" : ""}`}
                    />
                    <span className="text-xs font-medium text-zinc-300">
                      Like
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
                commentId={topComment._id}
                postId={topComment.post}
              />
            )}
            {commentsCount > 1 && (
              <div className="mt-2 flex justify-end items-center">
                <Link
                  to={`/postDetails/${id}`}
                  className="text-blue-400 text-sm"
                >
                  Show All Comments
                </Link>
              </div>
            )}
          </div>
        )}

        <Comment postId={id} />
      </div>
    </>
  );
}
