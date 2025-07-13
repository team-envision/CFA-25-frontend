// src/app/Recruitment/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import API from "../../services/axios"; // Use same API setup as Envision
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "../components/ui/form";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "../components/ui/select";

import LenisWrapper from "../components/LenisWrapper";
import LogoTransition from "../components/LogoTransition";
import RecruitmentPageTransition from "../components/RecruitmentPageTransition";
import { useLogoNavigation } from "../components/Hooks/useLogoNavigation";
import { useRecruitmentNavigation } from "../components/Hooks/useRecruitmentNavigation";

// Dropdown data
import committeesOptions from "../../data/committes.json";
import domainsOptions from "../../data/domains.json";
import teamsOptions from "../../data/teams.json";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  regNumber: z.string().min(1, "Registration number is required"),
  branch: z.string().min(1, "Branch is required"),
  year: z.string().min(1, "Please select your year"),
  email: z.string().email("Invalid email address").min(1).trim().toLowerCase(),
  srmEmail: z.string().email().min(1, "SRM Email is required").regex(/^[\w-\.]+@srmist\.edu\.in$/, "Enter a valid SRM Email").trim().toLowerCase(),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number").length(10),
  whatsappNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid WhatsApp number").length(10),
  preference1: z.string().min(1, "Preference 1 is required"),
  preference2: z.string().min(1, "Preference 2 is required"),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: Partial<FormData> = {
  name: "", regNumber: "", branch: "", year: "",
  email: "", srmEmail: "", phoneNumber: "", whatsappNumber: "",
  preference1: "", preference2: "",
};

const innerFieldStyle = "w-full px-3 py-3 sm:px-4 sm:py-5 rounded-xl bg-neutral-900 backdrop-blur-sm border border-neutral-950 text-white placeholder:text-white/70 text-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-1 focus:ring-orange-500 transition";
const gradientWrapperStyle = "p-px rounded-xl bg-gradient-to-b from-neutral-500 to-neutral-700 hover:from-orange-500 hover:to-orange-800 transition";
const selectItemStyle = "focus:bg-orange-500/20 focus:text-white";
const selectContentStyle = "min-w-[var(--radix-select-trigger-width)] bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-white rounded-xl shadow-lg";

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
];

export default function RecruitmentForm() {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { isTransitioning: isLogoTransitioning, targetUrl: logoTargetUrl, navigateToMain, onAnimationStart: onLogoAnimationStart } = useLogoNavigation();
  const { isTransitioning: isRecruitmentTransitioning, targetUrl: recruitmentTargetUrl, navigateToRecruitment, onAnimationStart: onRecruitmentAnimationStart } = useRecruitmentNavigation();

  const pref1 = form.watch("preference1");
  const pref2 = form.watch("preference2");

  const getFilteredOptions = () => {
    const selected = [pref1, pref2].filter(Boolean);
    return [
      { label: "Teams", options: teamsOptions.filter(opt => !selected.includes(opt.value)) },
      { label: "Committees", options: committeesOptions.filter(opt => !selected.includes(opt.value)) },
      { label: "Domains", options: domainsOptions.filter(opt => !selected.includes(opt.value)) },
    ];
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await API.post("/cfa/users", data);
      setMessage({ type: "success", text: res.data?.message || "Application submitted successfully!" });
      form.reset();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LenisWrapper>
      <div className="min-h-screen relative bg-black flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700/30 via-black to-black" />
        <div className="absolute -bottom-60 right-1/2 translate-x-1/2 w-80 h-72 bg-gradient-to-tl from-orange-500/60 to-transparent rounded-full blur-3xl z-0" />

        <div className="absolute top-4 left-4 z-10">
          <button onClick={navigateToMain}><Image src="/images/a.png" alt="logo" width={200} height={64} className="w-[180px] sm:w-[250px] h-auto hover:opacity-80" /></button>
        </div>

        <div className="absolute top-4 right-4 z-10 max-w-[60vw]">
          <Button variant="secondary" className="rounded-full px-5 py-3 bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 transition text-sm" onClick={() => window.open("https://aaruush.org", "_blank")}>Visit Our Website</Button>
        </div>

        <h2 className="text-white text-3xl sm:text-5xl font-bold mt-10 mb-3 z-10">Recruitment Form</h2>

        <div className="w-full max-w-5xl text-center mb-4 z-10">
          {message && <p className={message.type === "success" ? "text-green-400" : "text-red-500"}>{message.text}</p>}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-12 w-full max-w-5xl z-10 px-2 sm:px-0">
            {[
              ["name", "Name"], ["regNumber", "Registration Number"], ["branch", "Branch"],
              ["email", "Personal Email"], ["srmEmail", "SRM Email"],
              ["phoneNumber", "Phone Number"], ["whatsappNumber", "WhatsApp Number"]
            ].map(([name, label]) => (
              <FormField key={name} control={form.control} name={name as keyof FormData} render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <div className={gradientWrapperStyle}><FormControl><Input placeholder={`Enter your ${label.toLowerCase()}`} className={innerFieldStyle} {...field} /></FormControl></div>
                  <FormMessage />
                </FormItem>
              )} />
            ))}

            <FormField control={form.control} name="year" render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <div className={gradientWrapperStyle}>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder="Select Year" /></SelectTrigger></FormControl>
                    <SelectContent className={selectContentStyle}>
                      {yearOptions.map(opt => <SelectItem key={opt.value} value={opt.value} className={selectItemStyle}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )} />

            {["preference1", "preference2"].map((pref, index) => (
              <FormField key={pref} control={form.control} name={pref as keyof FormData} render={({ field }) => (
                <FormItem>
                  <FormLabel>Preference {index + 1}</FormLabel>
                  <div className={gradientWrapperStyle}>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className={innerFieldStyle}><SelectValue placeholder={`Select Preference ${index + 1}`} /></SelectTrigger></FormControl>
                      <SelectContent className={selectContentStyle}>
                        {getFilteredOptions().map(group => (
                          <SelectGroup key={group.label}>
                            <SelectLabel className="text-neutral-400 px-2 py-1.5">{group.label}</SelectLabel>
                            {group.options.map(opt => <SelectItem key={opt.value} value={opt.value} className={selectItemStyle}>{opt.label}</SelectItem>)}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
            ))}

            <div className="col-span-1 sm:col-span-2 flex justify-center mt-6">
              <div className="px-0 py-px rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900">
                <Button type="submit" disabled={isLoading} className="px-10 py-4 rounded-full bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold text-md border border-white/30 shadow-inner transition disabled:opacity-50">
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Form>

        {isRecruitmentTransitioning && (
          <RecruitmentPageTransition targetUrl={recruitmentTargetUrl} onAnimationStart={onRecruitmentAnimationStart} isActive={isRecruitmentTransitioning} />
        )}
        {isLogoTransitioning && (
          <LogoTransition targetUrl={logoTargetUrl} onAnimationStart={onLogoAnimationStart} isActive={isLogoTransitioning} />
        )}
      </div>
    </LenisWrapper>
  );
}
