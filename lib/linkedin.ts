import axios from 'axios';

interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: string;
  industry: string;
  positions: Array<{
    title: string;
    companyName: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
  }>;
  skills: string[];
  profilePicture?: string;
  publicProfileUrl: string;
}

export async function fetchLinkedInProfile(accessToken: string): Promise<LinkedInProfile> {
  try {
    // First, get the basic profile information
    const basicProfileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
    });

    console.log('Basic profile response:', basicProfileResponse.data);

    // Get email address
    const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
    });

    console.log('Email response:', emailResponse.data);

    // Get profile picture
    const profilePictureResponse = await axios.get('https://api.linkedin.com/v2/profilePicture?q=members&projection=(elements*(profilePicture~:playableStreams))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
    });

    console.log('Profile picture response:', profilePictureResponse.data);

    // Get positions (experience)
    const positionsResponse = await axios.get('https://api.linkedin.com/v2/positions?q=members&projection=(elements*(title,companyName,startDate,endDate,description))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
    });

    console.log('Positions response:', positionsResponse.data);

    // Get education
    const educationResponse = await axios.get('https://api.linkedin.com/v2/education?q=members&projection=(elements*(schoolName,degree,fieldOfStudy,startDate,endDate))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
    });

    console.log('Education response:', educationResponse.data);

    // Get skills
    const skillsResponse = await axios.get('https://api.linkedin.com/v2/skills?q=members&projection=(elements*(name))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
    });

    console.log('Skills response:', skillsResponse.data);

    const basicProfile = basicProfileResponse.data;
    const profilePicture = profilePictureResponse.data?.elements?.[0]?.['profilePicture~']?.displayImageReference?.vectorImage?.rootUrl;
    const positions = positionsResponse.data?.elements || [];
    const education = educationResponse.data?.elements || [];
    const skills = skillsResponse.data?.elements?.map((skill: any) => skill.name) || [];

    return {
      id: basicProfile.id,
      firstName: basicProfile.localizedFirstName,
      lastName: basicProfile.localizedLastName,
      headline: basicProfile.headline,
      summary: basicProfile.summary,
      location: basicProfile.location?.name || '',
      industry: basicProfile.industry || '',
      positions: positions.map((position: any) => ({
        title: position.title,
        companyName: position.companyName,
        startDate: position.startDate,
        endDate: position.endDate,
        description: position.description,
      })),
      education: education.map((edu: any) => ({
        school: edu.schoolName,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
      })),
      skills,
      profilePicture,
      publicProfileUrl: `https://www.linkedin.com/in/${basicProfile.vanityName}`,
    };
  } catch (error: any) {
    console.error('Error fetching LinkedIn profile:', error.response?.data || error.message);
    throw new Error(`Failed to fetch LinkedIn profile data: ${error.response?.data?.message || error.message}`);
  }
} 