import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SmartBuddy } from '../components/SmartBuddy';
import { UNIT_QUIZZES, CURRICULUM } from '../constants';
import { ArrowLeft, RefreshCw, Check, Smartphone, Camera, Wifi, BookOpen, BrainCircuit } from 'lucide-react';
import { getSmartBuddyHelp } from '../services/geminiService';

type Stage = 'INTRO' | 'PLAY' | 'QUIZ' | 'SUCCESS';

export const UnitLevel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const unitId = Number(id);
  const { settings, unlockNextUnit } = useApp();
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>('INTRO');
  const [quizIndex, setQuizIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [gameFoundItems, setGameFoundItems] = useState<string[]>([]);
  
  // Find current unit data
  const unit = CURRICULUM.find(u => u.id === unitId);
  const quiz = UNIT_QUIZZES[unitId] || [];

  // Game Items for "Play" stage (Only for Unit 1 currently)
  const gameItems = [
    { id: 'camera', icon: Camera, label: 'Input Device (Camera)', x: 20, y: 20 },
    { id: 'wifi', icon: Wifi, label: 'Network Module (Wi-Fi)', x: 70, y: 30 },
    { id: 'screen', icon: Smartphone, label: 'Output Interface (Screen)', x: 45, y: 60 },
  ];
  
  const hasMinigame = unitId === 1;

  const currentQuestion = quiz[quizIndex];

  // Logic to handle quiz answers
  const handleAnswer = async (optionIndex: number, optionText: string) => {
    // Clear any previous feedback immediately
    setFeedback(null);

    if (optionIndex === currentQuestion.correctAnswer) {
      // Correct
      setIsThinking(true); // Block input while celebrating
      setFeedback("Correct. Excellent understanding of the concept.");
      
      // Increased timeout to allow the voice to finish speaking
      setTimeout(() => {
        setFeedback(null);
        setIsThinking(false);
        if (quizIndex < quiz.length - 1) {
          setQuizIndex(prev => prev + 1);
        } else {
          setStage('SUCCESS');
          unlockNextUnit(unitId);
        }
      }, 3000);
    } else {
      // Wrong - Call AI
      setIsThinking(true);
      const hint = await getSmartBuddyHelp(
        currentQuestion.question, 
        optionText, 
        settings.name, 
        settings.voice
      );
      setFeedback(hint);
      setIsThinking(false); // Re-enable input
    }
  };

  const handleGameItemClick = (itemId: string) => {
    if (!gameFoundItems.includes(itemId)) {
      setGameFoundItems(prev => [...prev, itemId]);
    }
  };

  // Render Functions
  const renderIntro = () => (
    <div className="space-y-6 animate-fade-in">
      <SmartBuddy 
        text={`Welcome to Unit ${unitId}: ${unit?.title}. I am ready to assist you in mastering ${unit?.topic}. Review the key terms below before we proceed.`}
        mood="happy"
      />
      
      {/* Glossary Section */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-gray-100">
        <h2 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6"/>
          Key Terminology
        </h2>
        <div className="grid gap-3">
          {unit?.glossary?.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-700 block">{item.term}</span>
              <span className="text-gray-500 text-sm leading-tight">{item.definition}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
        <h3 className="font-bold text-gray-600 text-sm mb-2 uppercase tracking-wider">Unit Objectives:</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {unit?.lessons.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      </div>

      <button 
        onClick={() => setStage(hasMinigame ? 'PLAY' : 'QUIZ')}
        className={`w-full text-white font-bold py-4 rounded-2xl text-xl shadow-lg transition-colors ${unit?.color || 'bg-brand-blue'} hover:opacity-90`}
      >
        {hasMinigame ? "Start Interactive Diagram" : "Begin Assessment"}
      </button>
    </div>
  );

  const renderGame = () => (
    <div className="space-y-6">
      <SmartBuddy 
        text={gameFoundItems.length === gameItems.length 
          ? "Analysis complete. You have correctly identified the core components." 
          : "Identify and select the Input, Output, and Network components on the device schema below."}
        mood={gameFoundItems.length === gameItems.length ? 'celebrating' : 'thinking'}
      />
      
      <div className="relative h-80 bg-blue-50 rounded-3xl border-4 border-white shadow-inner overflow-hidden mx-auto max-w-sm">
        {/* Mock Phone Body */}
        <div className="absolute inset-4 bg-gray-800 rounded-3xl border-4 border-gray-600 shadow-2xl">
            <div className="h-full w-full bg-gray-900 relative overflow-hidden">
                {/* Wallpaper */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-purple opacity-50"></div>
                
                {/* Interactive Items */}
                {gameItems.map(item => {
                    const found = gameFoundItems.includes(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleGameItemClick(item.id)}
                            style={{ left: `${item.x}%`, top: `${item.y}%` }}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full transition-all duration-300 ${found ? 'bg-green-400 scale-110 rotate-12' : 'bg-white/20 hover:bg-white/40 animate-pulse'}`}
                        >
                            <item.icon className={`w-8 h-8 ${found ? 'text-white' : 'text-white'}`} />
                        </button>
                    )
                })}
            </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
         {gameItems.map(item => (
             <div key={item.id} className={`px-4 py-2 rounded-lg font-bold text-xs ${gameFoundItems.includes(item.id) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                 {item.label}
             </div>
         ))}
      </div>

      {gameFoundItems.length === gameItems.length && (
        <button 
            onClick={() => setStage('QUIZ')}
            className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl text-xl shadow-lg hover:bg-green-600 transition-colors animate-bounce-slow"
        >
            Proceed to Assessment
        </button>
      )}
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-xs tracking-wider">
        <span>Question {quizIndex + 1} of {quiz.length}</span>
        <span>Unit {unitId}: Assessment</span>
      </div>

      <h2 className="text-xl font-bold text-gray-800 text-center px-4 leading-relaxed">
        {currentQuestion.question}
      </h2>
      
      {/* Dynamic AI Feedback Area */}
      <div className={`min-h-[120px] transition-all ${feedback ? 'opacity-100' : 'opacity-0'}`}>
         {feedback && (
             <SmartBuddy 
                text={feedback} 
                mood={feedback.includes("Correct") ? "celebrating" : "thinking"} 
             />
         )}
         {isThinking && (
             <div className="text-center text-gray-400 animate-pulse">Analyzing response...</div>
         )}
      </div>

      <div className="grid gap-4">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            // Only disable if AI is actively processing/thinking.
            onClick={() => !isThinking && handleAnswer(idx, option)}
            disabled={isThinking}
            className={`w-full bg-white p-5 rounded-2xl shadow-md border-2 
              ${feedback && idx !== currentQuestion.correctAnswer ? 'border-red-100 opacity-80' : 'border-gray-100'}
              hover:border-brand-yellow hover:bg-yellow-50 text-left font-medium text-gray-700 text-md transition-all active:scale-98 disabled:opacity-50`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-8 py-10">
      <SmartBuddy 
        text={`Module complete. Excellent performance, ${settings.name}. You have demonstrated competency in Unit ${unitId}.`} 
        mood="celebrating"
      />
      <div className="inline-block p-8 bg-yellow-100 rounded-full rotate-12 shadow-xl border-4 border-white">
        <BrainCircuit className="w-20 h-20 text-brand-yellow" />
      </div>
      <h1 className="text-3xl font-bold text-brand-blue">ASSESSMENT PASSED</h1>
      <p className="text-gray-500 text-lg">
        {unitId < 6 ? "Progression unlocked: Proceed to next unit." : "Curriculum Complete."}
      </p>
      
      <Link 
        to="/"
        className="inline-block w-full bg-brand-blue text-white font-bold py-4 rounded-2xl text-xl shadow-lg hover:bg-blue-600 transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );

  // If locked or invalid ID
  if (!unit) {
      return (
        <div className="p-8 text-center min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-400">Unit not found.</h1>
            <Link to="/" className="text-brand-blue underline mt-4 block">Return to Dashboard</Link>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-fdfbf7 pb-20">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-4">
          <ArrowLeft className="w-5 h-5 mr-1" /> Dashboard
        </Link>

        <div className="max-w-xl mx-auto">
            {stage === 'INTRO' && renderIntro()}
            {stage === 'PLAY' && renderGame()}
            {stage === 'QUIZ' && renderQuiz()}
            {stage === 'SUCCESS' && renderSuccess()}
        </div>
      </div>
    </div>
  );
};