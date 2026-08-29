import {
  Bell,
  CheckCheck,
  Heart,
  MessageCircle,
  Share2,
  ChevronRight,
  Sparkles,
  MessageCircleMore,
  BellOff,
} from "lucide-react";
import { useContext, useState } from "react";
import { userContext } from "../../Components/user.context/UserContext";
import { Link } from "react-router";

export default function Notifications() {
  const Icon = [
    {
      type: "like_post",
      icon: Heart,
    },
    {
      type: "comment_post",
      icon: MessageCircleMore,
    },
  ];
  const { userNotifications, markNotificationAsRead, markAllAsRead } =
    useContext(userContext);

    console.log(userNotifications);
    

  const [btnFilter, setBtnFilter] = useState("All");
  return (
    <div className="container mx-auto lg:ml-70.5 p-6 space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative p-3 bg-zinc-800 rounded-2xl border border-zinc-700">
            <Bell className="w-6 h-6 text-blue-500" />
            {userNotifications?.length > 0 && (
              <div className="absolute -top-2 -right-2 size-6 rounded-full bg-red-500 border-2 border-zinc-950 text-xs font-bold text-white flex items-center justify-center">
                <span>{userNotifications?.length}</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Notifications</h1>
            <p className="text-sm text-zinc-400">
              Stay up to date with your activity
            </p>
          </div>
        </div>

        {userNotifications?.length > 0 && (
          <button
            onClick={() => {
              markAllAsRead();
            }}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-semibold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/50"
          >
            <CheckCheck className="w-4 h-4 text-blue-500" />
            Mark all as read
          </button>
        )}
      </div>

      {/* ── Filter Tabs ─────────────────────────────────────────────────────── */}
      {/* <div className="flex items-center gap-2 p-1.5 rounded-full bg-zinc-800/60 border border-zinc-700/50 w-fit">
        {filters.map((filter, index) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setBtnFilter(filter);
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 ${
              filter === btnFilter
                ? "bg-linear-to-l from-blue-500 from-50% to-blue-400 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div> */}

      {/* ── Notifications Card ──────────────────────────────────────────────── */}
      {userNotifications?.length > 0 ? (
        <div className="bg-linear-to-br from-zinc-800 to-zinc-900/60 rounded-3xl shadow-lg border border-zinc-700 p-4 md:p-6 space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-bold text-zinc-100">
                Recent Activity
              </h2>
            </div>
            <span className="text-xs font-semibold text-zinc-500">
              {userNotifications.length} total
            </span>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {userNotifications.map((notification) => (
              <Link to={`/postDetails/${notification.entityId}`}
                onClick={() => {
                  markNotificationAsRead(notification._id);
                }}
                key={notification._id}
                className={`group flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  notification.isRead
                    ? "bg-zinc-800/40 border-zinc-700/30 hover:border-zinc-600/50"
                    : "bg-zinc-800/80 border-blue-500/25 hover:border-blue-500/50"
                }`}
              >
                {/* Actor Avatar + Type Badge */}
                <div className="relative shrink-0">
                  <div className="size-12 rounded-full overflow-hidden ring-2 ring-zinc-700/50">
                    <img
                      src={notification.actor.photo}
                      alt={notification.actor.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <span
                    className={`absolute flex items-center justify-center -bottom-1 -right-1 p-1.5 rounded-full border-2 border-zinc-900 bg-blue-500 text-white ${notification.accent}`}
                  >
                    {(() => {
                      const match = Icon.find(
                        (I) => I.type === notification.type,
                      );
                      const NotificationIcon = match?.icon;
                      return NotificationIcon ? (
                        <NotificationIcon
                          className={`size-3 fill-current ${NotificationIcon === Heart ? "text-red-600" : "text-white"}`}
                          strokeWidth={3}
                        />
                      ) : null;
                    })()}
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  {/* Title Row */}
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-relaxed wrap-break-word">
                      <span className="text-zinc-100 font-bold">
                        {notification.actor.name}
                      </span>{" "}
                      <span className="text-zinc-400">
                        {notification.action}
                      </span>
                    </p>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-zinc-500 text-xs">
                        {notification.time}
                      </span>
                      {!notification.isRead && (
                        <span className="size-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </div>

                  {/* Post Preview */}
                  {notification.entity && (
                    <div className="mt-3 flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-700/40">
                      {notification.entity.image && (
                        <div className="size-14 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
                          <img
                            src={notification.entity.image}
                            alt={notification.entity.body}
                            className="size-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-300 text-sm font-semibold truncate">
                          {notification.entity.body}
                        </p>
                        <div className="flex items-center gap-4 mt-1.5 text-zinc-500 text-xs">
                          <span className="flex items-center gap-1">
                            <Heart className="size-3.5" />
                            {notification.entity.likesCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="size-3.5" />
                            {notification.entity.commentsCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="size-3.5" />
                            {notification.entity.sharesCount}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="size-5 text-zinc-600 shrink-0 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  )}

                  {/* Top Comment Snippet */}
                  {notification.entity?.topComment && (
                    <div className="mt-3 pl-3 border-l-2 border-blue-500/40">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h5 className="text-zinc-200 font-semibold text-xs truncate">
                          {notification.entity.topComment.commentCreator.name}
                        </h5>
                        <span className="text-zinc-500 text-xs truncate">
                          @
                          {
                            notification.entity.topComment.commentCreator
                              .username
                          }
                        </span>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed wrap-break-word">
                        {notification.entity.topComment.content}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty w-full mt-5 h-50 flex flex-col justify-center items-center space-y-4">
          <div>
            <BellOff size={70} className="text-zinc-500" />
          </div>
          <div>
            <span className="text-zinc-400 text-xl font-semibold">
              No Notifications Yet
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
