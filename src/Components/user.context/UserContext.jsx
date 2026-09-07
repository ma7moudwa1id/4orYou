import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const userContext = createContext("");

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [userNotifications, setUserNotifications] = useState(null);

  async function fetchUserPosts() {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/users/${userData._id}/posts`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserPosts(data.data.posts);
      }
    } catch (error) {
      console.log({ error });
    }
  }
  async function fetchUserdata() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        setUserData(data.data.user);
      }
    } catch (error) {
      console.log({ error });
    }
  }
  async function getUserNotifications() {
    try {
      const { data } = await axios.request({
        url: "https://route-posts.routemisr.com/notifications?unread=false",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserNotifications(data.data.notifications);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function markNotificationAsRead(notificationId) {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/notifications/${notificationId}/read`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        // toast.info("Mark As Read");
        getUserNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function markAllAsRead() {
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/notifications/read-all`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        console.log(data);
        toast.success("Mark As Read All");
        getUserNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserdata();
    getUserNotifications();
  }, [token]);
  useEffect(() => {
    if (userData) {
      fetchUserPosts();
      getUserNotifications();
    }
  }, [userData]);

  return (
    <>
      <userContext.Provider
        value={{
          token,
          setToken,
          userData,
          createModal,
          setCreateModal,
          userPosts,
          fetchUserPosts,
          updateModal,
          setUpdateModal,
          fetchUserdata,
          userNotifications,
          setUserNotifications,
          markNotificationAsRead,
          markAllAsRead,
        }}
      >
        {children}
      </userContext.Provider>
    </>
  );
}
