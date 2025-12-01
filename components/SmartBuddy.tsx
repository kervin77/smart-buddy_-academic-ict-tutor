import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, GraduationCap, Trophy, Volume2, VolumeX } from 'lucide-react';
import { speakText } from '../services/geminiService';

interface SmartBuddyProps {
  text: string;
  mood?: 'happy' | 'thinking' | 'celebrating';
  className?: string;
}

export const SmartBuddy: React.FC<SmartBuddyProps> = ({ text, mood = 'happy', className = '' }) => {
  const { settings } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const isMale = settings.voice === 'MALE';
  const avatarColor = isMale ? 'bg-brand-blue' : 'bg-brand-purple';

  // Initialize Audio Context lazily
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    // Resume if suspended (browser policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  useEffect(() => {
    let active = true;

    const playAudio = async () => {
      if (!text) return;
      
      // Stop previous audio
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch(e) {}
      }

      setIsPlaying(true);
      const audioData = await speakText(text, settings.voice);

      if (!active) return;
      
      if (audioData) {
        try {
          const ctx = getAudioContext();
          // Gemini returns Raw PCM 24kHz 16-bit (Int16) usually. 
          // We need to manually convert Int16 to Float32 for AudioBuffer.
          const pcm16 = new Int16Array(audioData);
          const audioBuffer = ctx.createBuffer(1, pcm16.length, 24000);
          const channelData = audioBuffer.getChannelData(0);
          
          for (let i = 0; i < pcm16.length; i++) {
            channelData[i] = pcm16[i] / 32768.0;
          }

          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);
          
          source.onended = () => {
             if (active) setIsPlaying(false);
          };

          source.start(0);
          sourceRef.current = source;
        } catch (e) {
          console.error("Audio playback error:", e);
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      active = false;
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch(e) {}
      }
    };
  }, [text, settings.voice]);
  
  return (
    <div className={`flex flex-col items-center max-w-2xl mx-auto p-4 ${className}`}>
      {/* Avatar Circle */}
      <div className={`relative w-24 h-24 ${avatarColor} rounded-full border-4 border-white shadow-xl flex items-center justify-center mb-4 ${isPlaying ? 'animate-bounce-slow' : ''}`}>
        {mood === 'celebrating' ? (
           <Trophy className="w-12 h-12 text-white" />
        ) : isMale ? (
          <div className="text-4xl">🧢</div>
        ) : (
          <div className="text-4xl">👓</div>
        )}
        
        {/* Expression Badge */}
        <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full border-2 border-white">
          {mood === 'happy' && <span role="img" aria-label="happy">😊</span>}
          {mood === 'thinking' && <span role="img" aria-label="thinking">🤔</span>}
          {mood === 'celebrating' && <span role="img" aria-label="celebrate">⭐</span>}
        </div>

        {/* Audio Indicator */}
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
           {isPlaying ? <Volume2 className="w-4 h-4 text-brand-blue" /> : <div className="w-4 h-4" />}
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 max-w-full w-full">
        {/* Triangle pointer */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-gray-100 rotate-45"></div>
        
        <div className="flex gap-3">
          <Sparkles className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-1" />
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};