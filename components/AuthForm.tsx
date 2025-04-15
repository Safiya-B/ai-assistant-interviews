"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast.success("success");
    } catch (error) {
      toast.error("error");
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row justify-center gap-2">
          <Image src="logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Interview</h2>
        </div>
        <h3>Practice job interviews with ai</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name..."
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="Your email..."
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Your password"
            />
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>
            <p className="text-center">
              {isSignIn ? "No account yet ?" : "Have an account already ?"}
              <Link
                className="font-bold text-user-primary ml-1"
                href={isSignIn ? "/sign-up" : "sign-in"}
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
