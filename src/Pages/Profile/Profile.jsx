import {
  Calendar,
  MapPin,
  Link as LinkIcon,
  Mail,
  Edit,
  Camera,
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  Package,
  Ellipsis,
  Trash,
  MessageCircleMore,
  Share2,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Components/user.context/UserContext";
import Post from "../../Components/Post/Post";
import { Link } from "react-router";
export default function Profile() {
  const { userData, userPosts, fetchUserPosts } = useContext(userContext);
  const [emptyPosts, setEmptyPosts] = useState(true);
  const [topCommentShown, setTopCommentShown] = useState(true);
  function handleDate(str) {
    const date = new Date(str);
    return date.toDateString();
  }

  useEffect(() => {
    fetchUserPosts();
  }, []);

  useEffect(() => {
    if (userPosts) {
      if (userPosts.length === 0) setEmptyPosts(true);
      else setEmptyPosts(false);
    }
  }, [userPosts]);

  return (
    <>
      {userData && userPosts && (
        <div className="container w-[98%] mx-auto 2xl:max-w-4xl lg:ml-68 2xl:ml-70.5 p-6 px-2.5 md:p-6">
          {/* Profile Card */}
          <div className="bg-linear-to-br from-zinc-800 to-zinc-900/60 rounded-3xl shadow-lg border border-zinc-700 overflow-hidden">
            {/* Cover Image */}
            <div className="relative h-60 bg-linear-to-br from-blue-500 to-cyan-300/80">
              <div className="absolute top-4 right-4">
                <button className="p-2.5 bg-zinc-900/80 backdrop-blur-sm rounded-full hover:bg-zinc-800 transition-colors duration-200 border border-zinc-700">
                  <Camera className="w-5 h-5 text-zinc-300" />
                </button>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="relative px-6 pb-6">
              {/* Profile Picture */}
              <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start">
                <div className="-mt-20 mb-4">
                  <div className="w-40 h-40 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden">
                    <img
                      src={userData.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="lg:mt-4">
                  <Link
                    to={"/settings"}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-800 border-2 border-zinc-600 hover:border-blue-500 transition-colors duration-200 cursor-pointer group"
                  >
                    <Edit className="w-4 h-4 text-zinc-300 group-hover:text-blue-500" />
                    <span className="text-zinc-200 font-bold group-hover:text-blue-500">
                      Edit Profile
                    </span>
                  </Link>
                </div>
              </div>

              {/* User Details */}
              <div className="mt-4 space-y-4">
                {/* Name and Username */}
                <div>
                  <h1 className="text-3xl font-bold text-zinc-100">
                    {userData.name}
                  </h1>
                  <p className="text-zinc-400 font-medium">
                    @{userData.username}
                  </p>
                </div>

                {/* Bio */}
                {/* <div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    Full-stack developer passionate about creating amazing web
                    experiences. Love coding, coffee, and cats. 🚀☕🐱
                  </p>
                </div> */}

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {handleDate(userData.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between flex-wrap gap-6 pt-4 border-t border-zinc-700">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-100 font-bold text-lg">
                        {userData.followersCount}
                      </span>
                      <span className="text-zinc-400 text-xs">Followers</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <Users className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-100 font-bold text-lg">
                        {userData.followingCount}
                      </span>
                      <span className="text-zinc-400 text-xs">Following</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <Bookmark className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-100 font-bold text-lg">
                        {userData.bookmarksCount}
                      </span>
                      <span className="text-zinc-400 text-xs">Saved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-6 bg-linear-to-br from-zinc-800 to-zinc-900/60 rounded-3xl shadow-lg border border-zinc-700 py-6 px-4">
            <div className="flex gap-4 border-b border-zinc-700">
              <button className="px-6 py-3 text-zinc-100 font-bold border-b-2 border-blue-500 hover:text-blue-500 transition-colors duration-200">
                Posts
              </button>
            </div>

            {/* Posts Grid Placeholder */}
            {emptyPosts && (
              <div className="empty w-ful mt-5 h-50 flex flex-col justify-center items-center space-y-4">
                <div>
                  <Package size={70} className="text-zinc-500" />
                </div>
                <div>
                  <span className="text-zinc-400 text-xl font-semibold">
                    No Posts Yet
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-6 mt-5">
              {!emptyPosts &&
                userPosts.map((post) => (
                  <Post postDetails={post} topCommentShown={topCommentShown} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
