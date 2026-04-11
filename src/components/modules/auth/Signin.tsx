"use client";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoginSchema } from "@/validations/auth.validation";
import { forgotPasswordEmailOTPAction, userLogin } from "@/actions/auth.actions";
import { createAuthClient } from "better-auth/react";
import { FormInput } from "@/components/shared/FormInput";
import { useState } from "react";

export function SigninForm() {
  const authClient = createAuthClient();

  const [email, setemail] = useState("");
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("user signning.......");
      try {
        const loginuser = await userLogin(value);
        if (!loginuser || !loginuser.success) {
          toast.dismiss(toastId);
          toast.error(loginuser.message || "login failed", { theme: "dark" });
          return;
        }
        localStorage.removeItem("foodhub-cart");
        toast.dismiss(toastId);
        toast.success(loginuser.message || 'user login successfully', { theme: "dark" });
        router.push("/profile");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong, please try again.");
      }
    },
  });


  const handleForgetPassword = async (email: string) => {
    if (!email) {
      toast.error("Please enter your email first.", { theme: "dark" });
      return { success: false };
    }

    try {
      const toastId = toast.loading("Sending reset OTP...");
      const res = await forgotPasswordEmailOTPAction({ email });
      toast.dismiss(toastId);

      if (res.success) {
        toast.success(res.message || "Password reset OTP sent!", {
          theme: "dark",
        });
        alert("You have only 10 minutes to validate the OTP sent to your email.");
        return { success: true };
      } else {
        toast.error(res.message || "Failed to send OTP.", { theme: "dark" });
        return { success: false };
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.", { theme: "dark" });
      return { success: false };
    }
  };

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="mx-auto fonb">Welcome Back</CardTitle>
        <CardDescription className="mx-auto">
          Please sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              validators={{ onChange: LoginSchema.shape.email }}
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setemail(e.target.value);
                      }}
                      aria-invalid={isInvalid}
                      placeholder="please enter your email"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              validators={{ onChange: LoginSchema.shape.password }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <button
                        type="button"
                        className="text-xs text-purple-600 hover:underline focus:outline-none"
                        onClick={async () => {
                          if (!email) {
                            toast.error("Please enter your email first.", {
                              theme: "dark",
                            });
                            return;
                          }
                          const res = await handleForgetPassword(email);
                          if (res?.success) {
                            const encodedEmail = encodeURIComponent(email);
                            router.push(`/reset-password?email=${encodedEmail}`);
                          }
                        }}
                        tabIndex={0}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormInput
                      field={field}
                      label=""
                      isPassword
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your password"
                      name={field.name}
                      value={field.state.value}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
  
          </FieldGroup>
        </form>
      </CardContent>

      <div className="flex flex-col gap-2 px-6 mt-3">
        <Button
          onClick={() => signIn()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
        {/* Register button (simple design, design only, no logic) */}
        <Button
        onClick={()=>router.push("/register")}
          variant="ghost"
          type="button"
          className="w-full text-purple-600 border border-purple-200 hover:bg-purple-50"
        >
          Register
        </Button>
        {/* Home button (simple design, design only, no logic) */}
        <Button
        onClick={()=>router.push('/')}
          variant="ghost"
          type="button"
          className="w-full text-gray-600 border border-gray-200 hover:bg-gray-50"
        >
          Home
        </Button>
      </div>

      <CardFooter className="mx-auto">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="login-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
