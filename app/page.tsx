'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  useEffect(() => {
    // Redirect to /home after 3 seconds
    const timer = setTimeout(() => {
      redirect('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={`https://picsum.photos/seed/aspirely/200/200`}
            alt="Aspirely Logo"
            width={120}
            height={120}
            className="object-cover rounded-full"
            priority
          />
        </div>
        <Link href="/home">
          <h1 className="text-3xl font-medium text-gray-900 mb-2 hover:text-primary transition-colors duration-300 cursor-pointer">
            Welcome to Aspirely
          </h1>
        </Link>
        <p className="text-lg text-gray-600">Your Career Development Platform</p>
      </div>
    </div>
  );
} 