"use client";

import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <LoginForm />
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-500 hover:text-blue-700"
          >
            Register
          </Link>
        </p>
      </main>
    </div>
  );
}
