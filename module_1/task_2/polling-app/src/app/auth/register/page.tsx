'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Register</h1>
        <RegisterForm />
        <p className="mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}