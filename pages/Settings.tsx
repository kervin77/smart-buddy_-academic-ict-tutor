import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { SmartBuddy } from '../components/SmartBuddy';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const [tempName, setTempName] = useState(settings.name);
  const navigate = useNavigate();

  const handleSave = () => {
    if (!tempName.trim()) return;
    updateSettings({ name: tempName, hasOnboarded: true });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-yellow/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-brand-blue p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Setup Profile</h1>
          <p className="text-blue-100">Customize your learning companion</p>
        </div>

        <div className="p-8 space-y-8">
          <SmartBuddy 
            text="Greetings. I am your revision assistant. To begin, please enter your preferred name." 
            className="w-full"
          />

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2 ml-2">Student Name</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-blue focus:outline-none text-xl transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 ml-2">Select Assistant Voice</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateSettings({ voice: 'MALE' })}
                  className={`p-4 rounded-xl border-4 transition-all ${
                    settings.voice === 'MALE' 
                      ? 'border-brand-blue bg-blue-50 scale-105' 
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-4xl mb-2">🧢</div>
                  <div className="font-bold text-gray-600">Coach</div>
                </button>

                <button
                  onClick={() => updateSettings({ voice: 'FEMALE' })}
                  className={`p-4 rounded-xl border-4 transition-all ${
                    settings.voice === 'FEMALE' 
                      ? 'border-brand-purple bg-purple-50 scale-105' 
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-4xl mb-2">👓</div>
                  <div className="font-bold text-gray-600">Expert</div>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!tempName.trim()}
            className="w-full bg-brand-green hover:bg-green-500 text-white font-bold py-4 rounded-2xl text-xl shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Launch Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};