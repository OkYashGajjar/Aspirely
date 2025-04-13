'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateProfilePhoto, getRandomAvatarStyle } from '@/lib/profile-photo';

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  initialAvatarStyle?: string;
}

export default function ProfileCard({ 
  name, 
  title, 
  bio, 
  initialAvatarStyle 
}: ProfileCardProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Generate a random avatar on component mount
  useEffect(() => {
    const style = initialAvatarStyle || getRandomAvatarStyle();
    const newAvatarUrl = generateProfilePhoto({ 
      style: style as any,
      seed: name, // Use name as seed for consistency
      size: 200
    });
    setAvatarUrl(newAvatarUrl);
  }, [name, initialAvatarStyle]);

  // Handle scroll event for highlighting
  const handleScroll = () => {
    const element = document.getElementById(`profile-card-${name.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      const isInView = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      
      setIsHighlighted(isInView);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      id={`profile-card-${name.replace(/\s+/g, '-').toLowerCase()}`}
      className={`minimal-card scroll-highlight ${
        isHighlighted ? 'border-primary' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          {avatarUrl ? (
            <Image 
              src={avatarUrl} 
              alt={`${name}'s avatar`} 
              fill
              className="profile-photo"
            />
          ) : (
            <div className="profile-photo-placeholder w-full h-full">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600">{bio}</p>
      <div className="mt-4 flex justify-end">
        <button className="minimal-button-primary text-sm">
          Connect
        </button>
      </div>
    </div>
  );
} 