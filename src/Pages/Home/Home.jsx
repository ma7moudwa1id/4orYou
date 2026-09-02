import { useContext, useEffect, useState } from "react";
import Post from "../../Components/Post/Post";
import { poststContext } from "../../Components/Posts.Context/PostsContext";
import { userContext } from "../../Components/user.context/UserContext";
import { Image } from "lucide-react";

export default function Home() {
  const { posts } = useContext(poststContext);
  const [deletePost, setDeletePost] = useState(false);
  const { getAllposts } = useContext(poststContext);
  const { userData, setCreateModal } = useContext(userContext);

  const [topCommentShown, setTopCommentShown] = useState(true);
  useEffect(() => {
    if (deletePost) {
      getAllposts();
    }
  }, [deletePost]);

  return (
    <>
      <div className="container w-[98%] mx-auto xl:max-w-4xl lg:ml-68 xl:ml-70 p-6 px-2.5 md:p-6 space-y-4">
        {/* User Input Trigger */}
        {userData && (
          <div
            className="flex items-center gap-4 mb-5 px-6 py-4 bg-zinc-800/40 border border-zinc-700/50 rounded-3xl cursor-pointer hover:bg-zinc-800/60 hover:border-blue-500/50 transition-all duration-200 shadow-lg"
            onClick={() => setCreateModal(true)}
          >
            <div className="size-12 rounded-full overflow-hidden ring-2 ring-zinc-700/50 shrink-0">
              <img
                src={userData.photo}
                alt={userData.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex-1 h-11 border-2 border-zinc-700/50 rounded-full text-zinc-400 flex items-center px-4 font-medium text-sm hover:border-blue-500/50 transition-colors">
              What do you want to post?
            </div>
            <div className="text-blue-500 shrink-0">
              <Image size={24} />
            </div>
          </div>
        )}

        {posts ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postDetails={post}
              setDeletePost={setDeletePost}
              topCommentShown={topCommentShown}
            />
          ))
        ) : (
          <>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
              >
                {/* Header skeleton */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>

                {/* Content skeleton */}
                <div className="space-y-3 mb-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
                </div>

                {/* Image skeleton */}
                <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>

                {/* Actions skeleton */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full ml-auto"></div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
