"use client";

import React, { useState } from "react";
import { Camera, X, Edit3 } from "lucide-react";
import { Button } from "./ui/button";

function InfoRow({
  label,
  value,
  editable = false,
}: {
  label: string;
  value: string;
  editable?: boolean;
}) {
  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-300 last:border-b-0">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">{value}</span>
        {editable && (
          <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1 hover:underline">
            <Edit3 size={12} />
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProfileImage() {
  const [image, setImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23374151'/%3E%3Ccircle cx='64' cy='48' r='20' fill='%23D1D5DB'/%3E%3Cpath d='M64 72c-20 0-36 12-36 28v28h72V100c0-16-16-28-36-28z' fill='%23D1D5DB'/%3E%3C/svg%3E";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setTempImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempImage) setImage(tempImage);
    setIsModalOpen(false);
    setTempImage(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTempImage(null);
  };

  const handleReset = () => setTempImage(null);

  return (
    <div className="min-h-screen relative bg-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 relative">
        <div className="flex items-center px-6 py-12 space-x-6 max-w-6xl mx-auto">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-32 h-32 relative">
              <img
                src={image || defaultAvatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full cursor-pointer backdrop-blur-sm"
              >
                <Camera size={20} className="mb-1" />
                <span className="text-xs font-medium">Edit</span>
              </button>
            </div>
          </div>

          {/* Profile Text */}
          <div className="flex flex-col justify-center space-y-2">
            <h5 className="text-3xl font-bold text-white">Raksmey</h5>
            <p className="text-blue-200">LeetCode ID: SZaCO9LzYq</p>
          </div>
        </div>
      </div>

      {/* Basic Info card full white background */}
      <div className="relative py-4 -mt-15">
        <div
          className="bg-gray-200 p-6   rounded-lg py-10 shadow text-black w-full max-w-sm
  transition-transform transform hover:scale-105 duration-300 ease-in-out 
  shadow-[0_0_20px_0_rgba(107,114,128,0.5)] 
  hover:shadow-[0_0_30px_0_rgba(107,114,128,0.8)] mx-auto"
        >
          <h5 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-200 ">
            Basic Info
          </h5>

          <div className="space-y-1">
            <InfoRow label="Name" value="raksmey" />
            <InfoRow label="Gender" value="Female" />
            <InfoRow label="Birthday" value="23/04/2003" />
            <InfoRow label="Email" value="raksmey@gmail.com" />
            <InfoRow label="Password" value="••••••••" />
          </div>

          <h5 className="text-lg font-semibold mt-6 mb-4 text-gray-800 border-b border-gray-200 ">
            Social Accounts
          </h5>

          <div className="space-y-1">
            <InfoRow label="Website" value="Add your portfolio" editable />
            <InfoRow label="Github" value="Add Github profile" editable />
            <InfoRow label="LinkedIn" value="Add LinkedIn profile" editable />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-in fade-in duration-200 border border-gray-200">
            <Button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </Button>

            <h5 className="text-xl font-bold mb-6 text-gray-800">
              Upload a New Avatar
            </h5>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg">
                  {tempImage ? (
                    <img
                      src={tempImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : image ? (
                    <img
                      src={image}
                      alt="Current"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={defaultAvatar}
                      alt="Default"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {tempImage && (
                  <button
                    onClick={handleReset}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transition-colors"
                    title="Reset"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center mb-6">
              <label className="cursor-pointer flex items-center gap-3 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group w-full justify-center">
                <Camera
                  size={20}
                  className="text-gray-500 group-hover:text-blue-500"
                />
                <span className="text-gray-600 group-hover:text-blue-600 font-medium">
                  Choose Image...
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
