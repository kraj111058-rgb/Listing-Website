"use client";

import { InputWithLabel, Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormValues,
} from "@/schemas";
import { useForgotPassword } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, MailCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthCardContainer } from "./auth-card-container";

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const { mutate: forgotPassword, isPending: isSending } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data, {
      onSuccess: () => {
        setSubmittedEmail(data.email);
        setIsSuccess(true);
        setCountdown(30);
      },
    });
  };

  const handleResend = () => {
    if (!submittedEmail || countdown > 0) return;
    forgotPassword(
      { email: submittedEmail },
      {
        onSuccess: () => {
          setCountdown(30);
        },
      }
    );
  };

  return (
    <AuthCardContainer maxWidth="max-w-lg">
      <div className="w-full space-y-6">
        {isSuccess ? (
          <div className="space-y-6 text-center py-2 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600 shadow-xs">
              <MailCheck size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Check Your Email
              </h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                We have sent password reset instructions to{" "}
                <span className="font-semibold text-slate-800">
                  {submittedEmail}
                </span>
                . Please click the link inside the email to reset your password.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                type="button"
                onClick={handleResend}
                disabled={isSending || countdown > 0}
                variant="outline"
                className="w-full h-12 rounded-[10px] border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <Loader inline size="sm" />
                    <span>Resending Link...</span>
                  </>
                ) : countdown > 0 ? (
                  <span>Resend Link in {countdown}s</span>
                ) : (
                  <span>Resend Link</span>
                )}
              </Button>

              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors py-1"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Title & Subtitle */}
            <div className="space-y-1 text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-slate-500">
                No worries! Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    id="forgot-email"
                    type="email"
                    label="Email Address"
                    placeholder="name@gmail.com"
                    error={errors.email?.message}
                    disabled={isSending}
                    {...field}
                  />
                )}
              />

              <Button
                type="submit"
                disabled={isSending}
                className="w-full h-12 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isSending ? (
                  <>
                    <Loader inline size="sm" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>

            {/* Back to Sign In Link */}
            <div className="pt-2 text-center text-xs sm:text-sm text-slate-500">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <ArrowLeft size={15} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthCardContainer>
  );
}
