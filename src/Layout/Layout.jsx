import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Components/Shared/Sidebar/Sidebar";
import FreindSuggestion from "../Components/FreindSuggestion/FreindSuggestion";
import CreatePost from "../Components/Post/CreatePost/CreatePost";
import { Ellipsis } from "lucide-react";
import UpdatePost from "../Components/Post/UpdatePost/UpdatePost";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const loadingUi = (
    <div className="loading fixed inset-0 flex flex-col justify-center items-center z-20 bg-zinc-900 overflow-x-hidden">
      <div className="absolute animate-pulse rounded-full -z-10 left-1/2 -translate-x-1/2 blur-3xl -top-150 size-200 bg-radial-[at_50%_110%] to-zinc-950 via-blue-500 via-40% from-blue-300"></div>
      <h2 className="text-8xl animate-bounce font-black bg-linear-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
        4orYou
      </h2>
      <Ellipsis size={100} className="animate-pulse text-blue-500" />
    </div>
  );
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <>
      {loading && loadingUi}
      <div className="flex relative pb-15">
        <Sidebar />
        <Outlet />
        <FreindSuggestion />
      </div>
      {/* Modal rendered at layout level */}
      <CreatePost />
      <UpdatePost />
    </>
  );
}
