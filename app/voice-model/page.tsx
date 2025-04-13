// app/page.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

export default function VoiceModelPage() {
  const handleVoiceInteraction = () => {
    // Navigate to index.html
    window.location.href = '/index.html';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="px-4 py-4 flex items-center">
            <Link href="/home" className="text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Voice Model</h1>
              <p className="text-sm text-gray-500">Click to open Voice Model</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div 
            className="w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-indigo-500 hover:bg-indigo-600 hover:scale-105"
            onClick={handleVoiceInteraction}
          >
            <MicrophoneIcon className="h-16 w-16 text-white" />
          </div>
          
          <p className="mt-6 text-lg font-medium text-gray-700">
            Click to open Voice Model
          </p>
          
          <div className="mt-4 text-sm text-gray-500">
            Opens Voice Model interface
          </div>
        </div>
      </div>
    </div>
  );
}
