-- Add linkedin_access_token column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin_access_token TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin_token_expires_at TIMESTAMP WITH TIME ZONE;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_linkedin_token ON profiles(linkedin_access_token);
CREATE INDEX IF NOT EXISTS idx_profiles_linkedin_token_expires ON profiles(linkedin_token_expires_at);

-- Update RLS policies to allow users to update their own linkedin token data
CREATE POLICY "Users can update their own linkedin token data"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id); 