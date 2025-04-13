'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  HomeIcon,
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
  MicrophoneIcon,
  XMarkIcon,
  Bars3Icon,
  DocumentIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Network', href: '/network', icon: UserGroupIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Voice Model', href: 'http://127.0.0.1:5500/index.html', icon: MicrophoneIcon },
  // { name: 'Resume Generator', href: '/resume', icon: DocumentIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="animate-fade-in">
              <span className="text-xl font-bold text-indigo-600">Aspirely</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium hover-lift animate-slide-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-2 h-4 w-4 ${
                      pathname === item.href ? 'text-primary' : 'text-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </div>
              </Link>
            ))}
            <Link href="/profile" className="hover-scale">
              <Image
                src="/profile-photo.jpg"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border-2 border-indigo-600"
              />
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover-scale"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden animate-slide-in`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <item.icon
                  className={`mr-3 h-4 w-4 ${
                    pathname === item.href ? 'text-primary' : 'text-gray-400'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </div>
            </Link>
          ))}
          <Link href="/profile" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover-lift">
            <Image
              src="/profile-photo.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full border-2 border-indigo-600 mr-3"
            />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
} 