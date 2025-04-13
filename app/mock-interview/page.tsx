'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  MicrophoneIcon, 
  StopIcon, 
  PlayIcon, 
  PauseIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "Tell me about yourself and your background.",
    category: "Introduction",
    difficulty: "easy"
  },
  {
    id: 2,
    text: "What are your greatest strengths and weaknesses?",
    category: "Personal",
    difficulty: "medium"
  },
  {
    id: 3,
    text: "Where do you see yourself in 5 years?",
    category: "Career Goals",
    difficulty: "medium"
  },
  {
    id: 4,
    text: "Why should we hire you?",
    category: "Value Proposition",
    difficulty: "hard"
  },
  {
    id: 5,
    text: "Describe a challenging situation you faced at work and how you handled it.",
    category: "Problem Solving",
    difficulty: "hard"
  }
];

export default function MockInterviewPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(sampleQuestions[0]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAudioChunks(chunks);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      const timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const nextQuestion = () => {
    const currentIndex = sampleQuestions.findIndex(q => q.id === currentQuestion.id);
    const nextIndex = (currentIndex + 1) % sampleQuestions.length;
    setCurrentQuestion(sampleQuestions[nextIndex]);
    setShowFeedback(false);
    setFeedback(null);
    setAudioUrl(null);
    setAudioChunks([]);
  };

  const analyzeResponse = async () => {
    setIsAnalyzing(true);
    // Simulate API call for analysis
    setTimeout(() => {
      setFeedback({
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        strengths: [
          "Clear communication",
          "Good structure in response",
          "Relevant examples provided"
        ],
        improvements: [
          "Could provide more specific examples",
          "Consider adding quantifiable results",
          "Work on conciseness"
        ]
      });
      setShowFeedback(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Mock Interview</h1>
            <p className="mt-1 text-sm text-gray-500">
              Practice your interview skills with AI-powered feedback
            </p>
          </div>

          {/* Question Card */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestion.id} of {sampleQuestions.length}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{currentQuestion.text}</h2>
            </div>

            {/* Recording Controls */}
            <div className="space-y-4">
              {!isRecording && !audioUrl && (
                <button
                  onClick={startRecording}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <MicrophoneIcon className="h-5 w-5 mr-2" />
                  Start Recording
                </button>
              )}

              {isRecording && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        Recording {formatTime(recordingTime)}
                      </span>
                    </div>
                    <button
                      onClick={stopRecording}
                      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <StopIcon className="h-5 w-5 mr-2" />
                      Stop Recording
                    </button>
                  </div>
                </div>
              )}

              {audioUrl && !showFeedback && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={playRecording}
                      className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isPlaying ? (
                        <PauseIcon className="h-5 w-5 mr-2" />
                      ) : (
                        <PlayIcon className="h-5 w-5 mr-2" />
                      )}
                      {isPlaying ? 'Pause' : 'Play Recording'}
                    </button>
                    <button
                      onClick={analyzeResponse}
                      disabled={isAnalyzing}
                      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isAnalyzing ? (
                        <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                      )}
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Response'}
                    </button>
                  </div>
                </div>
              )}

              {/* Feedback Section */}
              {showFeedback && feedback && (
                <div className="mt-6 space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Feedback</h3>
                      <span className="text-2xl font-bold text-indigo-600">{feedback.score}%</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Strengths</h4>
                        <ul className="space-y-2">
                          {feedback.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                        <ul className="space-y-2">
                          {feedback.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start">
                              <XCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={nextQuestion}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 