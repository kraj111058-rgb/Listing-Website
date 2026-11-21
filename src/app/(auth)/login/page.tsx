import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/features/auth";
import { Loader } from "@/components/common";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your IndianListingBucket account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader className="py-24" />}>
      <LoginForm />
    </Suspense>
  );
}
