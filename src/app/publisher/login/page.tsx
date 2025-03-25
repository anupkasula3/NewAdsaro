"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import logo from "../../../../public/logo.png";

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/context";
import Image from "next/image";

type FormValues = {
  username: string;
  password: string;
  captcha: string;
};

export default function SignupForm() {
  const router = useRouter();
  const auth = useAuth();

  const [passVisible, setPassVisible] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const recaptchaRef = useRef(null);

  const {
    register,
    setError,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>();

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value || ""); // Handle null case
  };

  const onSubmit = async (data: FormValues) => {
    console.log("object", captchaValue);

    if (!captchaValue) {
      setError("captcha", {
        type: "custom",
        message: "Please complete the ReCAPTCHA",
      });
      return;
    }
    const username = data.username;
    const password = data.password;

    const response = await axios.get(
      `https://panel.adsaro.com/publisher/login_service?action=login&login=${username}&password=${password}&captcha=${captchaValue}`
    );
    if (response.data.status == "OK") {
      if (auth?.login && typeof auth.login === "function") {
        auth.login(response.data.authToken,"Publisher"); 
      } else {
        console.error("auth.login is not a function.");
      }

      router.push("/publisher/dashboard");

      console.log("OKOKA:", response.data.authToken);
    }
   

    if (response.data.status == "Error")
      console.log("Form Data:", response.data);
    {
      if (response?.data?.errors?.globalErrors) {
        setError("username", {
          type: "custom",
          message: response?.data?.errors?.globalErrors,
        });
      }
      if (response?.data?.errors?.fieldErrors?.login) {
        setError("username", {
          type: "custom",
          message: "Username " + response?.data?.errors?.fieldErrors?.login,
        });
      }
      if (response?.data?.errors?.fieldErrors?.password) {
        setError("password", {
          type: "custom",
          message: response?.data?.errors?.fieldErrors?.password,
        });
      }
    }
  };

  return (
    <div className="pt-5 flex items-center py-14 bg-white text-zinc-900">
      <section className="flex mx-auto justify-center items-center  px-4">
        <div className="w-full  bg-white shadow-lg rounded-2xl p-8">
          {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Log In
            </h2> */}
          <div className="flex justify-center mx-auto ">
            <Image alt="logo" width={200} src={logo} />
          </div>
          <div className="text-center text-sm my-3  font-semibold text-[#4f528e]">
            Welcome Back ! Please Login to Your Account
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required.",
                })}
                className={`w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400 ${
                  errors.username
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50"
                }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={passVisible ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  className={`text-xs py-4 px-2 border ${
                    errors.password
                      ? "border-red-600 bg-red-50"
                      : "border-gray-300 w-full bg-blue-50    px-4 p-2 rounded-lg"
                  } placeholder:text-slate-500 w-full`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute top-4 right-2"
                  onClick={() => setPassVisible(!passVisible)}
                >
                  {passVisible ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={"6LdRRtIqAAAAAIDR3J2PIKsAzbD1VhJeoxaCDmhK"}
              onChange={handleCaptchaChange}
            />
             {errors.captcha && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.captcha.message}
                </p>
              )}

            <button
              type="submit"
              className="w-full bg-[#4f528e] hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
            >
              Log In
            </button>

            <div className="flex justify-between text-sm text-gray-600 mt-4">
              <a href="#" className="hover:text-[#4f528e]">
                Create an account
              </a>
              <a href="#" className="hover:text-[#4f528e]">
                Forgot password?
              </a>
            </div>
            <hr />
            <div className="">
              <div className=" text-center font-medium hover:underline cursor-pointer text-gray-600 hover:text-[#4f528e]">
                Privacy Policy
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
