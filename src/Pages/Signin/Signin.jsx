import {
  Calendar,
  EyeClosed,
  EyeOff,
  Loader,
  Lock,
  Mail,
  Mars,
  User,
  UserCircle,
  Venus,
  Eye,
} from "lucide-react";
import React, { useContext, useState } from "react";
import signImg from "../../assests/images/Man_portrait_with_water_droplets_202608202146.jpeg";
import { data, Link, NavLink, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { userContext } from "../../Components/user.context/UserContext";
export default function Signin() {
  const [passwordShown, setPasswordShown] = useState(false);
  const EyePassword = passwordShown ? Eye : EyeOff;
  const [repasswordShown, setRePasswordShown] = useState(false);
  const EyeRePassword = repasswordShown ? Eye : EyeOff;

  const navigate = useNavigate();
  const { token, setToken } = useContext(userContext);

  const schema = yup.object({
    email: yup.string().required("email is required").email("email is invalid"),

    password: yup.string().required("password is required"),
  });

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    dirty,
    touched,
    isValid,
    isSubmitting,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: schema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.request({
          url: "https://route-posts.routemisr.com/users/signin",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: values,
        });
        if (data.success) {
          toast.success(data.message);
          const Token = data.data.token;
          setToken(Token);
          localStorage.setItem("token", JSON.stringify(Token));
          const x = setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="">
        <div className="flex min-h-screen">
          <div className="relative w-1/2 hidden lg:flex lg:max-h-screen bg-amber-50">
            <img
              src={signImg}
              alt="signImg"
              className="size-full object-cover "
            />

            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/20 to-zinc-950/10" />

            {/* Image Content */}
            <div className="absolute bottom-12 left-10 max-w-md">
              <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
                <span className="text-xs font-bold tracking-[0.2em] text-cyan-300">
                  4ORYOU
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight text-white xl:text-5xl">
                Find Your{" "}
                <span className="bg-linear-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Connection.
                </span>
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-300">
                Create your premium account and discover a better experience
                with 4orYou.
              </p>
            </div>
          </div>
          <div className="relative px-4 py-10 space-y-8 w-full lg:w-1/2 h-screen overflow-y-auto overflow-x-hidden scrollbar-none">
            <div className="absolute rounded-full -z-10 left-1/2 -translate-x-1/2 blur-3xl -top-150 size-200 bg-radial-[at_50%_110%] to-zinc-950 via-blue-500 via-40% from-blue-300"></div>
            <div className="actions rounded-full py-5 px-1.5 bg-zinc-800/80 w-fit flex justify-center items-center mx-auto">
              <div>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `rounded-full p-4 font-semibold transition-colors duration-200 ${
                      isActive ? "bg-blue-400 text-zinc-950" : "text-zinc-300"
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `rounded-full p-4 font-semibold transition-colors duration-200 ${
                      isActive ? "bg-blue-400 text-zinc-950" : "text-zinc-300"
                    }`
                  }
                >
                  Sign In
                </NavLink>
              </div>
            </div>
            <div className="flex justify-center">
              {/* form */}
              <div className="p-8 rounded-3xl max-w-lg flex-1  shadow-xl">
                <form
                  className="space-y-5"
                  onSubmit={handleSubmit}
                  method="POST"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-5xl font-black bg-linear-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                      4orYou
                    </h1>
                    <p className="text-zinc-300 font-semibold">
                      Welocome Back Again 👋
                    </p>
                  </div>
                  {/* email */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="email"
                      className="text-zinc-300 font-semibold text-sm"
                    >
                      Email
                    </label>
                    <div className="relative w-full">
                      <Mail
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                      />
                      <input
                        type="text"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="example@gmail.com"
                        name="email"
                        className="form-control"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 rounded-xl">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {/* password */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="password"
                      className="text-zinc-300 font-semibold text-sm"
                    >
                      Password
                    </label>
                    <div className="relative w-full">
                      <Lock
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                      />
                      <EyePassword
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          setPasswordShown(!passwordShown);
                        }}
                      />
                      <input
                        type={`${passwordShown ? "text" : "password"}`}
                        id="password"
                        placeholder="••••••••"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        className="form-control"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 rounded-xl">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={!(isValid && dirty)}
                      className="btn-primary w-full cursor-pointer flex justify-center disabled:bg-linear-to-r disabled:from-blue-800/50! disabled:to-blue-800/50! disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader className=" animate-spin" />
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
