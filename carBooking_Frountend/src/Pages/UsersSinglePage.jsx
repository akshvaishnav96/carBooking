import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedAdmin } from "../slices/carSlice";
import HashLoader from "react-spinners/HashLoader";
import {toast} from "react-toastify"


import {
  clearInputs,
  inputHandler,
  setEmail,
  setLoggedUser,
  setMobile,
  setUsername,
  setrole,
} from "../slices/userSlice";
import { fetchHandler } from "../utils/handlers";

export default function UsersSinglePage() {
  const userData = useLoaderData();
  const user = userData.data.result;

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { email, username, mobile, role } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state) => state.user);
  const { loggedAdmin } = useSelector((state) => state.cars);

  useEffect(() => {
    let loggedData = JSON.parse(localStorage.getItem("user"));

    if (loggedData) {
      if (loggedData.role === "user") {
        navigate("/");
      }
    }

    if (!loggedData) {
      navigate("/login");
    }
  }, [loggedUser, loggedAdmin]);

  useEffect(() => {
    dispatch(clearInputs());
    dispatch(setEmail(user.email));
    dispatch(setMobile(user.mobile));
    dispatch(setUsername(user.username));
    dispatch(setrole(user.role));
  }, []);

  useEffect(() => {
    async function logginCheckHandler() {
      try {
        const logged = await fetchHandler("/api/v1/logincheck");

        if (logged.status === 401) {
          dispatch(setLoggedUser(""));
          dispatch(setLoggedAdmin(""));
          localStorage.removeItem("user");
          return;
        }

        if (logged.status === 200) {
          if (logged.data.result.role === "user") {
            dispatch(setLoggedUser(logged.data.result));
          }

          if (logged.data.result.role === "admin") {
            dispatch(setLoggedAdmin(logged.data.result));
          }

          localStorage.setItem("user", JSON.stringify(logged.data.result));
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    logginCheckHandler();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email)
      setError((prev) => {
        return { ...prev, email: "email is required" };
      });
    if (!username)
      setError((prev) => {
        return { ...prev, username: "username is required" };
      });

    if (!mobile)
      setError((prev) => {
        return { ...prev, mobile: "mobile is required" };
      });

    if (!role)
      setError((prev) => {
        return { ...prev, role: "user type is required" };
      });

    if (!email || !mobile || !username || !role) return;

    if (username) {
      const validatename = /^[a-zA-Z0-9_]+$/;
      const result = validatename.test(username);
      if (!result) {
        setError((prev) => {
          return {
            ...prev,
            username:
              "Enter valid username only alphabet, number's and _ allowed ",
          };
        });
        return;
      }
    }
    if (email) {
      const validEmailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const result = validEmailPattern.test(email);
      if (!result) {
        setError((prev) => {
          return { ...prev, email: "please Enter Valid Email" };
        });
        return;
      }
    }

    if (mobile) {
      if (mobile.length < 10 || mobile.length > 10) {
        setError((prev) => {
          return { ...prev, mobile: "mobile is must be 10 digit" };
        });
        return;
      }
    }

    const formData = {
      email,
      mobile,
      username,
      role,
    };

    setIsLoading(true);
    const response = await fetchHandler(
      `/api/v1/admin/users/${user._id}`,
      "patch",
      formData
    );
    setIsLoading(false);

    if (response.status < 400) {
      toast.success(response.data.msg);
      dispatch(clearInputs());
      navigate("/admin/users");
    } else {
      toast.error(response.response.data.msg);
    }
  }

  return (
    <>
      <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-2">
        <div className="m-auto w-full items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 w-full py-6 px-6 sm:px-16"
          >
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">
                Update {user.username} Detail's
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) =>
                      dispatch(
                        inputHandler({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                {error?.username && (
                  <p className="text-red-500">{error.username}</p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      dispatch(
                        inputHandler({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                  />
                </div>
                {error?.email && <p className="text-red-500">{error.email}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Enter Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    name="mobile"
                    type="number"
                    value={mobile}
                    onChange={(e) =>
                      dispatch(
                        inputHandler({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter mobile"
                  />
                </div>
                {error?.mobile && (
                  <p className="text-red-500">{error.mobile}</p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Type <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <select
                    onChange={(e) =>
                      dispatch(
                        inputHandler({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                    name="role"
                    id="role"
                    value={role}
                    className=" w-full py-2 px-5 border border-gray-200"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                {error?.role && <p className="text-red-500">{error.role}</p>}
              </div>
            </div>

            <div className="!mt-12">
              {isLoading ? (
                <HashLoader color="green" />
              ) : (
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-slate-700 hover:bg-gray-800 focus:outline-none"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
