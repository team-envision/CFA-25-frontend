"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import FooterSection from "../components/Footer/page";
import API from "../../services/axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import LenisWrapper from "../components/LenisWrapper";
import LogoTransition from "../components/LogoTransition";
import { useLogoNavigation } from "../components/Hooks/useLogoNavigation";
import envisionOptions from "../../data/envision.json";
import { AxiosError } from "axios";
import { FieldErrors } from "react-hook-form";

// Enhanced schema with custom validation for preferences
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required!"),
    regNumber: z.string().min(1, "Registration number is required"),
    branch: z.string().min(1, "Branch is required"),
    year: z.string().min(1, "Year is required"),
    email: z.string().email().min(1, "Email is required"),
    srmEmail: z
      .string()
      .email("Invalid email address")
      .regex(/^[\w-\.]+@srmist\.edu\.in$/, "Enter a valid SRM Email")
      .min(1, "SRM Email is required"),
    phoneNumber: z
      .string()
      .regex(/^[6789]\d{9}$/, "Invalid phone number")
      .length(10, "Must be 10 digits"),
    whatsappNumber: z
      .string()
      .regex(/^[6789]\d{9}$/, "Invalid WhatsApp number")
      .length(10, "Must be 10 digits"),
    linkedIn: z.string().url("Invalid URL").min(1, "LinkedIn is required"),
    github: z.string().optional(),
    expertise1: z.string().min(1, "Required"),
    expertise2: z.string().min(1, "Required"),
    portfolio: z.string().optional(),
    other: z.string().optional(),
    preference1: z.string().min(1, "Preference 1 required"),
    preference2: z.string().min(1, "Preference 2 required"),
  })
  .refine((data) => data.preference1 !== data.preference2, {
    message: "Preference 1 and Preference 2 cannot be the same",
    path: ["preference2"],
  });

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  name: "",
  regNumber: "",
  branch: "",
  year: "",
  email: "",
  srmEmail: "",
  phoneNumber: "",
  whatsappNumber: "",
  linkedIn: "",
  github: "",
  expertise1: "",
  expertise2: "",
  portfolio: "",
  other: "",
  preference1: "",
  preference2: "",
};

export default function TeamEnvisionRecruitmentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { isTransitioning, targetUrl, navigateToMain, onAnimationStart } =
    useLogoNavigation();

  const pref1 = form.watch("preference1");
  const pref2 = form.watch("preference2");

  useEffect(() => {
    if (pref1 && pref2 && pref1 === pref2) {
      form.setValue("preference2", "");
      toast.warning(
        "Preference 2 cleared - cannot be the same as Preference 1"
      );
    }
  }, [pref1, pref2, form]);

  const onSubmit = async (data: FormData) => {
    if (data.preference1 === data.preference2) {
      toast.error("Preference 1 and Preference 2 cannot be the same");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Submitting your application...");
    try {
      await API.post("/cfa/users/envision", { data });
      toast.success("User added successfully!", { id: toastId });
      form.reset();
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if ((error as AxiosError).isAxiosError) {
        errorMessage =
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          errorMessage;
      }
      toast.error(`Submission failed: ${errorMessage}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (errors: FieldErrors<FormData>) => {
    console.error("Form validation failed:", errors);
    if (errors.preference2?.message?.includes("cannot be the same")) {
      toast.error(
        "Please select different preferences for Preference 1 and Preference 2"
      );
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  const getAvailableOptions = (excludeValue: string) => {
    return envisionOptions.filter((opt) => opt.value !== excludeValue);
  };

  // ✅ FIXED: Unified style for all form fields. Error styles are handled with aria-invalid.
  const fieldStyle =
    "w-full px-3 py-3 sm:px-4 sm:py-5 rounded-xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/80 text-white placeholder:text-neutral-400 text-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-600 transition-all duration-200 aria-[invalid=true]:border-red-500/80 aria-[invalid=true]:ring-red-500/50";
  const selectContentStyle =
    "min-w-[var(--radix-select-trigger-width)] bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-white rounded-xl shadow-lg z-50";
  const selectItemStyle =
    "focus:bg-orange-500/20 focus:text-white hover:bg-orange-500/10 cursor-pointer px-2 py-1.5";

  return (
    <LenisWrapper>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen relative bg-black flex flex-col items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700/30 via-black to-black" />
        <div className="absolute right-1/2 translate-x-1/2 w-80 h-72 bg-gradient-to-tl from-orange-500/60 to-transparent rounded-full blur-3xl z-0" />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <button onClick={navigateToMain} className="hover:opacity-80">
            <Image
              src="/images/a.png"
              alt="logo"
              width={200}
              height={64}
              className="w-[180px] sm:w-[250px] h-auto"
            />
          </button>
        </div>
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 max-w-[60vw] sm:max-w-none">
          <div className="px-0 py-[2px] rounded-full bg-gradient-to-b from-neutral-500 to-neutral-800">
            <Button
              variant="secondary"
              className="rounded-full px-5 py-2 sm:py-3 lg:py-4 bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 transition text-[10px] sm:text-sm md:text-base whitespace-nowrap truncate"
              onClick={() => window.open("https://aaruush.org", "_blank")}
            >
              Visit Our Website
            </Button>
          </div>
        </div>
        <h2 className="text-white text-3xl sm:text-5xl font-bold mb-2 text-center z-10 mt-10">
          Recruitment Form
        </h2>
        <p className="text-xl sm:text-4xl text-white text-center z-10 mt-4 sm:mt-7">
          Team <span className="text-orange-500 font-semibold">Envision</span>
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-12 mt-8 w-full max-w-5xl z-10 px-2 sm:px-0"
          >
            {/* ✅ FIXED: ALL fields now use the simplified structure to prevent extra divs and layout shift */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="regNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Registration Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your registration number"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Branch</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your branch"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Year</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={fieldStyle}>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      className={selectContentStyle}
                      position="popper"
                      sideOffset={4}
                    >
                      <SelectItem value="1" className={selectItemStyle}>
                        1st Year
                      </SelectItem>
                      <SelectItem value="2" className={selectItemStyle}>
                        2nd Year
                      </SelectItem>
                      <SelectItem value="3" className={selectItemStyle}>
                        3rd Year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Personal Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="srmEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">SRM Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your SRM email"
                      type="email"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      type="tel"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your WhatsApp number"
                      type="tel"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preference1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Preference 1</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={fieldStyle}>
                        <SelectValue placeholder="Select Preference 1" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      className={selectContentStyle}
                      position="popper"
                      sideOffset={4}
                    >
                      {getAvailableOptions(pref2).map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className={selectItemStyle}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preference2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Preference 2</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={fieldStyle}>
                        <SelectValue placeholder="Select Preference 2" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      className={selectContentStyle}
                      position="popper"
                      sideOffset={4}
                    >
                      {getAvailableOptions(pref1).map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className={selectItemStyle}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expertise1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Expertise in Preference 1
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe your expertise"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expertise2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Expertise in Preference 2
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe your expertise"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your LinkedIn URL"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    GitHub (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your GitHub URL"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Portfolio (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your portfolio URL"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Other Projects (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Any other projects / links"
                      className={fieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1.5" />
                </FormItem>
              )}
            />

            <div className="col-span-1 sm:col-span-2 flex justify-center mt-4 sm:mt-6">
              <div className="px-0 py-px rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-10 sm:px-16 py-3 sm:py-5 rounded-full bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold text-sm sm:text-md border border-white/30 shadow-inner transition disabled:opacity-50"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        {isTransitioning && (
          <LogoTransition
            targetUrl={targetUrl}
            onAnimationStart={onAnimationStart}
            isActive={isTransitioning}
          />
        )}
      </div>
      <div>
        <FooterSection />
      </div>
    </LenisWrapper>
  );
}
