"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TbLoader2 } from "react-icons/tb";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });
const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";

    return searchParams.get("error_description");
  }, []);

  const confirmationAndErrorStyles = useMemo(() => {
    clsx("bg-primary", {
      "bg-red-500/10": codeExchangeError,
      "border-red-500/10": codeExchangeError,
      "text-red-700": codeExchangeError,
    });
  }, []);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = () => {};

  const signUpHandler = () => {};

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[500px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="flex w-full gap-2 justify-center items-center"
        >
          <span className="font-semibold text-3xl">SYNKRON</span>
        </Link>
        <FormDescription className="text-foreground/60">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium,
          veniam ad! Ut iste, cum obcaecati adipisci sit expedita consectetur
          quasi.
        </FormDescription>
        {!confirmation && !codeExchangeError && (
          <>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={(field) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="abc@gmail.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={(field) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="confirmPassword"
              render={(field) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full p-6" disabled={isLoading}>
              {!isLoading ? (
                "Create Account"
              ) : (
                <TbLoader2 className="h-5 w-5 animate-spin" />
              )}
            </Button>
          </>
        )}

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          //   size="lg"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Login"
          ) : (
            <TbLoader2 className="h-5 w-5 animate-spin" />
          )}
        </Button>
        <span className="self-container flex items-center gap-3">
          Already have an account?
          <Link href="/login" className="hover:underline hover:text-primary">
            LogIn
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default SignUpPage;
