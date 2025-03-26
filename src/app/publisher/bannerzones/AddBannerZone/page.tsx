import { useAuth } from "@/context/context";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface BannerSize {
  id: number;
  width: number;
  height: number;
}

interface FormData {
  zoneName: string;
  placementSize: number;
  passbackAdTag: string;
  passbackUrl: string;
}

interface AddBannerZoneProps {
  fetchData: () => void;
  bannerList: BannerSize[];
}

export default function AddBannerZone({ fetchData, bannerList }: AddBannerZoneProps) {
  const auth = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerscript, setScript] = useState("");
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [addedZoneData, setAddedZoneData] = useState<FormData | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    setAddedZoneData(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setAddedZoneData(null);
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const mydata = {
      publisher_id: auth.publisherData?.id,
      passback_tag: data.passbackAdTag,
      passback_url: data.passbackUrl,
      placesize_id: Number(data.placementSize) || 0,
      name: data.zoneName,
    };

    try {
      const response = await fetch("/api/bannerzone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: mydata }),
      });

      const result = await response.json();
      console.log("result", result.response.created);
      const createdId = result.response.created;

     


      const selectedSize = bannerList.find(b => b.id === Number(data.placementSize));
      const width = selectedSize?.width;
      const height = selectedSize?.height;

      if (width && height) {
       const script= await axios.get(
          `https://panel.adsaro.com/admin/api/banner_code?type=js_ext&size=${width}x${height}&id=${createdId}&version=4&userToken=1wDtEkEz2ykyOdyx`
        );
        setScript(script.data.response.code);
        console.log("script",script.data.response.code)
      }

      fetchData();
      setAddedZoneData(data);
      setCurrentStep(2);
      reset();
    } catch (err) {
      console.error("Error submitting banner zone:", err);
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 text-white transition duration-500 ease-in-out bg-blue-500 border border-blue-500 rounded hover:text-blue-500 hover:bg-transparent"
          onClick={openModal}
        >
          Add New Zone
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {currentStep === 1 ? "Add New Banner Zone" : "Zone Created"}
              </h2>
              <button onClick={closeModal} className="text-xl text-red-500 hover:text-red-700">
                ✕
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto">
              {currentStep === 1 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Zone Name */}
                  <div>
                    <label htmlFor="zoneName" className="block mb-1 font-semibold">
                      Zone Name
                    </label>
                    <input
                      id="zoneName"
                      type="text"
                      className="w-full p-2 border rounded"
                      {...register("zoneName", { required: "Zone Name is required" })}
                    />
                    {errors.zoneName && (
                      <p className="mt-1 text-sm text-red-500">{errors.zoneName.message}</p>
                    )}
                  </div>

                  {/* Placement Size */}
                  <div>
                    <label htmlFor="placementSize" className="block mb-1 font-semibold">
                      Placement Size
                    </label>
                    <select
                      id="placementSize"
                      className="w-full p-2 border rounded"
                      {...register("placementSize", { required: "Placement size is required" })}
                    >
                      <option value="">Select Size</option>
                      {bannerList.length > 0 ? (
                        bannerList.map((banners) => (
                          <option key={banners.id} value={banners.id}>
                            {banners.width}×{banners.height}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading...</option>
                      )}
                    </select>
                    {errors.placementSize && (
                      <p className="mt-1 text-sm text-red-500">{errors.placementSize.message}</p>
                    )}
                  </div>

                  {/* Passback Ad Tag with Tooltip */}
                  <div className="relative">
                    <label htmlFor="passbackAdTag" className="block mb-1 font-semibold">
                      Passback Ad Tag{" "}
                      <span
                        className="text-gray-500 cursor-help"
                        onMouseEnter={() => setTooltipVisible(true)}
                        onMouseLeave={() => setTooltipVisible(false)}
                      >
                        ?
                      </span>
                    </label>
                    {tooltipVisible && (
                      <div className="absolute z-10 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow w-72">
                        Ad Tag that will be displayed if no banners are available
                      </div>
                    )}
                    <textarea
                      id="passbackAdTag"
                      rows={3}
                      className="w-full p-2 border rounded"
                      {...register("passbackAdTag")}
                    />
                    <p className="mt-1 text-sm text-gray-600">
                      Available macros:{" "}
                      <code>
                        {`{subid}, {cachebuster}, {pub_zone}, {pub_uri}, {pub_domain}, {pub_redirect}, {pub_*}`}
                      </code>
                    </p>
                  </div>

                  {/* Passback URL */}
                  <div>
                    <label htmlFor="passbackUrl" className="block mb-1 font-semibold">
                      Passback URL
                    </label>
                    <input
                      id="passbackUrl"
                      type="text"
                      className="w-full p-2 border rounded"
                      {...register("passbackUrl")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </form>
              )}

              {/* Step 2 - Summary */}
              {currentStep === 2 && addedZoneData && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    closeModal();
                  }}
                  className="space-y-6"
                >
                  <div className="pb-2 border-b">
                    <h3 className="mb-1 text-lg font-bold">Zone Created Successfully</h3>
                    <p className="text-sm text-gray-600">
                      Here's the information of the zone you just created.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <strong>Zone Name:</strong> {addedZoneData.zoneName}
                    </p>
                    <p>
                      <strong>Placement Size:</strong>{" "}
                      {
                        bannerList.find((b) => b.id === Number(addedZoneData.placementSize))
                          ?.width
                      }
                      ×
                      {
                        bannerList.find((b) => b.id === Number(addedZoneData.placementSize))
                          ?.height
                      }
                    </p>
                    <p>
                      <strong>Passback URL:</strong> {addedZoneData.passbackUrl}
                    </p>
                  </div>

                  <div>
  <label className="block mb-1 font-semibold">Script</label>
  <div className="relative">
    <div className="flex items-center justify-between mb-1">
      <button
        type="button"
        className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => {
          if (bannerscript) {
            navigator.clipboard.writeText(bannerscript);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
          }
        }}
      >
        Copy
      </button>
      {copied && (
        <span className="ml-2 text-sm font-medium text-green-600 transition-opacity duration-300">
          Copied!
        </span>
      )}
    </div>
    <pre className="p-3 overflow-auto text-sm whitespace-pre-wrap border bg-gray-50 max-h-60">
      {bannerscript ? bannerscript : "Loading.."}
    </pre>
  </div>
</div>



                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Confirm & Finish
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
