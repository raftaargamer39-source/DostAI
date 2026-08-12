import { CrowdPredictionPoint, WaitTimeBreakdown } from '../types';

export const getHourlyCrowdPrediction = (businessId: string): CrowdPredictionPoint[] => {
  return [
    { hour: '09:00 AM', crowdLevel: 'Low', crowdPercent: 20 },
    { hour: '10:00 AM', crowdLevel: 'Medium', crowdPercent: 45 },
    { hour: '11:00 AM', crowdLevel: 'High', crowdPercent: 78 },
    { hour: '12:00 PM', crowdLevel: 'High', crowdPercent: 88 },
    { hour: '01:00 PM', crowdLevel: 'Medium', crowdPercent: 62 },
    { hour: '02:00 PM', crowdLevel: 'Low', crowdPercent: 28 },
    { hour: '03:00 PM', crowdLevel: 'Low', crowdPercent: 32 },
    { hour: '04:00 PM', crowdLevel: 'Medium', crowdPercent: 55 },
    { hour: '05:00 PM', crowdLevel: 'High', crowdPercent: 82 },
    { hour: '06:00 PM', crowdLevel: 'High', crowdPercent: 92 },
    { hour: '07:00 PM', crowdLevel: 'High', crowdPercent: 85 },
    { hour: '08:00 PM', crowdLevel: 'Medium', crowdPercent: 60 },
    { hour: '09:00 PM', crowdLevel: 'Low', crowdPercent: 35 },
  ];
};

export const getWaitTimeBreakdown = (businessId: string): WaitTimeBreakdown => {
  return {
    entryMinutes: 3,
    serviceMinutes: 10,
    paymentMinutes: 5,
    totalWaitMinutes: 18,
    confidenceScorePercent: 87,
    bestTimeToVisit: '02:00 PM',
    recommendationReason: 'Lower predicted crowd density and minimal queue at entry & payment counters.',
  };
};

export interface WhatIfInput {
  additionalCounters: number;
  additionalStaff: number;
  reducedServiceTimeMinutes: number;
}

export interface WhatIfOutput {
  currentWaitMinutes: number;
  predictedWaitMinutes: number;
  improvementPercent: number;
  throughputIncreasePercent: number;
  recommendationNote: string;
}

export const runWhatIfSimulation = (input: WhatIfInput): WhatIfOutput => {
  const baseWait = 45;
  
  // Calculate reduction factors
  const counterImpact = input.additionalCounters * 10;
  const staffImpact = input.additionalStaff * 5;
  const timeImpact = input.reducedServiceTimeMinutes * 3;
  
  const totalReduction = Math.min(32, counterImpact + staffImpact + timeImpact);
  const predictedWait = Math.max(8, baseWait - totalReduction);
  
  const improvement = Math.round(((baseWait - predictedWait) / baseWait) * 100);
  const throughput = Math.round(improvement * 1.2);

  return {
    currentWaitMinutes: baseWait,
    predictedWaitMinutes: predictedWait,
    improvementPercent: improvement,
    throughputIncreasePercent: throughput,
    recommendationNote: `Adding ${input.additionalCounters} counter(s) and ${input.additionalStaff} staff member(s) reduces bottleneck delays significantly during peak 12 PM - 2 PM windows.`,
  };
};
