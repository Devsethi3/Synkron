"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbLoader2 } from "react-icons/tb";
import { actionLoginUser } from "@/lib/server-actions/authAction";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace("/dashboard");
  };

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
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="abc@gmail.com" {...field} />
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
          Don't have an account?
          <Link href="/signup" className="underline text-primary">
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;
