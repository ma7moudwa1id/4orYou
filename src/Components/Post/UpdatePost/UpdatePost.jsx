import { useContext, useEffect, useState } from "react";
import { userContext } from "../../user.context/UserContext";
import { Image, X, RefreshCw, FileEdit, Sparkles } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { poststContext } from "../../Posts.Context/PostsContext";

export default function UpdatePost() {
  const { userData, updateModal, setUpdateModal, fetchUserPosts } =
    useContext(userContext);
  const { handleEditPost, getAllposts, postData } = useContext(poststContext);
  const { body, image } = postData || {};
  const [imagePreview, setImagePreview] = useState(image);

  const schema = yup.object({
    body: yup.string().nullable(),
    image: yup
      .mixed()
      .nullable()
      .test("fileType", "upload image like jpg,jpeg,png", (file) => {
        if (typeof file === "string") return true;
        if (!file) return true;
        if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
          return true;
        } else return false;
      })
      .test("fileSize", "size can't be more than 5mb", (file) => {
        if (!file) return true;
        if (typeof file === "string") return true;
        if (file.size < 5 * 1024 * 1024) {
          return true;
        } else return false;
      }),
  });

  const {
    values,
    setFieldValue,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    dirty,
    isValid,
  } = useFormik({
    initialValues: {
      body: body,
      image: image,
    },

    validationSchema: schema,

    onSubmit: async (values, { resetForm }) => {
      resetForm();
      setImagePreview(null);
      setFieldValue("image", null);
      await handleEditPost(values);
      setUpdateModal(false);
      getAllposts();
      fetchUserPosts();
    },
  });

  useEffect(() => {
    if (errors.image) {
      setImagePreview(null);
    }
  }, [errors.image]);

  useEffect(() => {
    setFieldValue("body", body || "");
    setFieldValue("image", image || null);
    setImagePreview(image);
  }, [postData]);

  return (
    <>
      {/* Modal Overlay */}
      {userData && updateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Modal Container - Different styling from CreatePost */}
          <div className="bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300 border border-blue-500/20">
            {/* Modal Header - Different color scheme */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-blue-500/20 bg-linear-to-r from-blue-500/10 to-cyan-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <FileEdit className="text-blue-500" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Edit Post
                    <Sparkles className="text-blue-500" size={18} />
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Make changes to your post
                  </p>
                </div>
              </div>
              <button
                onClick={() => setUpdateModal(false)}
                className="p-2.5 hover:bg-zinc-800 rounded-xl transition-all duration-200 text-zinc-400 hover:text-white group"
              >
                <X
                  size={22}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Modal Body */}
              <div className="px-6 py-5 max-h-[calc(90vh-220px)] overflow-y-auto scrollbar-none">
                {/* User Info - Compact version */}
                <div className="flex items-center gap-3 mb-5 p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <div className="size-11 rounded-xl overflow-hidden ring-2 ring-blue-500/30">
                    <img
                      src={userData.photo}
                      alt={userData.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {userData.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <RefreshCw size={12} className="text-blue-500" />
                      <span>Updating post</span>
                    </div>
                  </div>
                </div>

                {/* Textarea - Different styling */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wide">
                    Post Content
                  </label>
                  <textarea
                    placeholder="Edit your thoughts..."
                    value={values.body}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="body"
                    onBlur={handleBlur}
                    className="w-full min-h-32 max-h-48 p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl text-white placeholder:text-zinc-500 text-base resize-none outline-none focus:border-blue-500/50 focus:bg-zinc-800/80 transition-all duration-200"
                  ></textarea>

                  {errors.body && touched.body && (
                    <p className="mt-2 p-3 bg-red-500/10 text-red-400 font-medium rounded-xl text-sm border border-red-500/20">
                      {errors.body}
                    </p>
                  )}
                </div>

                {/* Image Section - Card style */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wide">
                    Post Image
                  </label>
                  <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-blue-500/30 bg-linear-to-br from-zinc-800/30 to-zinc-800/10 hover:border-blue-500/50 transition-all duration-200">
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full max-h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFieldValue("image", null);
                            }}
                            className="p-3 bg-red-500 hover:bg-red-600 rounded-xl transition-all duration-200 text-white font-medium flex items-center gap-2"
                          >
                            <X size={18} />
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {!imagePreview && (
                      <label
                        className="py-12 text-center cursor-pointer flex flex-col justify-center items-center hover:bg-zinc-800/20 transition-all duration-200"
                        htmlFor="update-image-upload"
                      >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 text-blue-500 mb-3 border border-blue-500/30">
                          <Image size={28} />
                        </div>
                        <p className="text-zinc-300 font-medium mb-1">
                          Update or add a photo
                        </p>
                        <p className="text-xs text-zinc-500">
                          Click to browse or drag and drop
                        </p>
                      </label>
                    )}
                  </div>
                  <input
                    type="file"
                    id="update-image-upload"
                    accept="image/*"
                    className="hidden"
                    onBlur={handleBlur}
                    name="image"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      setFieldValue("image", file || null);
                      if (file) {
                        const image = URL.createObjectURL(file);
                        setImagePreview(image);
                      }
                    }}
                  />
                  {errors.image && (
                    <p className="mt-2 p-3 bg-red-500/10 text-red-400 font-medium rounded-xl text-sm border border-red-500/20">
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Footer - Different button design */}
              <div className="px-6 py-4 border-t border-blue-500/20 bg-linear-to-r from-zinc-900 to-zinc-800/50">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setUpdateModal(false)}
                    className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl transition-all duration-200 border border-zinc-700 hover:border-zinc-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!(dirty && isValid)}
                    className="flex-1 py-3 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-linear-to-r disabled:from-blue-900 disabled:to-blue-900"
                  >
                    <RefreshCw size={18} />
                    Update Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
