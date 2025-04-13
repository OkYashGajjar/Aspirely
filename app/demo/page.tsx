'use client';

import { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import Image from 'next/image';

// Sample profile data
const sampleProfiles = [
  {
    name: 'Alex Johnson',
    title: 'Software Engineer',
    bio: 'Passionate about building scalable web applications and exploring new technologies.',
  },
  {
    name: 'Sarah Williams',
    title: 'UX Designer',
    bio: 'Creating beautiful and intuitive user experiences that make a difference.',
  },
  {
    name: 'Michael Chen',
    title: 'Data Scientist',
    bio: 'Turning complex data into actionable insights through machine learning and analytics.',
  },
  {
    name: 'Emily Rodriguez',
    title: 'Product Manager',
    bio: 'Leading cross-functional teams to deliver innovative products that solve real problems.',
  },
  {
    name: 'David Kim',
    title: 'Frontend Developer',
    bio: 'Crafting responsive and accessible web interfaces with modern frameworks.',
  },
  {
    name: 'Jessica Taylor',
    title: 'Marketing Specialist',
    bio: 'Developing creative campaigns that connect brands with their target audiences.',
  },
  {
    name: 'Robert Wilson',
    title: 'Backend Developer',
    bio: 'Building robust and secure APIs that power modern applications.',
  },
  {
    name: 'Olivia Martinez',
    title: 'Content Strategist',
    bio: 'Creating compelling narratives that engage and inspire audiences.',
  },
];

export default function DemoPage() {
  const [profiles, setProfiles] = useState(sampleProfiles);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-fade-in">
          Profile Cards
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Scroll through the profiles to see the highlight effect and randomly generated avatars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile, index) => (
          <div
            key={profile.name}
            className={`bg-white rounded-lg shadow-md p-6 hover-lift animate-pop-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={64}
                  height={64}
                  className="rounded-full animate-float"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                <p className="text-sm text-gray-500">{profile.title}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">{profile.bio}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover-scale"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Try scrolling through the page to see the highlight effect on each card!
        </p>
      </div>
    </div>
  );
} 