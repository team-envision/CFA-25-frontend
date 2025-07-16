"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";

import API from "../../services/axios";
import { useRecruitmentNavigation } from "../components/Hooks/useRecruitmentNavigation";
import RecruitmentPageTransition from "../components/RecruitmentPageTransition";
import LogoTransition from "../components/LogoTransition";
import { useLogoNavigation } from "../components/Hooks/useLogoNavigation";
import LenisWrapper from "../components/LenisWrapper";

import committeesOptions from "../../data/committes.json";
import domainsOptions from "../../data/domains.json";
import teamsOptions from "../../data/teams.json";

// 🟢 Enhanced schema with custom validation for preferences
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  regNumber: z.string().min(1, "Registration number is required"),
  branch: z.string().min(1, "Branch is required"),
  year: z.string().min(1, "Please select your year"),
  email: z.string().email("Invalid email").min(1, "Email is required").trim().toLowerCase(),
  srmEmail: z.string().email("Invalid SRM email").min(1, "SRM email is required").regex(/^[\w-\.]+@srmist\.edu\.in$/, "Enter a valid SRM Email").trim().toLowerCase(),
  phoneNumber: z.string().min(10, "Must be 10 digits").max(10, "Must be 10 digits").regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  whatsappNumber: z.string().min(10, "Must be 10 digits").max(10, "Must be 10 digits").regex(/^[6-9]\d{9}$/, "Invalid WhatsApp number"),
  preference1: z.string().min(1, "Preference 1 is required"),
  preference2: z.string().min(1, "Preference 2 is required"),
}).refine((data) => data.preference1 !== data.preference2, {
  message: "Preference 1 and Preference 2 cannot be the same",
  path: ["preference2"], // Show error on preference2 field
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  name: "", regNumber: "", branch: "", year: "",
  email: "", srmEmail: "", phoneNumber: "", whatsappNumber: "",
  preference1: "", preference2: "",
};

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" }
];
const allGroupedOptions = [
  { label: "Teams", options: teamsOptions },
  { label: "Committees", options: committeesOptions },
  { label: "Domains", options: domainsOptions }
];

const RecruitmentForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues });

  const pref1 = form.watch("preference1");
  const pref2 = form.watch("preference2");

  const { isTransitioning: isRecruitmentTransitioning, ...recruitmentNav } = useRecruitmentNavigation();
  const { isTransitioning: isLogoTransitioning, ...logoNav } = useLogoNavigation();

  // 🟢 Clear preference2 if it matches preference1
  useEffect(() => {
    if (pref1 && pref2 && pref1 === pref2) {
      form.setValue("preference2", "");
      toast.warning("Preference 2 cleared - cannot be the same as Preference 1");
    }
  }, [pref1, pref2, form]);

  const handleClick = () => recruitmentNav.navigateToRecruitment("envision_recruitment");
  const handleLogoClick = () => logoNav.navigateToMain();

  const onSubmit = async (data: FormData) => {
    // 🟢 Additional client-side check before submission
    if (data.preference1 === data.preference2) {
      toast.error("Preference 1 and Preference 2 cannot be the same");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your application...");
    try {
      await API.post("/cfa/users", { data });
      toast.success("User added successfully!", { id: toastId });
      form.reset();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(`Submission failed: ${errorMessage}`, { id: toastId });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (errors: any) => {
    console.error("Form validation failed:", errors);
    
    // 🟢 Check for preference conflict in validation errors
    if (errors.preference2?.message?.includes("cannot be the same")) {
      toast.error("Please select different preferences for Preference 1 and Preference 2");
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  // 🟢 Filter grouped options to prevent duplicate selection
  const getFilteredGroupedOptions = (excludeValue: string) => {
    return allGroupedOptions.map(group => ({
      ...group,
      options: group.options.filter(opt => opt.value !== excludeValue)
    })).filter(group => group.options.length > 0); // Remove empty groups
  };

  const innerFieldStyle = "w-full px-3 py-3 sm:px-4 sm:py-5 rounded-xl bg-neutral-900 backdrop-blur-sm border border-neutral-950 text-white placeholder:text-white/70 text-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-1 focus:ring-orange-500 transition";
  const gradientWrapperStyle = "p-px rounded-xl bg-gradient-to-b from-neutral-500 to-neutral-700 hover:from-orange-500 hover:to-orange-800 transition";
  const selectContentStyle = "min-w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-white rounded-xl shadow-lg scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-neutral-800 scrollbar-w-2 hover:scrollbar-thumb-orange-400 scroll-smooth";
  const selectItemStyle = "focus:bg-orange-500/20 focus:text-white";

  return (
    <LenisWrapper>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen relative bg-black flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700/30 via-black to-black" />
        <div className="absolute -bottom-60 right-1/2 translate-x-1/2 w-80 h-72 bg-gradient-to-tl from-orange-500/60 to-transparent rounded-full blur-3xl z-0" />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <button onClick={handleLogoClick}>
            <Image src="/images/a.png" alt="logo" width={200} height={64} className="w-[180px] sm:w-[250px] h-auto cursor-pointer hover:opacity-80 transition-opacity"/>
          </button>
        </div>
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 max-w-[60vw] sm:max-w-none">
          <div className="px-0 py-[2px] rounded-full bg-gradient-to-b from-neutral-500 to-neutral-800">
            <Button variant="secondary" className="rounded-full px-5 py-2 sm:py-3 lg:py-4 bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 text-[10px] sm:text-sm" onClick={() => window.open("https://aaruush.org", "_blank")}>Visit Our Website</Button>
          </div>
        </div>
        <h2 className="text-white text-3xl sm:text-5xl font-bold mb-2 text-center z-10 mt-10">Recruitment Form</h2>
        <div className="w-full max-w-[780px] mt-4 z-10 px-2 sm:px-0">
          <div className="py-px rounded-2xl bg-gradient-to-b from-[#796856] to-[#574030a1]"><div className="bg-[#2a170b] rounded-2xl px-3 sm:px-6 py-2.5 text-sm text-neutral-200"><strong className="text-neutral-100 font-semibold">Info:</strong><span className="ml-1.5"> The form for Team Envision is separate. To fill <button onClick={handleClick} className="text-orange-500 underline"> Click Here. </button> </span></div></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-12 mt-8 w-full max-w-5xl z-10 px-2 sm:px-0 pb-10">
            <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Name</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your name" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="regNumber" render={({ field }) => ( <FormItem><FormLabel>Registration Number</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="RA..." className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="branch" render={({ field }) => ( <FormItem><FormLabel>Branch</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="CSE CORE, CSE AI/ML, etc." className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="year" render={({ field }) => ( <FormItem><FormLabel>Year</FormLabel><div className={gradientWrapperStyle}><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder="Select Year" /></SelectTrigger></FormControl><SelectContent className={selectContentStyle}>{yearOptions.map(opt => <SelectItem key={opt.value} value={opt.value} className={selectItemStyle}>{opt.label}</SelectItem>)}</SelectContent></Select></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Personal Email</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="you@example.com" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="srmEmail" render={({ field }) => ( <FormItem><FormLabel>SRM Email</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="ab1234@srmist.edu.in" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="phoneNumber" render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your phone number" type="tel" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            <FormField control={form.control} name="whatsappNumber" render={({ field }) => ( <FormItem><FormLabel>WhatsApp Number</FormLabel><div className={gradientWrapperStyle}><FormControl><Input placeholder="Enter your phone number" type="tel" className={innerFieldStyle} {...field} /></FormControl></div><FormMessage /></FormItem> )}/>
            
            {/* 🟢 Enhanced Preference 1 with filtered grouped options */}
            <FormField control={form.control} name="preference1" render={({ field }) => (
              <FormItem>
                <FormLabel>Preference 1</FormLabel>
                <div className={gradientWrapperStyle}>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder="Select Preference 1" /></SelectTrigger></FormControl>
                    <SelectContent className={selectContentStyle}>
                      {getFilteredGroupedOptions(pref2).map(group => (
                        <SelectGroup key={group.label}>
                          <SelectLabel className="text-neutral-400 px-2 py-1.5">{group.label}</SelectLabel>
                          {group.options.map(opt => (
                            <SelectItem key={opt.value} value={opt.value} className={selectItemStyle}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}/>
            
            {/* 🟢 Enhanced Preference 2 with filtered grouped options */}
            <FormField control={form.control} name="preference2" render={({ field }) => (
              <FormItem>
                <FormLabel>Preference 2</FormLabel>
                <div className={gradientWrapperStyle}>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder="Select Preference 2" /></SelectTrigger></FormControl>
                    <SelectContent className={selectContentStyle}>
                      {getFilteredGroupedOptions(pref1).map(group => (
                        <SelectGroup key={group.label}>
                          <SelectLabel className="text-neutral-400 px-2 py-1.5">{group.label}</SelectLabel>
                          {group.options.map(opt => (
                            <SelectItem key={opt.value} value={opt.value} className={selectItemStyle}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}/>
            
            <div className="col-span-1 sm:col-span-2 flex justify-center mt-4 sm:mt-6">
              <div className="px-0 py-px rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900">
                <Button type="submit" disabled={isSubmitting} className="px-10 sm:px-16 py-3 sm:py-5 rounded-full bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold text-sm sm:text-md border border-white/30 shadow-inner transition">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        {isRecruitmentTransitioning && <RecruitmentPageTransition targetUrl={recruitmentNav.targetUrl} onAnimationStart={recruitmentNav.onAnimationStart} isActive={isRecruitmentTransitioning}/>}
        {isLogoTransitioning && <LogoTransition targetUrl={logoNav.targetUrl} onAnimationStart={logoNav.onAnimationStart} isActive={isLogoTransitioning}/>}
      </div>
    </LenisWrapper>
  );
};

export default RecruitmentForm;
