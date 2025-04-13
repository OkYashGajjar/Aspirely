'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Script from 'next/script';

export default function CareerAdvisorPage() {
  const [chatStarted, setChatStarted] = useState(false);

  // Function to inject custom CSS to hide the "Powered by ORIMON" text
  useEffect(() => {
    if (chatStarted) {
      // Wait for the iframe to load
      const timer = setTimeout(() => {
        try {
          // Try to access the iframe content and modify it
          const iframe = document.querySelector('iframe');
          if (iframe && iframe.contentDocument) {
            const style = iframe.contentDocument.createElement('style');
            style.textContent = `
              .powered-by-orimon, 
              .orimon-footer, 
              .orimon-powered-by,
              [class*="powered-by"],
              [class*="footer"] {
                display: none !important;
              }
              .chat-title, 
              .bot-name,
              [class*="title"],
              [class*="name"] {
                content: "Aspirely" !important;
              }
            `;
            iframe.contentDocument.head.appendChild(style);
          }
        } catch (error) {
          console.error('Could not modify iframe content due to same-origin policy:', error);
        }
      }, 2000); // Wait 2 seconds for the iframe to load

      return () => clearTimeout(timer);
    }
  }, [chatStarted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="px-4 py-4 flex items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Career Advisor</h1>
              <p className="text-sm text-gray-500">AI-powered career guidance</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!chatStarted ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to Your AI Career Advisor</h2>
              <p className="text-gray-600 mb-6">
                Get personalized career advice, explore career paths, and receive guidance on skill development.
              </p>
              <button
                onClick={() => setChatStarted(true)}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md text-lg font-medium"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
              <iframe 
                src="https://bot.orimon.ai/?tenantId=0ba64ab7-e254-4015-89d8-88349d369b5a&fullScreenBot=true&botName=Aspirely&hideFooter=true" 
                height="100%" 
                width="100%" 
                frameBorder="0" 
                style={{ border: 'none' }}
                title="Aspirely Career Advisor"
              />
            </div>
          )}
        </div>
      </div>

      {/* Add the Orimon Chatbot script for the chat bubble option with custom parameters */}
      <Script 
        src="https://bot.orimon.ai/deploy/index.js" 
        data-tenant-id="0ba64ab7-e254-4015-89d8-88349d369b5a"
        data-bot-name="Aspirely"
        data-hide-footer="true"
        strategy="afterInteractive"
      />
    </div>
  );
} 