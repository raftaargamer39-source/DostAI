import { ParsedIntent, ComboRecommendation, Business } from '../types';
import { generateComboRecommendation } from './recommendationEngine';

export const parseUserPrompt = async (prompt: string): Promise<ParsedIntent> => {
  const lower = prompt.toLowerCase();
  
  // Extract budget
  let budget = 2000;
  const budgetMatch = lower.match(/(?:under|below|budget|within|\u20B9|rs\.?|in)\s*(\d+)/i) || lower.match(/(\d+)\s*(?:rs|rupees|inr|\u20B9)/i);
  if (budgetMatch) {
    budget = parseInt(budgetMatch[1], 10);
  }

  // Extract people count
  let peopleCount = 1;
  if (lower.includes('with 3 friends') || lower.includes('4 people') || lower.includes('4 friends') || lower.includes('3 friends')) {
    peopleCount = 4;
  } else if (lower.includes('with 2 friends') || lower.includes('3 people') || lower.includes('2 friends')) {
    peopleCount = 3;
  } else if (lower.includes('with a friend') || lower.includes('2 people') || lower.includes('couple') || lower.includes('1 friend')) {
    peopleCount = 2;
  }

  // Extract activities
  const activities: string[] = [];
  if (lower.includes('movie') || lower.includes('cinema') || lower.includes('film') || lower.includes('watch')) {
    activities.push('movie');
  }
  if (lower.includes('dinner') || lower.includes('lunch') || lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) {
    activities.push('dinner');
  }
  if (lower.includes('park') || lower.includes('parking') || lower.includes('car')) {
    activities.push('parking');
  }
  if (lower.includes('doctor') || lower.includes('clinic') || lower.includes('appointment')) {
    activities.push('appointment');
  }
  if (lower.includes('queue') || lower.includes('token')) {
    activities.push('queue');
  }

  // Default to movie + dinner if general prompt
  if (activities.length === 0) {
    activities.push('restaurant');
  }

  // Extract time
  let time = 'Tonight 7:30 PM';
  if (lower.includes('afternoon') || lower.includes('lunch')) {
    time = '1:30 PM';
  } else if (lower.includes('morning')) {
    time = '11:00 AM';
  } else if (lower.includes('night') || lower.includes('evening') || lower.includes('tonight')) {
    time = 'Tonight 7:30 PM';
  }

  return {
    activities,
    peopleCount,
    budget,
    time,
    date: 'Today',
    rawPrompt: prompt,
    preferences: ['combined_experience', 'less_crowded', 'best_offer'],
  };
};

export const getAiRecommendation = async (
  prompt: string, 
  businesses: Business[]
): Promise<ComboRecommendation> => {
  const intent = await parseUserPrompt(prompt);
  return generateComboRecommendation(intent, businesses);
};
