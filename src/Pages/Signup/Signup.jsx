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
import React, { useState } from "react";
import signImg from "../../assests/images/Man_portrait_with_water_droplets_202608202146.jpeg";
import { data, Link, NavLink, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "sonner";
export default function Signup() {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const [passwordShown, setPasswordShown] = useState(false);
  const EyePassword = passwordShown ? Eye : EyeOff;
  const [repasswordShown, setRePasswordShown] = useState(false);
  const EyeRePassword = repasswordShown ? Eye : EyeOff;

  const [emailExists, setEmailExists] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const navigate = useNavigate();

  // const [email]

  const schema = yup.object({
    name: yup
      .string()
      .required("full name is required")
      .min(3, "full name must be at least 3 chracteres"),
    username: yup
      .string()
      .required("username is required")
      .min(6, "username must be at least 6 chracteres"),
    email: yup.string().required("email is required").email("email is invalid"),
    gender: yup
      .string()
      .required("choose your gender")
      .oneOf(["male", "female"]),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "Password must be 8+ characters with uppercase, lowercase, number, and special character.",
      ),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")]),
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
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },

    validationSchema: schema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.request({
          url: "https://route-posts.routemisr.com/users/signup",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: values,
        });
        if (data.success) {
          toast.success(data.message);
          const x = setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        if (error.response.data.message === "user already exists.") {
          setEmailExists(true);
          setUserExists(true);
        }
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
              <div className="p-8 bg-transparent rounded-3xl max-w-lg flex-1  shadow-xl ">
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
                      Create Your Premium Account
                    </p>
                  </div>
                  {/* full name */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="name"
                      className="text-zinc-300 font-semibold text-sm"
                    >
                      Full Name
                    </label>
                    <div className="relative w-full">
                      <User
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                      />
                      <input
                        type="text"
                        placeholder="Mohammed Ali"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="name"
                        className="form-control"
                      />
                    </div>
                    {errors.name && touched.name && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 rounded-xl">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  {/* user name */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="username"
                      className="text-zinc-300 font-semibold text-sm"
                    >
                      User Name
                    </label>
                    <div className="relative w-full">
                      <UserCircle
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                      />
                      <input
                        type="text"
                        id="username"
                        value={values.usename}
                        onChange={(e) => {
                          handleChange(e);
                          setUserExists(false);
                        }}
                        onBlur={handleBlur}
                        placeholder="mohamed_ali205"
                        name="username"
                        className="form-control"
                      />
                    </div>
                    {(errors.username || userExists) && touched.username && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 rounded-xl">
                        {errors.username || "username already exists"}
                      </p>
                    )}
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
                        onChange={(e) => {
                          (handleChange(e), setEmailExists(false));
                        }}
                        onBlur={handleBlur}
                        placeholder="example@gmail.com"
                        name="email"
                        className="form-control"
                      />
                    </div>
                    {(errors.email || emailExists) && touched.email && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 rounded-xl">
                        {errors.email || "email is already exists"}
                      </p>
                    )}
                  </div>
                  {/* calendar */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="dateOfBirth"
                      className="text-zinc-300 font-semibold text-sm"
                    >
                      Calendar
                    </label>
                    <div className="relative w-full">
                      <Calendar
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                      />
                      <input
                        type="date"
                        id="dateOfBirth"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="dateOfBirth"
                        className="form-control"
                      />
                    </div>
                    {errors.dateOfBirthL && touched.dateOfBirthL && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 rounded-xl">
                        {errors.dateOfBirthL}
                      </p>
                    )}
                  </div>
                  {/* gender */}
                  <div>
                    <div className="flex gap-4 ">
                      <div className="flex gap-2 items-center justify-center w-full">
                        <input
                          type="radio"
                          name="gender"
                          id="male"
                          value={"male"}
                          checked={values.gender === "male"}
                          onChange={(e) => setFieldValue("gender", "male")}
                          onBlur={handleBlur}
                          className="peer hidden"
                        />
                        <label
                          className="flex gap-2 items-center justify-center gender peer-checked:border-blue-500! group"
                          htmlFor="male"
                        >
                          <div className="flex gap-2">
                            <span className="text-zinc-300 font-semibold text-sm">
                              Male
                            </span>
                            <Mars size={25} color="#4576a7" strokeWidth={2.5} />
                          </div>
                        </label>
                      </div>
                      <div className="flex gap-2 items-center justify-center w-full">
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          value={"female"}
                          checked={values.gender === "female"}
                          onChange={(e) => setFieldValue("gender", "female")}
                          onBlur={handleBlur}
                          className="peer hidden"
                        />
                        <label
                          className="flex gap-2 items-center justify-center gender peer-checked:border-blue-500! group"
                          htmlFor="female"
                        >
                          <div className="flex gap-2">
                            <span className="text-zinc-300 font-semibold text-sm">
                              Female
                            </span>
                            <Venus
                              size={25}
                              color="#f56565"
                              strokeWidth={2.5}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    {errors.gender && touched.gender && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 rounded-xl">
                        {errors.gender}
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
                  {/* rePassword */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="rePassword"
                      className="text-zinc-300 font-semibold text-sm"
                    >
                      confirmPassword
                    </label>
                    <div className="relative w-full">
                      <Lock
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                      />
                      <EyeRePassword
                        size={25}
                        color="#797f8b"
                        strokeWidth={2.5}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          setRePasswordShown(!repasswordShown);
                        }}
                      />
                      <input
                        type={`${repasswordShown ? "text" : "password"}`}
                        id="rePassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="••••••••"
                        name="rePassword"
                        className="form-control"
                      />
                    </div>
                    {errors.rePassword && touched.rePassword && (
                      <p className="mt-2 text-red-900 font-bold text-xs bg-red-400 p-1.5 px-2 rounded-xl">
                        {errors.rePassword}
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
                        "Sign Up"
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
