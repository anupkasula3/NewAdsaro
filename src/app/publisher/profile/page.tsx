"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Page = () => {
  const [data, SetData] = useState<any>({});
  const [hideNotifications, setHideNotifications] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const toggleSwitch = () => {
    setHideNotifications((prev) => !prev);
  };
  // Function to handle input changes
  const handleInputChange = (field: string, value: string) => {
    SetData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  let storedToken = null;

if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
  storedToken = localStorage.getItem("session_token");
}

  console.log("Session ssssssssstoken", storedToken);

  const updateData = async () => {
    try {
      const response = await fetch("/api/proxy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storedToken: storedToken,
          data: {
            name: data.name,
            email: data.email,
            website: data.website,
            website_descr:data.website_descr,
            company: data.company,
            phone: data?.phone,
            skype_id:data?.skype_id,
            address_state:data?.address_state,
            address_city:data?.address_city,
            address_zip:data?.address_zip,
            address_street:data?.address_street,
            password_current: data?.password_current,
            password_repeat: data?.password_repeat,
            password: data?.password,
          },
        }),
      });
  
      const result = await response.json();
      
      console.log(result , "aabiresult");

      // if (result){

      //   if (setError) {
      //     if (result.message.includes("name=May not be empty")) {
      //       console.log(result , "insideresult");
  
      //       setError("name", { message: "Name is required" });
      //     }
      //   }
      // }
   
  
      console.log("Updated Data:", result);
    } catch (err) {
      console.error("Error updating data", err);
    }
  };
  

  console.log("Session ssssasdasdasdasdasdasdn", storedToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://panel.adsaro.com/publisher/api/Account?version=4&token=${storedToken}`
        );
        console.log(response.data);
        SetData(response.data.response.rows[0]);
        const userData = response.data.response.rows[0];
        setHideNotifications(userData.hide_notifications);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>

    
<div className="flex h-screen  font-sans">

<div className="flex-1 flex flex-col overflow-hidden">

  <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white shadow-xl rounded-lg border border-gray-300 overflow-hidden my-5">
          <div className="px-6 py-5 sm:px-6">
            <h3 className="text-3xl font-semibold text-gray-800">Main Info</h3>
            <p className="mt-2 text-lg text-gray-600">
              Detailed information about {data?.name}.
            </p>
          </div>
          <div className="border-t border-gray-200 px-6 py-5 sm:p-6">
            <dl className="space-y-6 sm:space-y-5">
              {/* Full Name */}
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}  

                </dd>
              </div>

              {/* Email Address */}
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                  Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="email"
                    value={data?.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">Website</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.website || ""}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">Website Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.website_descr || ""}
                    onChange={(e) =>
                      handleInputChange("website_descr", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">Company</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.company || ""}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">Login</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.login || ""}
                   disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">Country</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.address_country || ""}
                    onChange={(e) =>
                      handleInputChange("address_country", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">Login</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.login || ""}
                    onChange={(e) => handleInputChange("login", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                  Current Password
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    value={data?.password_current || ""}
                    onChange={(e) =>
                      handleInputChange("password_current", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                  New Password
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    value={data?.password || ""}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                  Confirm new password
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    value={data?.password_repeat || ""}
                    onChange={(e) =>
                      handleInputChange("password_repeat", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                  Skype Id
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.skype_id || ""}
                    onChange={(e) =>
                      handleInputChange("skype_id", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>


              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                State                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.address_state || ""}
                    onChange={(e) =>
                      handleInputChange("address_state", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                City                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.address_city || ""}
                    onChange={(e) =>
                      handleInputChange("address_city", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>



              

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                Zip              </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.address_zip || ""}
                    onChange={(e) =>
                      handleInputChange("address_zip", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                Street             </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.address_street || ""}
                    onChange={(e) =>
                      handleInputChange("address_street", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>


              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-gray-600">
                  Stats password?
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={data?.password_stats || ""}
                    onChange={(e) =>
                      handleInputChange("password_stats", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </dd>
              </div>

              {/* <div className="mt-4">
                <label className="flex items-center p-2 text-xl cursor-pointer">
                  Compact design theme ?
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={hideNotifications}
                    onChange={toggleSwitch}
                  />
                  <span
                    className={`w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 rounded-full transition-all duration-300 ${
                      hideNotifications ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        hideNotifications ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></span>
                  </span>
                </label>
              </div> */}
            </dl>
          </div>

          {/* Submit Button */}
          <div className="px-6 py-4 sm:px-6">
            <button
              onClick={updateData}
              className="flex justify-center mx-auto items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
</div>

    

      </div>
    </>
  );
};

export default Page;
