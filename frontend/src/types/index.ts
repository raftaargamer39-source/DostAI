export type UserRole = 'USER' | 'BUSINESS';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  maxDistanceKm: number;
  budgetLimit: number;
  preferredCrowd: 'Low' | 'Medium' | 'High' | 'Any';
  favoriteCategories: string[];
  notificationsEnabled: boolean;
}

export type CategoryType = 
  | 'Restaurants' 
  | 'Cinemas' 
  | 'Malls' 
  | 'Hospitals' 
  | 'Salons' 
  | 'Events' 
  | 'Parking' 
  | 'Service Centers';

export type CrowdLevel = 'Low' | 'Medium' | 'High';

export interface Business {
  id: string;
  name: string;
  category: CategoryType;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  address: string;
  imageUrl: string;
  openingHours: string;
  currentCrowd: CrowdLevel;
  predictedWaitMinutes: number;
  tags: string[];
  isDemo: boolean;
  lat: number;
  lng: number;
  avgPrice: number;
  hasOffer: boolean;
  offerText?: string;
}

export interface ServiceItem {
  id: string;
  businessId: string;
  name: string;
  category: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface CinemaSeat {
  id: string;
  row: string;
  number: number;
  seatCode: string; // e.g. "B5"
  status: 'available' | 'selected' | 'occupied';
  price: number;
}

export interface RestaurantTable {
  id: string;
  tableNumber: string;
  capacity: number; // 2, 4, 6
  status: 'available' | 'occupied' | 'reserved';
}

export interface ParkingSlot {
  id: string;
  slotNumber: string; // e.g. "P24"
  zone: string;
  status: 'available' | 'occupied' | 'reserved';
  hourlyRate: number;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Booking {
  id: string;
  userId: string;
  businessId: string;
  businessName: string;
  category: CategoryType;
  date: string;
  time: string;
  status: BookingStatus;
  totalPrice: number;
  serviceDetails: string;
  seats?: string[];
  tableId?: string;
  parkingSlot?: string;
  appointmentTime?: string;
  offerDiscount?: number;
  qrCode: string;
  createdAt: string;
}

export interface QueueToken {
  id: string;
  tokenNumber: string; // e.g. "DA-125"
  currentServing: string; // e.g. "DA-109"
  businessId: string;
  businessName: string;
  peopleAhead: number;
  estimatedWaitMinutes: number;
  status: 'waiting' | 'called' | 'completed' | 'cancelled';
  joinedAt: string;
}

export interface Offer {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  discountText: string; // e.g. "₹350 OFF" or "20% OFF"
  discountValue: number;
  category: CategoryType;
  validUntil: string;
  minOrder: number;
  code: string;
  isClaimed?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'queue' | 'offer' | 'system';
  read: boolean;
}

export interface CrowdPredictionPoint {
  hour: string;
  crowdLevel: CrowdLevel;
  crowdPercent: number; // 0 - 100
}

export interface WaitTimeBreakdown {
  entryMinutes: number;
  serviceMinutes: number;
  paymentMinutes: number;
  totalWaitMinutes: number;
  confidenceScorePercent: number;
  bestTimeToVisit: string;
  recommendationReason: string;
}

export interface ParsedIntent {
  activities: string[]; // ['movie', 'dinner', 'parking']
  peopleCount: number;
  budget: number;
  time: string;
  date: string;
  rawPrompt: string;
  preferences: string[];
}

export interface PlanItem {
  type: 'cinema' | 'restaurant' | 'parking' | 'appointment';
  businessId: string;
  businessName: string;
  time: string;
  details: string;
  price: number;
  seats?: string[];
  tableId?: string;
  slotId?: string;
}

export interface ComboRecommendation {
  id: string;
  destinationName: string; // e.g. "City Mall"
  destinationId: string;
  movieTime?: string;
  movieSeats?: string[];
  moviePrice?: number;
  restaurantTime?: string;
  restaurantTable?: string;
  restaurantPrice?: number;
  parkingSlot?: string;
  parkingPrice?: number;
  totalOriginalPrice: number;
  discountAmount: number;
  finalEstimatedTotal: number;
  expectedWaitMinutes: number;
  score: number;
  explanation: string;
  items: PlanItem[];
}
