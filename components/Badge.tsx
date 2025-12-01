import React from 'react';
import { Star } from 'lucide-react';

interface BadgeProps {
  title: string;
  unlocked: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ title, unlocked }) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-xl transition-all duration-500 ${unlocked ? 'bg-yellow-100 scale-100' : 'bg-gray-100 opacity-50 grayscale'}`}>
      <div className={`p-4 rounded-full mb-2 ${unlocked ? 'bg-brand-yellow shadow-lg rotate-12' : 'bg-gray-300'}`}>
        <Star className="w-8 h-8 text-white fill-current" />
      </div>
      <span className="font-bold text-gray-700 text-sm text-center">{title}</span>
      {unlocked && <span className="text-xs text-brand-green font-bold mt-1">UNLOCKED!</span>}
    </div>
  );
};
