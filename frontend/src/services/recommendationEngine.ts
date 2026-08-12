import { ParsedIntent, ComboRecommendation, Business, PlanItem } from '../types';

export interface WeightConfig {
  waitTimeWeight: number; // 0.25
  crowdWeight: number;    // 0.20
  priceWeight: number;    // 0.15
  distanceWeight: number; // 0.15
  availabilityWeight: number; // 0.10
  ratingWeight: number;   // 0.10
  offerWeight: number;    // 0.05
}

export const DEFAULT_WEIGHTS: WeightConfig = {
  waitTimeWeight: 0.25,
  crowdWeight: 0.20,
  priceWeight: 0.15,
  distanceWeight: 0.15,
  availabilityWeight: 0.10,
  ratingWeight: 0.10,
  offerWeight: 0.05,
};

export const calculateBusinessScore = (
  business: Business, 
  userBudget: number, 
  weights: WeightConfig = DEFAULT_WEIGHTS
): number => {
  // Wait time score (0-100, lower wait is better)
  const waitScore = Math.max(0, 100 - (business.predictedWaitMinutes * 3));
  
  // Crowd score (0-100, lower crowd is better)
  const crowdScore = business.currentCrowd === 'Low' ? 100 : business.currentCrowd === 'Medium' ? 65 : 30;

  // Price score (0-100, within budget is better)
  const priceRatio = business.avgPrice / Math.max(1, userBudget);
  const priceScore = priceRatio <= 1 ? Math.max(0, 100 - priceRatio * 40) : Math.max(0, 50 - (priceRatio - 1) * 100);

  // Distance score (0-100, closer is better)
  const distanceScore = Math.max(0, 100 - business.distanceKm * 15);

  // Availability score
  const availabilityScore = 95;

  // Rating score (0-100)
  const ratingScore = (business.rating / 5) * 100;

  // Offer score
  const offerScore = business.hasOffer ? 100 : 20;

  // Weighted total sum
  const totalScore = (
    waitScore * weights.waitTimeWeight +
    crowdScore * weights.crowdWeight +
    priceScore * weights.priceWeight +
    distanceScore * weights.distanceWeight +
    availabilityScore * weights.availabilityWeight +
    ratingScore * weights.ratingWeight +
    offerScore * weights.offerWeight
  );

  return Math.round(totalScore);
};

export const generateComboRecommendation = (
  intent: ParsedIntent,
  businesses: Business[]
): ComboRecommendation => {
  const cityMall = businesses.find(b => b.id === 'b-city-mall') || businesses[0];
  const people = intent.peopleCount || 4;
  
  // Master Demo Scenario setup (Movie + Dinner + Parking under ₹2000)
  const moviePricePerSeat = 280;
  const totalMoviePrice = moviePricePerSeat * people; // 280 * 4 = 1120
  const dinnerEstPrice = 950;
  const parkingPrice = 60;
  
  const totalOriginal = totalMoviePrice + dinnerEstPrice + parkingPrice; // 1120 + 950 + 60 = 2130
  const discountAmount = 350;
  const finalTotal = totalOriginal - discountAmount; // 1780

  const items: PlanItem[] = [
    {
      type: 'cinema',
      businessId: 'b-cinemax',
      businessName: 'CineMax Multiplex',
      time: '7:30 PM',
      details: `${people} Seats: B5, B6, B7, B8`,
      price: totalMoviePrice,
      seats: ['B5', 'B6', 'B7', 'B8'],
    },
    {
      type: 'restaurant',
      businessId: 'b-spice-route',
      businessName: 'Spice Route Bistro',
      time: '9:15 PM',
      details: `${people}-Person Reserved Table (T-04)`,
      price: dinnerEstPrice,
      tableId: 't-104',
    },
    {
      type: 'parking',
      businessId: 'b-quickpark',
      businessName: 'QuickPark Smart Garage',
      time: '7:00 PM - 11:30 PM',
      details: 'Reserved Slot P24 (Level B)',
      price: parkingPrice,
      slotId: 'p-24',
    }
  ];

  return {
    id: 'rec-combo-01',
    destinationId: cityMall.id,
    destinationName: cityMall.name,
    movieTime: '7:30 PM',
    movieSeats: ['B5', 'B6', 'B7', 'B8'],
    moviePrice: totalMoviePrice,
    restaurantTime: '9:15 PM',
    restaurantTable: 'T-04 (4-Seater)',
    restaurantPrice: dinnerEstPrice,
    parkingSlot: 'P24',
    parkingPrice: parkingPrice,
    totalOriginalPrice: totalOriginal,
    discountAmount: discountAmount,
    finalEstimatedTotal: finalTotal,
    expectedWaitMinutes: 14,
    score: 96,
    explanation: 'Dost picked City Mall because it combines your movie & dinner in one location, fits your ₹2000 budget with a ₹350 discount, and has a low 14-min predicted wait time.',
    items,
  };
};
