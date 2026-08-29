import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { userContext } from "../user.context/UserContext";

export default function Protected() {
  const { token } = useContext(userContext);

  return token ? <Outlet /> : <Navigate to={"/login"} />;
}
