import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";
import Protected from "./Components/Protected/Protected";
import { UserContextProvider } from "./Components/user.context/UserContext";
import { PostsContextProvider } from "./Components/Posts.Context/PostsContext";
import Profile from "./Pages/Profile/Profile";
import PostDetails from "./Pages/PostDetails/PostDetails";
import UpdatePost from "./Components/Post/UpdatePost/UpdatePost";
import CommentContextProvider from "./Components/Comment.Context/Comment.Context";
import SideLayout from "./Layout/SideLayout";
import Settings from "./Pages/settings/Settings";
import ScrollTo from "./Components/ScrollTo/ScrollTo";
import Notifications from "./Pages/NotificationsPage/Notifications";
import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import WillDeveloped from "./Pages/WillDeveloped/WillDeveloped";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollTo />
          <Layout />
        </>
      ),
      children: [
        {
          element: (
            <>
              <ScrollTo />
              <Protected />
            </>
          ),
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: (
        <>
          <ScrollTo />
          <SideLayout />
        </>
      ),
      children: [
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <>
          <ScrollTo />
          <Signin />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <ScrollTo />
          <Signup />
        </>
      ),
    },
    {
      path: "/postDetails/:id",
      element: <PostDetails />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/messages",
      element: <WillDeveloped />,
    },
    {
      path: "/bookmarks",
      element: <WillDeveloped />,
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <PostsContextProvider>
          <CommentContextProvider>
            <Toaster position="top-right" richColors />
            <RouterProvider router={router} />
            <UpdatePost />
          </CommentContextProvider>
        </PostsContextProvider>
      </UserContextProvider>
    </>
  );
}
