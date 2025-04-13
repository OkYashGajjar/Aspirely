'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DocumentIcon,
  ArrowDownTrayIcon,
  PaintBrushIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import './styles.css';

interface ResumeProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
}

export default function ResumePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ResumeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [accentColor, setAccentColor] = useState('#4F46E5'); // Default indigo color
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ResumeProfile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile && !editedProfile) {
      setEditedProfile({ ...profile });
    }
  }, [profile]);

  const handleEdit = (field: string, value: any) => {
    if (!editedProfile) return;
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleExperienceEdit = (index: number, field: string, value: string) => {
    if (!editedProfile) return;
    const newExperience = [...editedProfile.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setEditedProfile({ ...editedProfile, experience: newExperience });
  };

  const handleEducationEdit = (index: number, field: string, value: string) => {
    if (!editedProfile) return;
    const newEducation = [...editedProfile.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEditedProfile({ ...editedProfile, education: newEducation });
  };

  const handleSkillsEdit = (skills: string[]) => {
    if (!editedProfile) return;
    setEditedProfile({ ...editedProfile, skills });
  };

  // Add new functions to handle adding and removing sections
  const addExperience = () => {
    if (!editedProfile) return;
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setEditedProfile({
      ...editedProfile,
      experience: [...editedProfile.experience, newExperience],
    });
  };

  const removeExperience = (index: number) => {
    if (!editedProfile) return;
    const newExperience = [...editedProfile.experience];
    newExperience.splice(index, 1);
    setEditedProfile({ ...editedProfile, experience: newExperience });
  };

  const addEducation = () => {
    if (!editedProfile) return;
    const newEducation = {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    setEditedProfile({
      ...editedProfile,
      education: [...editedProfile.education, newEducation],
    });
  };

  const removeEducation = (index: number) => {
    if (!editedProfile) return;
    const newEducation = [...editedProfile.education];
    newEducation.splice(index, 1);
    setEditedProfile({ ...editedProfile, education: newEducation });
  };

  const addSkill = () => {
    if (!editedProfile) return;
    setEditedProfile({
      ...editedProfile,
      skills: [...editedProfile.skills, ''],
    });
  };

  const removeSkill = (index: number) => {
    if (!editedProfile) return;
    const newSkills = [...editedProfile.skills];
    newSkills.splice(index, 1);
    setEditedProfile({ ...editedProfile, skills: newSkills });
  };

  const saveChanges = async () => {
    if (!editedProfile) return;
    setProfile(editedProfile);
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Use demo data if no user is logged in
        setProfile({
          name: 'John Doe',
          title: 'Software Engineer',
          email: 'john@example.com',
          phone: '(555) 123-4567',
          location: 'San Francisco, CA',
          bio: 'Experienced software engineer with a passion for building scalable applications.',
          experience: [
            {
              company: 'Tech Corp',
              position: 'Senior Developer',
              startDate: '2020',
              endDate: 'Present',
              description: 'Lead development of cloud applications.',
            }
          ],
          education: [
            {
              school: 'University of Technology',
              degree: 'BS',
              field: 'Computer Science',
              startDate: '2016',
              endDate: '2020',
            }
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        });
        setIsLoading(false);
        return;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(profileData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadResume = () => {
    // This would typically integrate with a PDF generation service
    // For now, we'll just print the page
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Controls */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8 print:hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back to Profile
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Resume Generator</h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="template" className="text-sm font-medium text-gray-700">Template:</label>
                <select
                  id="template"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="color" className="text-sm font-medium text-gray-700">Accent Color:</label>
                <input
                  type="color"
                  id="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-8 w-8 rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                {isEditing ? 'Preview' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  onClick={saveChanges}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              )}
              <button
                onClick={downloadResume}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white shadow-lg rounded-lg mx-4 sm:mx-6 lg:mx-8 print:shadow-none print:mx-0" style={{ color: '#2D3748' }}>
          {/* Modern Template */}
          {selectedTemplate === 'modern' && editedProfile && (
            <ModernTemplate 
              profile={editedProfile}
              isEditing={isEditing}
              onEdit={handleEdit}
              onExperienceEdit={handleExperienceEdit}
              onEducationEdit={handleEducationEdit}
              onSkillsEdit={handleSkillsEdit}
              addExperience={addExperience}
              removeExperience={removeExperience}
              addEducation={addEducation}
              removeEducation={removeEducation}
              addSkill={addSkill}
              removeSkill={removeSkill}
              accentColor={accentColor}
            />
          )}

          {/* Classic Template */}
          {selectedTemplate === 'classic' && editedProfile && (
            <ClassicTemplate 
              profile={editedProfile}
              isEditing={isEditing}
              onEdit={handleEdit}
              onExperienceEdit={handleExperienceEdit}
              onEducationEdit={handleEducationEdit}
              onSkillsEdit={handleSkillsEdit}
              addExperience={addExperience}
              removeExperience={removeExperience}
              addEducation={addEducation}
              removeEducation={removeEducation}
              addSkill={addSkill}
              removeSkill={removeSkill}
              accentColor={accentColor}
            />
          )}

          {/* Minimal Template */}
          {selectedTemplate === 'minimal' && editedProfile && (
            <MinimalTemplate 
              profile={editedProfile}
              isEditing={isEditing}
              onEdit={handleEdit}
              onExperienceEdit={handleExperienceEdit}
              onEducationEdit={handleEducationEdit}
              onSkillsEdit={handleSkillsEdit}
              addExperience={addExperience}
              removeExperience={removeExperience}
              addEducation={addEducation}
              removeEducation={removeEducation}
              addSkill={addSkill}
              removeSkill={removeSkill}
              accentColor={accentColor}
            />
          )}
        </div>
      </div>
    </div>
  );
} 