import { NextRequest, NextResponse } from 'next/server';

const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY; // Keep this in .env.local
const ULTRAVOX_VOICE_ID = '7c125579-a8b9-46ba-887b-60e4f0449e5d';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const res = await fetch(`https://api.v6.ultravox.ai/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ULTRAVOX_API_KEY}`,
    },
    body: JSON.stringify({
      voiceId: ULTRAVOX_VOICE_ID,
      input: text,
    }),
  });

  const data = await res.json();
  return NextResponse.json({ audioUrl: data.audioUrl });
}
