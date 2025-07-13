// src/app/Team_Envision_recruitment/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast'; // ✅ FIX 1: Import react-hot-toast

import API from "../../services/axios"; 
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import LenisWrapper from "../components/LenisWrapper";
import LogoTransition from "../components/LogoTransition";
import { useLogoNavigation } from "../components/Hooks/useLogoNavigation";
import envisionOptions from "../../data/envision.json";

const formSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  regNumber: z.string().min(1, "Registration number is required"),
  branch: z.string().min(1, "Branch is required"),
  year: z.string().min(1, "Year is required"),
  email: z.string().email().min(1, "Email is required"),
  srmEmail: z.string().email("Invalid email address").regex(/^[\w-\.]+@srmist\.edu\.in$/, "Enter a valid SRM Email").min(1, "SRM Email is required"),
  phoneNumber: z.string().regex(/^[6789]\d{9}$/, "Invalid phone number").length(10, "Must be 10 digits"),
  whatsappNumber: z.string().regex(/^[6789]\d{9}$/, "Invalid WhatsApp number").length(10, "Must be 10 digits"),
  linkedIn: z.string().url("Invalid URL").min(1, "LinkedIn is required"),
  github: z.string().optional(),
  expertise1: z.string().min(1, "Required"),
  expertise2: z.string().min(1, "Required"),
  portfolio: z.string().optional(),
  other: z.string().optional(),
  preference1: z.string().min(1, "Preference 1 required"),
  preference2: z.string().min(1, "Preference 2 required"),
});

type FormData = z.infer<typeof formSchema>;

// ✅ FIX 2: Initialize with empty strings to prevent validation bugs
const defaultValues: FormData = {
  name: "", regNumber: "", branch: "", year: "", email: "", srmEmail: "",
  phoneNumber: "", whatsappNumber: "", linkedIn: "", github: "",
  expertise1: "", expertise2: "", portfolio: "", other: "",
  preference1: "", preference2: "",
};

const innerFieldStyle = "w-full px-3 py-3 sm:px-4 sm:py-5 rounded-xl bg-neutral-900 backdrop-blur-sm border border-neutral-950 text-white placeholder:text-white/70 text-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-1 focus:ring-orange-500 transition";
const gradientWrapperStyle = "p-px rounded-xl bg-gradient-to-b from-neutral-500 to-neutral-700 hover:from-orange-500 hover:to-orange-800 transition";

export default function TeamEnvisionRecruitmentPage() {
  const [isLoading, setIsLoading] = useState(false);
  // ✅ FIX 3: Removed the old useState for messages
  const form = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues });
  const { isTransitioning, targetUrl, navigateToMain, onAnimationStart } = useLogoNavigation();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // ✅ FIX 4: Use react-hot-toast for submission feedback
    const toastId = toast.loading('Submitting your application...');
    try {
      const response = await API.post("/cfa/users/envision", { data });
      toast.success(response.data.message || "Application submitted successfully!", { id: toastId });
      form.reset(); 
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(`Submission failed: ${errorMessage}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (errors: any) => {
    console.error("Form validation failed:", errors);
    toast.error("Please fill all required fields correctly.");
  };

  return (
    <LenisWrapper>
      <div className="min-h-screen relative bg-black flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        {/* background, logo, and other elements are unchanged */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700/30 via-black to-black" />
        <div className="absolute -bottom-60 right-1/2 translate-x-1/2 w-80 h-72 bg-gradient-to-tl from-orange-500/60 to-transparent rounded-full blur-3xl z-0" />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <button onClick={navigateToMain} className="hover:opacity-80"><Image src="/images/a.png" alt="logo" width={200} height={64} className="w-[180px] sm:w-[250px] h-auto"/></button>
        </div>
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 max-w-[60vw] sm:max-w-none">
          <div className="px-0 py-[2px] rounded-full bg-gradient-to-b from-neutral-500 to-neutral-800">
            <Button variant="secondary" className="rounded-full px-5 py-2 sm:py-3 lg:py-4 bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 transition text-[10px] sm:text-sm md:text-base whitespace-nowrap truncate" onClick={() => window.open("https://aaruush.org", "_blank")}>Visit Our Website</Button>
          </div>
        </div>
        <h2 className="text-white text-3xl sm:text-5xl font-bold mb-2 text-center z-10 mt-10">Recruitment Form</h2>
        <p className="text-xl sm:text-4xl text-white text-center z-10 mt-4 sm:mt-7">Team <span className="text-orange-500 font-semibold">Envision</span></p>
        
        {/* ✅ FIX 5: Removed the old message display div */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-12 mt-8 w-full max-w-5xl z-10 px-2 sm:px-0">
            {/* All form fields are unchanged and correct */}
            <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Name</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your name" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="regNumber" render={({ field }) => ( <FormItem><FormLabel>Registration Number</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your registration number" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="branch" render={({ field }) => ( <FormItem><FormLabel>Branch</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your branch" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="year" render={({ field }) => ( <FormItem><FormLabel>Year</FormLabel><div className={gradientWrapperStyle}><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder="Select Year" /></SelectTrigger></FormControl><SelectContent className="min-w-[var(--radix-select-trigger-width)] bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-white rounded-xl shadow-lg"><SelectItem value="1" className="focus:bg-orange-500/20 focus:text-white">1st Year</SelectItem><SelectItem value="2" className="focus:bg-orange-500/20 focus:text-white">2nd Year</SelectItem><SelectItem value="3" className="focus:bg-orange-500/20 focus:text-white">3rd Year</SelectItem></SelectContent></Select></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Personal Email</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your email" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="srmEmail" render={({ field }) => ( <FormItem><FormLabel>SRM Email</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your SRM email" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="phoneNumber" render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your phone number" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="whatsappNumber" render={({ field }) => ( <FormItem><FormLabel>WhatsApp Number</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your WhatsApp number" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="preference1" render={({ field }) => ( <FormItem><FormLabel>Preference 1</FormLabel><div className={gradientWrapperStyle}><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder="Select Preference 1" /></SelectTrigger></FormControl><SelectContent className="min-w-[var(--radix-select-trigger-width)] bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-white rounded-xl shadow-lg">{envisionOptions.map(opt => (<SelectItem key={opt.value} value={opt.value} className="focus:bg-orange-500/20 focus:text-white">{opt.label}</SelectItem>))}</SelectContent></Select></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="preference2" render={({ field }) => ( <FormItem><FormLabel>Preference 2</FormLabel><div className={gradientWrapperStyle}><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder="Select Preference 2" /></SelectTrigger></FormControl><SelectContent className="min-w-[var(--radix-select-trigger-width)] bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-white rounded-xl shadow-lg">{envisionOptions.map(opt => (<SelectItem key={opt.value} value={opt.value} className="focus:bg-orange-500/20 focus:text-white">{opt.label}</SelectItem>))}</SelectContent></Select></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="expertise1" render={({ field }) => ( <FormItem><FormLabel>Expertise in Preference 1</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Describe your expertise" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="expertise2" render={({ field }) => ( <FormItem><FormLabel>Expertise in Preference 2</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Describe your expertise" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="linkedIn" render={({ field }) => ( <FormItem><FormLabel>LinkedIn</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your LinkedIn URL" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="github" render={({ field }) => ( <FormItem><FormLabel>GitHub (Optional)</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your GitHub URL" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="portfolio" render={({ field }) => ( <FormItem><FormLabel>Portfolio (Optional)</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your portfolio URL" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="other" render={({ field }) => ( <FormItem><FormLabel>Other Projects (Optional)</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Any other projects / links" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            
            <div className="col-span-1 sm:col-span-2 flex justify-center mt-4 sm:mt-6"><div className="px-0 py-px rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900"><Button type="submit" disabled={isLoading} className="px-10 sm:px-16 py-3 sm:py-5 rounded-full bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold text-sm sm:text-md border border-white/30 shadow-inner transition disabled:opacity-50">{isLoading ? "Submitting..." : "Submit"}</Button></div></div>
          </form>
        </Form>
        {isTransitioning && <LogoTransition targetUrl={targetUrl} onAnimationStart={onAnimationStart} isActive={isTransitioning}/>}
      </div>
    </LenisWrapper>
  );
}
