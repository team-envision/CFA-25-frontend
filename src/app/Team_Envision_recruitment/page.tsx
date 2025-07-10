// src/app/Team_Envision_recruitment/page.tsx
"use client";

import React from "react";
import Image from "next/image";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LenisWrapper from "../components/LenisWrapper"; 
import Link from "next/link";
// Validation Schema
const formSchema = z.object({
  name1: z.string().min(1, "Required"),
  name2: z.string().min(1, "Required"),
  name3: z.string().min(1, "Required"),
  name4: z.string().min(1, "Required"),
  name5: z.string().min(1, "Required"),
  name6: z.string().min(1, "Required"),
  name7: z.string().min(1, "Required"),
  name8: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof formSchema>;

const TeamEnvisionRecruitmentPage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name1: "",
      name2: "",
      name3: "",
      name4: "",
      name5: "",
      name6: "",
      name7: "",
      name8: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Form submitted successfully!");
  };

  return (
    <LenisWrapper>
      <div className="min-h-screen relative bg-black flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700/30 via-black to-black" />

        {/* Bottom glow */}
        <div className="absolute -bottom-60 right-50 w-80 h-72 bg-gradient-to-tl from-orange-500/60 to-transparent rounded-full blur-3xl z-0" />

        {/* Logo */}
        
<div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
  <Link href="/">
    <Image
      src="/images/a.png"
      alt="logo"
      width={200}
      height={64}
      className="w-[180px] sm:w-[250px] h-auto cursor-pointer"
    />
  </Link>
</div>
        {/* Visit Website Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-20 z-10">
          <div className="px-0 py-px rounded-full bg-gradient-to-b from-neutral-500 to-neutral-800">
            <Button
              variant="secondary"
              className="
                rounded-full px-6 sm:px-10 py-3 sm:py-6
                bg-neutral-900 text-white border border-neutral-800
                hover:bg-neutral-800 transition text-sm sm:text-base
                whitespace-nowrap
              "
              onClick={() => window.open("https://aaruush.org", "_blank")}
            >
              Visit our Website
            </Button>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-white text-3xl sm:text-5xl font-bold mb-2 text-center z-10 mt-10">
          Recruitment Form
        </h2>
        <p className="text-xl sm:text-4xl text-white text-center z-10 mt-4 sm:mt-7">
          Team <span className="text-orange-500 font-semibold">Envision</span>
        </p>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-6 sm:gap-x-12 mt-8 w-full max-w-3xl z-10 px-2 sm:px-0"
          >
            {Object.keys(formSchema.shape).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof FormData}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm sm:text-md -mb-1">
                      Name
                    </FormLabel>
                    <div className="py-px rounded-xl bg-gradient-to-b from-neutral-500 to-neutral-700 hover:from-orange-500 hover:to-orange-800 transition">
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...formField}
                          className="
                            w-full px-3 py-3 sm:px-4 sm:py-5 rounded-xl
                            bg-neutral-900 backdrop-blur-sm
                            border border-neutral-950
                            text-white placeholder-neutral-500 text-sm
                            shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.3)]
                            focus:outline-none focus:ring-[0.5px] focus:ring-orange-500
                            transition duration-200 ease-in-out
                          "
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            ))}

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2 flex justify-center mt-4 sm:mt-6">
              <div className="px-0 py-px rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900">
                <Button
                  type="submit"
                  className="
                    px-10 sm:px-16 py-3 sm:py-5 rounded-full
                    bg-gradient-to-b from-orange-500 to-orange-700
                    hover:from-orange-700 hover:to-orange-800
                    text-white font-semibold text-sm sm:text-md
                    border border-white/30
                    shadow-inner
                    transition
                  "
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </LenisWrapper>
  );
};

export default TeamEnvisionRecruitmentPage;
