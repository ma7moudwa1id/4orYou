import {
  User,
  Lock,
  Camera,
  EyeOff,
  UserCircle,
  Mail,
  Shield,
  Image,
  Upload,
  X,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { userContext } from "../../Components/user.context/UserContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "sonner";
export default function Settings() {
  const { userData, token, fetchUserdata, setToken } = useContext(userContext);

  const [changePreview, setChangePreview] = useState(null);

  //  * profileSchema
  const profileSchema = yup.object({
    photo: yup
      .mixed()
      .nullable()
      .test("fileType", "upload image like jpg,jpeg,png", (file) => {
        if (!file) return true;
        if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
          return true;
        } else return false;
      })
      .test("fileSize", "size cann't more then 5mg", (file) => {
        if (!file) return true;
        if (file.size < 5 * 1024 * 1024) {
          return true;
        } else return false;
      }),
  });
  //  * profileFormik
  const {
    values: profileValues,
    dirty: profileDirty,
    handleBlur: profileBlur,
    handleSubmit: profileSubmit,
    handleChange: profileChange,
    isValid: profileValid,
    errors: profileErrors,
    setFieldValue: profileSetValue,
    touched: profileTouched,
  } = useFormik({
    initialValues: {
      photo: null,
    },

    validationSchema: profileSchema,

    validateOnMount: true,

    onSubmit: async (profileValues, { resetForm }) => {
      try {
        const myform = new FormData();
        if (profileValues.photo) {
          myform.append("photo", profileValues.photo);
        }
        const { data } = await axios.request({
          url: `https://route-posts.routemisr.com/users/upload-photo`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: myform,
        });
        if (data.success) {
          toast.success(data.message);
          profileSetValue("photo", null);
          setChangePreview(null);
          fetchUserdata();
        }
      } catch (error) {
        console.log({ error });
      }
    },
  });

  useEffect(() => {
    if (profileErrors.photo) {
      setChangePreview(null);
    }
  }, [profileErrors.photo]);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const [passwordShown, setPasswordShown] = useState(false);
  const PasswordIcon = passwordShown ? Eye : EyeOff;
  const [newpasswordShown, setNewPasswordShown] = useState(false);
  const NewPasswordIcon = newpasswordShown ? Eye : EyeOff;
  // ^ passwordSchema
  const passwordSchema = yup.object({
    password: yup.string().required("the current password is required"),
    newPassword: yup
      .string()
      .required("the newPassword is required")
      .matches(passwordRegex),
  });

  // ^ passwordFormik
  const {
    values: passwordValues,
    handleBlur: passwordBlur,
    handleSubmit: passwordSubmit,
    handleChange: passwordChange,
    setFieldValue: passwordSetValue,
    touched: passwordTouched,
    isValid: passwordValid,
    dirty: passwordDirty,
    errors: passwordErrors,
  } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },

    validationSchema: passwordSchema,

    onSubmit: async (passwordValues) => {
      try {
        const { data } = await axios.request({
          url: "https://route-posts.routemisr.com/users/change-password",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: passwordValues,
        });
        if (data.success) {
          toast.success(data.message);
          setToken(null);
          localStorage.setItem("token", null);
        }
      } catch (error) {
        console.log({ error });
      }
    },
  });

  return (
    <div className="container mx-auto lg:ml-70.5 p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-2xl border border-zinc-700">
          <Shield className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Settings</h1>
          <p className="text-sm text-zinc-400">
            Manage your profile and security preferences
          </p>
        </div>
      </div>

      {/* ── Profile Section ─────────────────────────────────────────────────── */}
      <div className="bg-linear-to-br from-zinc-800 to-zinc-900/60 rounded-3xl shadow-lg border border-zinc-700 p-6 md:p-8 space-y-6">
        <form onSubmit={profileSubmit} className="space-y-5">
          {/* Section Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-700">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-bold text-zinc-100">
              Profile Settings
            </h2>
          </div>

          {/* Avatar + Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Preview */}
            <div className="group shrink-0">
              <div className="relative w-28 h-28 rounded-full border-4 border-zinc-700 overflow-hidden bg-zinc-800">
                {userData ? (
                  <img
                    src={userData.photo}
                    alt="Profile"
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center">
                    <UserCircle className="w-16 h-16 text-zinc-600" />
                  </div>
                )}

                {/* changePreview */}

                {changePreview && (
                  <div className="absolute inset-0 bg-zinc-800 overflow-hidden group">
                    <img
                      src={changePreview}
                      alt="avatar"
                      className="size-full object-cover"
                    />
                    <div
                      className="absolute hidden inset-0 bg-zinc-950/50 group-hover:flex justify-center items-center transition-all duration-200 cursor-pointer"
                      onClick={() => {
                        setChangePreview(null);
                        profileSetValue("photo", null);
                      }}
                    >
                      <X size={40} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload controls */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Image className="w-4 h-4" />
                <span>Change profile photo</span>
              </div>
              <input
                type="file"
                accept="image/*"
                id="avatarUpload"
                className="hidden"
                onBlur={profileBlur}
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  profileSetValue("photo", file || null);
                  if (file) {
                    const photo = URL.createObjectURL(file);
                    setChangePreview(photo);
                  }
                }}
              />
              <label
                htmlFor="avatarUpload"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 hover:border-zinc-500 text-zinc-200 font-semibold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/50"
              >
                <Upload className="w-4 h-4" />
                Upload Photo
              </label>
            </div>
            {profileErrors.photo && profileTouched.photo && (
              <p className="p-1 px-2 rounded-xl bg-red-400 text-red-900 font-semibold">
                {profileErrors.photo}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={!(profileDirty && profileValid)}
            type="submit"
            className="btn-primary w-full sm:w-auto sm:px-10 cursor-pointer flex justify-center items-center gap-2 disabled:bg-linear-to-r disabled:from-blue-800! disabled:to-blue-800! disabled:cursor-not-allowed!"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* ── Security Section ────────────────────────────────────────────────── */}
      <div className="bg-linear-to-br from-zinc-800 to-zinc-900/60 rounded-3xl shadow-lg border border-zinc-700 p-6 md:p-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-700">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <Lock className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-lg font-bold text-zinc-100">
            Security &amp; Password
          </h2>
        </div>

        {/* Security Form */}
        <form onSubmit={passwordSubmit} className="space-y-5">
          {/* Current Password */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="currentPassword"
              className="text-zinc-300 font-semibold text-sm"
            >
              Current Password
            </label>
            <div className="relative w-full">
              <Lock
                size={25}
                color="#797f8b"
                strokeWidth={2.5}
                className="absolute top-1/2 left-3 -translate-y-1/2"
              />
              <PasswordIcon
                onClick={() => {
                  setPasswordShown(!passwordShown);
                }}
                size={25}
                color="#797f8b"
                strokeWidth={2.5}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              />
              <input
                type={`${passwordShown ? "text" : "password"}`}
                id="currentPassword"
                name="password"
                value={passwordValues.password}
                onChange={passwordChange}
                onBlur={passwordBlur}
                placeholder="••••••••"
                className="form-control pl-12 pr-12"
              />
            </div>
            {passwordErrors.password && passwordTouched.password && (
              <p className="mt-2 p-1 px-2 font-semibold text-sm rounded-xl bg-red-400 text-red-900">
                {passwordErrors.password}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="newPassword"
              className="text-zinc-300 font-semibold text-sm"
            >
              New Password
            </label>
            <div className="relative w-full">
              <Lock
                size={25}
                color="#797f8b"
                strokeWidth={2.5}
                className="absolute top-1/2 left-3 -translate-y-1/2"
              />
              <NewPasswordIcon
                onClick={() => {
                  setNewPasswordShown(!newpasswordShown);
                }}
                size={25}
                color="#797f8b"
                strokeWidth={2.5}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              />
              <input
                type={`${newpasswordShown ? "text" : "password"}`}
                id="newPassword"
                name="newPassword"
                value={passwordValues.newPassword}
                onChange={passwordChange}
                onBlur={passwordBlur}
                placeholder="••••••••"
                className="form-control pl-12 pr-12"
              />
            </div>
            {passwordErrors.newPassword && passwordTouched.newPassword && (
              <p className="mt-2 p-1 px-2 font-semibold text-sm rounded-xl bg-red-400 text-red-900">
                {passwordErrors.newPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto sm:px-10 cursor-pointer flex justify-center items-center gap-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
