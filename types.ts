export type VoiceType = 'MALE' | 'FEMALE';

export interface UserSettings {
  name: string;
  voice: VoiceType;
  hasOnboarded: boolean;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Unit {
  id: number;
  title: string;
  topic: string;
  lessons: string[];
  mastered: boolean;
  color: string;
  icon: string; // lucide icon name
  glossary: GlossaryTerm[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index
  explanation: string;
}

export interface GameState {
  currentStage: 'READ' | 'PLAY' | 'QUIZ' | 'SUCCESS';
  quizIndex: number;
  mistakes: number;
  score: number;
}