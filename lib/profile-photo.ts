/**
 * Profile photo generation utilities
 * Uses Dicebear API to generate random avatars
 */

// Avatar styles available from Dicebear
export type AvatarStyle = 
  | 'adventurer' 
  | 'adventurer-neutral' 
  | 'avataaars' 
  | 'big-ears' 
  | 'big-smile' 
  | 'bottts' 
  | 'croodles' 
  | 'croodles-neutral' 
  | 'fun-emoji' 
  | 'icons' 
  | 'identicon' 
  | 'initials' 
  | 'lorelei' 
  | 'micah' 
  | 'miniavs' 
  | 'open-peeps' 
  | 'personas' 
  | 'pixel-art' 
  | 'shapes';

// Avatar options
export interface AvatarOptions {
  style?: AvatarStyle;
  seed?: string;
  backgroundColor?: string;
  size?: number;
  radius?: number;
  mood?: string[];
  colors?: string[];
}

/**
 * Generate a random profile photo URL using Dicebear API
 * @param options Avatar generation options
 * @returns URL to the generated avatar
 */
export function generateProfilePhoto(options: AvatarOptions = {}): string {
  const {
    style = 'adventurer',
    seed = Math.random().toString(36).substring(2, 15),
    backgroundColor = 'b6e3f4',
    size = 200,
    radius = 50,
    mood = ['happy', 'surprised', 'excited'],
    colors = ['4F46E5', '10B981', 'F59E0B', '818CF8', '34D399']
  } = options;

  // Build the URL with parameters
  const baseUrl = `https://api.dicebear.com/7.x/${style}/svg`;
  const params = new URLSearchParams({
    seed,
    backgroundColor,
    size: size.toString(),
    radius: radius.toString(),
    mood: mood.join(','),
    colors: colors.join(',')
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate a random profile photo with initials as fallback
 * @param name User's name for initials
 * @param options Avatar generation options
 * @returns URL to the generated avatar
 */
export function generateProfilePhotoWithInitials(name: string, options: AvatarOptions = {}): string {
  // Extract initials from name
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Use initials as seed for consistent avatar per user
  return generateProfilePhoto({
    ...options,
    seed: initials,
    style: options.style || 'initials'
  });
}

/**
 * Get a random avatar style
 * @returns A random avatar style
 */
export function getRandomAvatarStyle(): AvatarStyle {
  const styles: AvatarStyle[] = [
    'adventurer',
    'avataaars',
    'big-ears',
    'bottts',
    'fun-emoji',
    'identicon',
    'initials',
    'micah',
    'miniavs',
    'pixel-art'
  ];
  
  return styles[Math.floor(Math.random() * styles.length)];
} 