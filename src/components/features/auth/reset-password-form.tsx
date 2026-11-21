"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputWithLabel, Loader } from "@/components/common";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormValues,
} from "@/schemas";
import { useResetPassword } from "@/services/auth";
import { AuthCardContainer } from "./auth-card-container";

export function ResetPasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetPassword(data.password, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <AuthCardContainer maxWidth="max-w-lg">
      <div className="w-full space-y-6">
        {/* Title & Subtitle */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-slate-500">
            Please enter your new password below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="reset-password"
                type={showPassword ? "text" : "password"}
                label="New Password"
                placeholder="At least 6 characters"
                error={errors.password?.message}
                disabled={isResetting}
                rightElement={
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                }
                {...field}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="reset-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm New Password"
                placeholder="Re-enter your password"
                error={errors.confirmPassword?.message}
                disabled={isResetting}
                rightElement={
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                }
                {...field}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isResetting}
            className="w-full h-12 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isResetting ? (
              <>
                <Loader inline size="sm" />
                <span>Resetting Password...</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>

        {/* Remember Password Link */}
        <div className="pt-2 text-center text-xs sm:text-sm text-slate-500">
          <span>Remember your password? </span>
          <Link
            href="/login"
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthCardContainer>
  );
}
