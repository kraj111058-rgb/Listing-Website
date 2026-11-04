"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InputWithLabel } from "@/components/common";
import { registerFormSchema, type RegisterFormValues } from "@/schemas";
import { AuthCardContainer } from "./auth-card-container";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard");
  };

  return (
    <AuthCardContainer maxWidth="max-w-lg">
      <div className="w-full space-y-5">
        {/* Title & Subtitle */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500">
            Enter your details below to get started.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 text-left">
          {/* Full Name */}
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="register-fullname"
                label="Full Name"
                placeholder="e.g. Rahul Sharma"
                error={errors.fullName?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />

          {/* Email Address */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="register-email"
                type="email"
                label="Email Address"
                placeholder="name@example.com"
                error={errors.email?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />

          {/* Mobile Phone Number */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="register-phone"
                type="tel"
                label="Mobile Number"
                placeholder="98765 43210"
                error={errors.phone?.message}
                disabled={isSubmitting}
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="register-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Min 6 characters"
                error={errors.password?.message}
                disabled={isSubmitting}
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
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Re-enter your password"
                error={errors.confirmPassword?.message}
                disabled={isSubmitting}
                rightElement={
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                }
                {...field}
              />
            )}
          />

          {/* Terms Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <Controller
                name="terms"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                    {...field}
                  />
                )}
              />
              <span className="text-xs text-slate-600 leading-normal">
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="font-bold text-indigo-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" className="font-bold text-indigo-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>

        {/* OR Divider */}
        <div className="relative my-5.75 flex items-center justify-center">
          <Separator className="w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest absolute">
            OR
          </span>
        </div>

        {/* Google Quick Sign-Up */}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Placeholder for Google OAuth
          }}
          className="w-full h-12 rounded-[10px] border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-medium text-sm flex items-center justify-center gap-3 shadow-2xs transition-colors cursor-pointer"
        >
          <Image
            src="/images/google-icon.svg"
            alt="Google"
            width={18}
            height={18}
            className="w-4.5 h-4.5 shrink-0"
          />
          <span>Sign up with Google</span>
        </Button>

        {/* Sign In Link */}
        <div className="pt-1 text-center text-xs sm:text-sm text-slate-500">
          <span>Already have an account? </span>
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
