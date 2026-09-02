import {
  Bell,
  Bookmark,
  Home,
  Mail,
  User,
  Settings,
  Plus,
  LogOut,
  Ellipse,
  Ellipsis,
} from "lucide-react";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { userContext } from "../../user.context/UserContext";

export default function Sidebar() {
  const { token, setToken, userData, setCreateModal, userNotifications } =
    useContext(userContext);

  const sideBar = [
    { label: "Home", Icon: Home, to: "/" },
    {
      label: "Notifications",
      Icon: Bell,
      to: "/notifications",
      badge: userNotifications?.length,
    },
    { label: "Messages", Icon: Mail, to: "/messages" },
    { label: "Bookmarks", Icon: Bookmark, to: "/bookmarks" },
    { label: "Profile", Icon: User, to: "/profile" },
    { label: "Settings", Icon: Settings, to: "/settings" },
  ];
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex fixed top-0 h-screen w-70 bg-zinc-900 p-6 flex-col">
        <div className=" px-4">
          <h1 className="bg-linear-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent text-4xl font-black">
            4orYou
          </h1>
          <p className="text-sm text-zinc-400">Premuim Social Platform</p>
        </div>

        <div className="flex-1 space-y-6 mt-5">
          <nav>
            <ul className="flex-1">
              {sideBar.map(({ Icon, label, to, badge }) => (
                <li>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex gap-4  p-4 items-center text-zinc-400 font-semibold text-lg group hover:bg-zinc-800 rounded-2xl ${isActive ? "bg-linear-to-r from-blue-500/20 to-slate-900/20 rounded-xl border-l-4 border-blue-500" : ""}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>
                          <Icon color={`${isActive ? "#147ffa" : "#9e9ea8"}`} />
                        </span>
                        <h2
                          className={`group-hover:text-zinc-300 ${isActive ? "text-zinc-100" : ""}`}
                        >
                          {label}
                        </h2>
                        {badge>0 && (
                          <div className="ml-auto text-xs flex items-center justify-center size-6 rounded-full bg-red-500 text-white">
                            {badge}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="btn-primary w-full rounded-xl! flex gap-2 items-center justify-center font-bold "
            onClick={() => setCreateModal(true)}
          >
            <Plus strokeWidth={3} />
            <span>Post</span>
          </button>
        </div>

        {userData ? (
          <Link
            to={"/profile"}
            className="flex gap-2 items-center line-clamp-1"
          >
            <div className="size-11.25 rounded-full flex items-center justify-center bg-linear-to-tl from-cyan-300 to-blue-500 to-50%">
              <div className="size-9 rounded-full overflow-hidden">
                <img
                  className="size-full object-cover"
                  src={userData.photo}
                  alt={userData.name}
                />
              </div>
            </div>
            <div className="text-xs">
              <h3 className="text-zinc-100 line-clamp-1">{userData.name}</h3>
              <span className="text-zinc-400 font-light line-clamp-1">
                @{userData.username}
              </span>
            </div>
            <div className="flex flex-1 justify-end">
              <LogOut
                className="cursor-pointer hover:text-red-500/80 hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => {
                  setToken(null);
                  localStorage.removeItem("token");
                }}
              />
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>

      {/* Mobile */}
      <div className="fixed z-10 bottom-2 left-1/2 -translate-x-1/2 w-[90%] p-4 h-14 bg-zinc-900/60 backdrop-blur-xl shadow-xl rounded-full border-2 border-white/60 flex justify-between items-center gap-6 lg:hidden">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 size-9 rounded-full bg-blue-500/20 flex justify-center items-center"
              : "size-9 rounded-full flex justify-center items-center"
          }
        >
          <Home />
        </NavLink>
        <NavLink
          to={"/notifications"}
          className={({ isActive }) =>
            `relative flex items-center justify-center ${
              isActive
                ? "text-blue-500 size-9 rounded-full bg-blue-500/20"
                : "size-9 rounded-full"
            }`
          }
        >
          {userNotifications?.length > 0 && (
            <div className="absolute -top-1 -right-1 size-4 text-[10px] bg-red-500 rounded-full text-white flex items-center justify-center font-semibold">
              {userNotifications?.length}
            </div>
          )}
          <Bell />
        </NavLink>
        <div
          className="size-9 rounded-full bg-blue-500 flex justify-center items-center hover:scale-120 transition-transform duration-200 cursor-pointer"
          onClick={() => {
            setCreateModal(true);
          }}
        >
          <Plus />
        </div>
        <NavLink
          to={"/settings"}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 size-9 rounded-full bg-blue-500/20 flex justify-center items-center"
              : "size-9 rounded-full flex justify-center items-center"
          }
        >
          <Settings />
        </NavLink>

        <NavLink
          to={"profile"}
          className="size-10 bg-linear-to-br from-cyan-300 to-blue-500 rounded-full flex items-center justify-center"
        >
          {userData && (
            <div className="size-8.5 rounded-full overflow-hidden">
              <img
                src={userData.photo}
                alt={userData.name}
                className="size-full"
              />
            </div>
          )}
        </NavLink>
      </div>
    </>
  );
}
