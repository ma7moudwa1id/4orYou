import { useContext, useEffect, useState } from "react";
import { userContext } from "../../user.context/UserContext";
import { Image, X, Smile, MapPin, Calendar } from "lucide-react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";
import * as yup from "yup";
import { poststContext } from "../../Posts.Context/PostsContext";
export default function CreatePost() {
  const { userData, token, createModal, setCreateModal, fetchUserPosts } =
    useContext(userContext);
  const { getAllposts } = useContext(poststContext);
  const myform = new FormData();

  const schema = yup.object({
    body: yup.string().nullable(),
    image: yup
      .mixed()
      .nullable()
      .test("fileType", "upload image like jpg,jpeg,png", (file) => {
        if (!file) return true;
        if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
          return true;
        } else return false;
      })
      .test("fileSize", "size cann't more then 5mg", (file) => {
        if (!file) return true;
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
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      body: "",
      image: null,
    },

    validationSchema: schema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const myform = new FormData();
        if (values.body) {
          myform.append("body", values.body);
        }
        if (values.image) {
          myform.append("image", values.image);
        }
        const { data } = await axios.request({
          url: "https://route-posts.routemisr.com/posts",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: myform,
        });
        if (data.success) {
          toast.success("Post Created Successfully");
          resetForm();
          setImagePreveiw(null);
          setCreateModal(false);
          getAllposts();
          fetchUserPosts();
        }
      } catch (error) {
        console.log({ error });
      }
    },
  });
  const [imagePreveiw, setImagePreveiw] = useState(null);

  useEffect(() => {
    if (errors.image) {
      setImagePreveiw(null);
    }
  }, [errors.image]);
  return (
    <>
      {/* Modal Overlay */}
      {userData && createModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Post
              </h2>
              <button
                onClick={() => setCreateModal(false)}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Modal Body */}
              <div className="px-6 py-4 max-h-[calc(90vh-180px)] overflow-y-auto scrollbar-none">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-full bg-linear-to-br from-cyan-300 to-blue-500 overflow-hidden flex justify-center items-center">
                    <img
                      src={userData.photo}
                      alt={userData.name}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {userData.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>Public</span>
                    </div>
                  </div>
                </div>

                {/* Textarea */}
                <textarea
                  placeholder="What's on your mind?"
                  value={values.body}
                  onChange={handleChange}
                  name="body"
                  onBlur={handleBlur}
                  className="w-full min-h-30 max-h-50 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-lg resize-none outline-none border-none"
                ></textarea>

                {errors.body && touched.body && (
                  <p className="p-2 bg-red-300 text-red-700 font-bold rounded-xl text-center mt-5">
                    {errors.body}
                  </p>
                )}

                {/* Image Preview Section */}
                <div className="mt-4 relative rounded-xl overflow-hidden border-2 border-dashed border-zinc-700 bg-zinc-800/30">
                  {/* Image Preview (shown when image is uploaded) */}
                  {imagePreveiw && (
                    <div className="relative">
                      <img
                        src={imagePreveiw}
                        alt="Preview"
                        className="w-full max-h-100 object-cover"
                      />
                      {/* Remove Image Button */}
                      <button
                        onClick={() => {
                          (setImagePreveiw(null), setFieldValue("image", null));
                        }}
                        className="absolute cursor-pointer top-3 right-3 p-2 bg-zinc-900/80 hover:bg-zinc-900 rounded-full transition-colors text-white"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}

                  {/* Empty State (when no image) - Hidden in this static design */}
                  {!imagePreveiw && (
                    <label
                      className="py-16 text-center cursor-pointer flex flex-col justify-center items-center"
                      htmlFor="image-upload"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 text-blue-500 mb-4">
                        <Image size={32} />
                      </div>
                      <p className="text-gray-400 mb-2">
                        Add photos to your post
                      </p>
                      <p className="text-sm text-gray-500">or drag and drop</p>
                    </label>
                  )}
                </div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onBlur={handleBlur}
                  name="image"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setFieldValue("image", file || null);

                    if (file) {
                      const image = URL.createObjectURL(file);
                      setImagePreveiw(image);
                    }
                  }}
                />
                {errors.image && (
                  <p className="p-2 bg-red-300 text-red-700 font-bold rounded-xl text-center mt-5">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-zinc-700">
                <button
                  type="submit"
                  disabled={!(dirty && isValid)}
                  className="cursor-pointer w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-800"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
