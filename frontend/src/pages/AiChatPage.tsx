import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getAiRecommendation } from '../services/aiService';
import { ComboRecommendation } from '../types';
import RecommendationCard from '../components/ai/RecommendationCard';
import { DemoBanner } from '../components/common/DemoBanner';
import { Sparkles, Send, Bot, User as UserIcon, RefreshCw, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'dost';
  text: string;
  recommendation?: ComboRecommendation;
  timestamp: string;
}

export const AiChatPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { businesses } = useApp();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'dost',
      text: 'Hey! What do you want to do in the city today? Tell me your plans, budget, and group size, and I will find and compare the best options for you!',
      timestamp: '15:45 PM',
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSearching]);

  // Handle URL query parameters
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      handleSendPrompt(q);
    }
  }, [searchParams]);

  const handleSendPrompt = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isSearching) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsSearching(true);

    // Simulate AI processing delay
    setTimeout(async () => {
      const recommendation = await getAiRecommendation(query, businesses);

      const dostMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'dost',
        text: `Sure! I analyzed live crowd traffic, wait times, ticket availability, and offers across 7 venues in Sector 18. Here is my top pick for you:`,
        recommendation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, dostMsg]);
      setIsSearching(false);
    }, 800);
  };

  const loadHackathonDemo = () => {
    const prompt = "Dost, I want to watch a movie and have dinner with 3 friends tonight under ₹2000.";
    handleSendPrompt(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4 min-h-[85vh] flex flex-col">
      
      {/* Top Banner */}
      <DemoBanner onLoadDemoScenario={loadHackathonDemo} />

      {/* Chat Messages Container */}
      <div className="flex-1 glass-card p-4 sm:p-6 border border-slate-800 space-y-6 overflow-y-auto max-h-[60vh]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-lg ${
                msg.sender === 'dost' 
                  ? 'gradient-bg text-white' 
                  : 'bg-slate-800 text-brand-300 border border-slate-700'
              }`}
            >
              {msg.sender === 'dost' ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-2xl space-y-2 ${msg.sender === 'user' ? 'items-end' : ''}`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none shadow-lg'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[10px] text-slate-400 block text-right mt-1.5 opacity-80">{msg.timestamp}</span>
              </div>

              {/* Recommendation Card inside Chat */}
              {msg.recommendation && (
                <RecommendationCard recommendation={msg.recommendation} />
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isSearching && (
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none text-xs text-brand-300 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-400" />
              <span>Dost is calculating wait times, crowd prediction, and deals...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto py-1 text-xs">
        <span className="text-slate-400 text-[11px] shrink-0 font-medium">Quick Filters:</span>
        <button
          onClick={() => handleSendPrompt("Find places with low crowd level right now")}
          className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 shrink-0"
        >
          Less Crowded
        </button>
        <button
          onClick={() => handleSendPrompt("Cheapest dinner and movie combo under ₹1500")}
          className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 shrink-0"
        >
          Cheapest
        </button>
        <button
          onClick={() => handleSendPrompt("Closest cinema within 2km")}
          className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 shrink-0"
        >
          Closest
        </button>
        <button
          onClick={() => handleSendPrompt("Best rated restaurant for family dinner")}
          className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 shrink-0"
        >
          Best Rated
        </button>
      </div>

      {/* Chat Input Bar */}
      <div className="glass-card p-3 border border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask Dost... (e.g., Movie and dinner for 4 under ₹2000)"
            className="flex-1 bg-slate-950/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isSearching}
            className="p-3 rounded-xl gradient-bg text-white font-bold shadow-lg hover:scale-105 disabled:opacity-40 transition-all"
            aria-label="Send prompt"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
};

export default AiChatPage;
