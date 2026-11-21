"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InputWithLabel, Loader } from "@/components/common";
import { loginFormSchema, type LoginFormValues } from "@/schemas";
import { useLogin, useResendVerification } from "@/services/auth";
import { AuthCardContainer } from "./auth-card-container";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);

  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: resendVerification, isPending: isResending } = useResendVerification();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setUnconfirmedEmail(null);
    login(data, {
      onSuccess: () => {
        const redirectTo = searchParams.get("redirectTo") || "/dashboard";
        router.push(redirectTo);
      },
      onError: (err) => {
        if (err.message.toLowerCase().includes("email not confirmed")) {
          setUnconfirmedEmail(data.email);
        }
      },
    });
  };

  const handleResendVerification = () => {
    if (!unconfirmedEmail) return;
    resendVerification(unconfirmedEmail);
  };

  return (
    <AuthCardContainer maxWidth="max-w-lg">
      <div className="w-full space-y-6">
        {/* Title & Subtitle */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Sign In
          </h1>
          <p className="text-sm text-slate-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Unconfirmed Email Notice Alert Box */}
        {unconfirmedEmail && (
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-left text-xs text-amber-950 space-y-2.5 animate-in fade-in duration-200">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="size-4.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 min-w-0 flex-1">
                <p className="font-bold text-amber-900">Email Not Verified</p>
                <p className="text-amber-800/90 text-[11px] leading-relaxed">
                  We sent a confirmation link to <strong className="font-semibold">{unconfirmedEmail}</strong>. Please check your inbox (or spam folder) to activate your account.
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isResending}
              onClick={handleResendVerification}
              className="w-full h-8.5 text-xs font-semibold bg-white border-amber-300 hover:bg-amber-100 text-amber-900 cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isResending ? (
                <>
                  <Loader inline size="xs" />
                  <span>Resending Link...</span>
                </>
              ) : (
                <span>Resend Verification Link</span>
              )}
            </Button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="login-email"
                type="email"
                label="Email Address"
                placeholder="name@example.com"
                error={errors.email?.message}
                disabled={isLoggingIn}
                {...field}
              />
            )}
          />

          {/* Password Field with Show/Hide Toggle */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="login-password"
                type={showPassword ? "text" : "password"}
                label={
                  <div className="flex items-center justify-between w-full">
                    <span>Password</span>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                }
                placeholder="Enter your password"
                error={errors.password?.message}
                disabled={isLoggingIn}
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

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                    {...field}
                  />
                )}
              />
              <span className="text-xs font-medium text-slate-600">
                Remember me on this device
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full h-12 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
          >
            {isLoggingIn ? (
              <>
                <Loader inline size="sm" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
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

        {/* Google Quick Sign-In */}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            toast.info("Coming soon!");
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
          <span>Continue with Google</span>
        </Button>

        {/* Sign Up Link */}
        <div className="pt-1 text-center text-xs sm:text-sm text-slate-500">
          <span>Don&apos;t have an account? </span>
          <Link
            href="/register"
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthCardContainer>
  );
}
