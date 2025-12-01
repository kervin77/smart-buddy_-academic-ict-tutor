import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, ChevronRight, Play, Settings as SettingsIcon, Monitor, Wifi, Shield, ShoppingBag, PenTool, Code } from 'lucide-react';
import { SmartBuddy } from '../components/SmartBuddy';
import { Badge } from '../components/Badge';

export const Home: React.FC = () => {
  const { units, settings } = useApp();

  // Helper to map icon string to Lucide component
  const getIcon = (iconName: string, className: string) => {
    switch(iconName) {
      case 'monitor': return <Monitor className={className} />;
      case 'wifi': return <Wifi className={className} />;
      case 'shield': return <Shield className={className} />;
      case 'shopping-bag': return <ShoppingBag className={className} />;
      case 'pen-tool': return <PenTool className={className} />;
      case 'code': return <Code className={className} />;
      default: return <Monitor className={className} />;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full ${settings.voice === 'MALE' ? 'bg-brand-blue' : 'bg-brand-purple'} flex items-center justify-center text-white font-bold`}>
              SB
            </div>
            <span className="font-bold text-gray-700">Hi, {settings.name}!</span>
          </div>
          <Link to="/settings" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-8 mt-4">
        <SmartBuddy 
          text={`Welcome back to your Tech Base! Choose a mission to start learning.`} 
          mood="happy"
        />

        {/* Badges Section */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
           <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs mb-4">Your Trophy Case</h3>
           <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
             {units.map(unit => (
               <div key={unit.id} className="flex-shrink-0">
                  <Badge title={`Unit ${unit.id}`} unlocked={unit.mastered} />
               </div>
             ))}
           </div>
        </div>

        {/* Map */}
        <div className="space-y-6 relative">
          {/* Vertical Line Connector */}
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-gray-200 -z-10"></div>

          {units.map((unit, index) => {
            // Determine if locked
            // Unit 1 is always unlocked. 
            // Unit N is unlocked if Unit N-1 is mastered.
            const isLocked = index > 0 && !units[index - 1].mastered;
            
            return (
              <div key={unit.id} className={`relative transition-all duration-300 ${isLocked ? 'opacity-60' : 'hover:scale-102'}`}>
                <Link 
                  to={isLocked ? '#' : `/unit/${unit.id}`}
                  className={`block bg-white p-6 rounded-3xl shadow-lg border-b-4 ${isLocked ? 'border-gray-200 cursor-not-allowed' : 'border-gray-100 cursor-pointer'}`}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div className="flex items-center gap-6">
                    {/* Status Circle */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0 ${unit.color} text-white`}>
                      {isLocked ? (
                        <Lock className="w-8 h-8 opacity-50" />
                      ) : unit.mastered ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : (
                        getIcon(unit.icon, "w-8 h-8 fill-current")
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{unit.topic}</span>
                          <h2 className="text-xl font-bold text-gray-800">{unit.title}</h2>
                        </div>
                        {isLocked && <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-lg font-bold">LOCKED</span>}
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {unit.lessons.slice(0, 3).map((lesson, i) => (
                           <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">
                             {lesson}
                           </span>
                        ))}
                        {unit.lessons.length > 3 && (
                            <span className="text-xs text-gray-400 px-1 py-1">+{unit.lessons.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    {!isLocked && (
                      <ChevronRight className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};