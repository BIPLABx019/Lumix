import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
  });

  const {
    mutate: signupMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      console.log("User signed up successfully");
      navigate("/login");
    },
  });

  const handleSignup = (event) => {
    event.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="dark"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          {error && (
            <div className="alert alert-error mb-4">
              <span>
                {error.response?.data?.message ||
                  error.message ||
                  "Something went wrong"}
              </span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block mb-2">Username</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={signupData.userName}
                onChange={(e) =>
                  setSignupData({ ...signupData, userName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log In
            </Link>
          </p>
        </div>

        <div className="w-[70%]">
          <img
            src="/images/signup-illustration.svg"
            alt="Sign Up Illustration"
            className="w-full h-full hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
