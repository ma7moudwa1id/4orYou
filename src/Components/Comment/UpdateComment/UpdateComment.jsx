import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../user.context/UserContext";
import { Send, Image, X, RefreshCcw } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { poststContext } from "../../Posts.Context/PostsContext";
import { CommentContext } from "../../Comment.Context/Comment.Context";
import { toast } from "sonner";

export default function UpdateComment({ postId, commentId }) {
  const { userData, token, fetchUserPosts } = useContext(userContext);
  const { getPostDetails, getAllposts } = useContext(poststContext);
  const { commentUpdate, setCommentUpdate } = useContext(CommentContext);
  const [previewImage, setPreviewImage] = useState(commentUpdate.image);
  const schema = yup.object({
    content: yup.string().trim().nullable(),
    image: yup
      .mixed()
      .nullable()
      .test("FileType", "Upload image like jpeg,jpg,png", (file) => {
        if (!file) return true;
        if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
          return true;
        } else return false;
      })
      .test("FileSize", "the image size must be at most 5MG", (file) => {
        if (!file) return true;
        if (file.size < 5 * 1024 * 1024) {
          return true;
        } else return false;
      }),
  });

  const {
    values,
    handleSubmit,
    handleBlur,
    dirty,
    isValid,
    isSubmitting,
    errors,
    handleChange,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      content: commentUpdate?.content || "",
      image: null,
    },

    validationSchema: schema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const myform = new FormData();
        if (values.content) {
          myform.append("content", values.content);
        }

        if (values.image) {
          myform.append("image", values.image);
        }
        const { data } = await axios.request({
          url: `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: myform,
        });
        if (data.success) {
          console.log(data);
          resetForm();
          setFieldValue("image", null);
          setPreviewImage(null);
          getAllposts();
          getPostDetails(postId);
          fetchUserPosts();
          toast.success(data.message);
          setCommentUpdate(null);
        }
      } catch (error) {
        console.log({ error });
        console.log(postId);
      }
    },
  });

  useEffect(() => {
    if (errors.image) {
      setPreviewImage(null);
    }
  }, [errors.image]);

  useEffect(() => {
    if (commentUpdate) {
      setFieldValue("content", commentUpdate.content);
      setFieldValue("image", null);
      setPreviewImage(commentUpdate.image || null);
    }
  }, [commentUpdate]);

  return (
    <>
      {/* Comment Input */}
      {commentId === commentUpdate.id && (
        <div className="pb-5 border-b border-zinc-700/30">
          {/* Image Preview */}

          {previewImage && (
            <div className="relative mt-5 ml-14 size-24 rounded-xl overflow-hidden border border-zinc-700/30 group">
              <img
                src={previewImage}
                alt="Selected attachment preview"
                className="size-full object-cover"
              />
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setFieldValue("image", null);
                }}
                className="absolute top-1 right-1 size-6 rounded-full bg-zinc-900/80 backdrop-blur-sm flex justify-center items-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all duration-200 cursor-pointer"
              >
                <X className="size-3.5 text-white" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex items-start gap-3 mt-5">
              <div className="size-10 mt-1.5 rounded-full overflow-hidden shrink-0 ring-2 ring-blue-500/30">
                <img
                  src={userData.photo}
                  alt={userData.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700/30 rounded-full bg-zinc-800/60 focus-within:border-blue-400/50 focus-within:bg-zinc-800/80 transition-all duration-200 hover:border-zinc-600/50">
                  <input
                    type="text"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write a comment..."
                    className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm min-w-0"
                  />
                  <label className="size-8 rounded-full bg-zinc-700/50 flex justify-center items-center hover:bg-zinc-600/50 transition-colors duration-200 group shrink-0 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        setFieldValue("image", file || null);
                        if (file) {
                          const image = URL.createObjectURL(file);
                          setPreviewImage(image);
                        }
                      }}
                      className="hidden"
                    />
                    <Image className="size-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </label>
                  <button
                    type="submit"
                    disabled={!(dirty && isValid)}
                    className="size-8 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex justify-center items-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/25 group shrink-0
                  disabled:bg-linear-to-r disabled:from-blue-900 disabled:to-blue-900 disabled:cursor-not-allowed"
                  >
                    <RefreshCcw className="size-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
            {errors.image && touched && (
              <p className="p-1 px-2 mt-3 rounded-xl bg-red-400 text-sm text-red-700 font-semibold">
                {errors.image}
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
}
