const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== Aspirely Environment Setup ===');
console.log('This script will help you set up your environment variables for the Aspirely application.');
console.log('You will need your Supabase project URL and anon key.');
console.log('You can find these in your Supabase project dashboard under Project Settings > API');
console.log('');

rl.question('Enter your Supabase project URL (e.g., https://your-project-id.supabase.co): ', (supabaseUrl) => {
  rl.question('Enter your Supabase anon key: ', (supabaseKey) => {
    rl.question('Enter your OpenAI API key (optional, press Enter to skip): ', (openaiKey) => {
      // Create the .env.local file content
      let envContent = `# Supabase Configuration
# Replace these with your actual Supabase project URL and anon key
# You can find these in your Supabase project dashboard under Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}

# OpenAI Configuration (for the chat functionality)
# Replace with your actual OpenAI API key
OPENAI_API_KEY=${openaiKey || 'your-openai-api-key'}

# Note: After updating this file, restart your Next.js development server
# for the changes to take effect.
`;

      // Write the content to .env.local
      fs.writeFileSync(path.join(__dirname, '.env.local'), envContent);
      
      console.log('');
      console.log('✅ Environment variables have been set up successfully!');
      console.log('The .env.local file has been created with your Supabase credentials.');
      console.log('');
      console.log('Next steps:');
      console.log('1. Restart your Next.js development server');
      console.log('2. Run the database setup script: npm run setup-db');
      console.log('');
      
      rl.close();
    });
  });
}); 