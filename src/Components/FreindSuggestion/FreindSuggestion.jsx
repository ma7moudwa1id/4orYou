import { UserPlus, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { poststContext } from "../Posts.Context/PostsContext";
import axios from "axios";
import { userContext } from "../user.context/UserContext";

export default function FreindSuggestion() {
  const { token, fetchUserdata } = useContext(userContext);
  const [freindSuggestion, setFreindSuggestion] = useState(null);

  async function followSuggestion() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/suggestions?limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        setFreindSuggestion(data.data.suggestions);
      }
    } catch (error) {
      console.log({ error });
    }
  }
  //  console.log(freindSuggestion);

  useEffect(() => {
    followSuggestion();
  }, []);

  async function handleFollow(id) {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/users/${id}/follow`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        console.log(data);
        followSuggestion();
        fetchUserdata();
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <div className="hidden 2xl:block w-80 fixed right-5 top-5 bottom-5">
      <div className="bg-white dark:bg-zinc-800/60 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-0">
        <div className="flex items-center justify-center pb-4 mb-4 border-b border-zinc-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Suggestions For You
          </h2>
        </div>

        <div className="space-y-3 max-h-147.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {freindSuggestion ? (
            freindSuggestion.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                    {user.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {user.followersCount} Follwers
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleFollow(user._id)}
                    className="p-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white transition-colors"
                    title="Follow"
                  >
                    <UserPlus size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No suggestions available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
