"use client";
import React, { useState } from "react";

interface FormData {
  name1: string;
  name2: string;
  name3: string;
  name4: string;
  name5: string;
  name6: string;
  name7: string;
  name8: string;
}

const RecruitmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name1: "",
    name2: "",
    name3: "",
    name4: "",
    name5: "",
    name6: "",
    name7: "",
    name8: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen relative bg-black flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-700/30 via-black to-black" />
      <div className="absolute top-6 left-6 z-10">
        <img src="/images/aaruush25-white.png" alt="logo" className="w-70" />
      </div>
      <div className="absolute top-6 right-6 z-10">
        <button className="bg-zinc-800 text-white px-6 py-2 rounded-full text-sm hover:bg-zinc-700">
          Visit our Website
        </button>
      </div>
      <h2 className="text-white text-4xl font-bold mb-2 text-center z-10">Recruitment Form</h2>
      <p className="text-2xl text-white text-center z-10">
        Team <span className="text-orange-500 font-semibold">Envision</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 w-full max-w-4xl z-10"
      >
        {Object.entries(formData).map(([key, value], idx) => (
          <div key={key}>
            <label className="text-white block mb-1 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={value}
              onChange={(e) => handleChange(key as keyof FormData, e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>
        ))}
        <div className="col-span-1 sm:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-12 py-3 rounded-full transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentForm;