import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Business, 
  Booking, 
  Offer, 
  QueueToken, 
  NotificationItem,
  ComboRecommendation
} from '../types';
import { 
  INITIAL_BUSINESSES, 
  INITIAL_BOOKINGS, 
  INITIAL_OFFERS, 
  INITIAL_QUEUE_TOKEN, 
  INITIAL_NOTIFICATIONS 
} from '../data/seedData';

interface AppContextType {
  businesses: Business[];
  bookings: Booking[];
  offers: Offer[];
  queueToken: QueueToken | null;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  
  // Actions
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'qrCode'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  addComboBooking: (recommendation: ComboRecommendation) => void;
  
  // Queue Actions
  joinQueue: (businessId: string, businessName: string) => void;
  leaveQueue: () => void;
  advanceQueueToken: () => void; // Business action: Next customer
  
  // Business CRUD
  addBusiness: (business: Omit<Business, 'id'>) => void;
  updateBusiness: (id: string, business: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;
  
  // Offer CRUD & Usage
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  deleteOffer: (id: string) => void;
  claimOffer: (offerId: string) => void;

  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem('dostai_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('dostai_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('dostai_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [queueToken, setQueueToken] = useState<QueueToken | null>(() => {
    const saved = localStorage.getItem('dostai_queue_token');
    return saved ? JSON.parse(saved) : INITIAL_QUEUE_TOKEN;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('dostai_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dostai_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('dostai_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('dostai_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    if (queueToken) {
      localStorage.setItem('dostai_queue_token', JSON.stringify(queueToken));
    } else {
      localStorage.removeItem('dostai_queue_token');
    }
  }, [queueToken]);

  useEffect(() => {
    localStorage.setItem('dostai_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'system') => {
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'qrCode'>): Booking => {
    const id = `DA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id,
      status: 'Confirmed',
      qrCode: id,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setBookings(prev => [newBooking, ...prev]);
    addNotification('Booking Confirmed! 🎉', `Your reservation for ${newBooking.businessName} has been saved. Booking ID: ${id}`, 'booking');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    addNotification('Booking Cancelled', `Booking ${bookingId} was successfully cancelled.`, 'booking');
  };

  const addComboBooking = (recommendation: ComboRecommendation) => {
    const comboId = `DA-2026-COMBO${Math.floor(100 + Math.random() * 900)}`;

    const newBooking: Booking = {
      id: comboId,
      userId: 'u-demo-1',
      businessId: recommendation.destinationId,
      businessName: recommendation.destinationName,
      category: 'Malls',
      date: 'Today, 2026-08-12',
      time: '7:30 PM - 11:30 PM',
      status: 'Confirmed',
      totalPrice: recommendation.finalEstimatedTotal,
      serviceDetails: `Multi-Service Experience: Movie (7:30 PM Seats B5-B8) + Dinner (9:15 PM Table T-04) + Parking (Slot P24)`,
      seats: recommendation.movieSeats,
      tableId: recommendation.restaurantTable,
      parkingSlot: recommendation.parkingSlot,
      offerDiscount: recommendation.discountAmount,
      qrCode: comboId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setBookings(prev => [newBooking, ...prev]);
    addNotification('⚡ Everything Booked!', `Movie, Dinner & Parking confirmed at City Mall! Saved ₹350. Booking ID: ${comboId}`, 'booking');
  };

  const joinQueue = (businessId: string, businessName: string) => {
    const tokenNum = `DA-${Math.floor(110 + Math.random() * 50)}`;
    const currentNum = `DA-109`;
    const newQueue: QueueToken = {
      id: `qt-${Date.now()}`,
      tokenNumber: tokenNum,
      currentServing: currentNum,
      businessId,
      businessName,
      peopleAhead: 14,
      estimatedWaitMinutes: 18,
      status: 'waiting',
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setQueueToken(newQueue);
    addNotification('Virtual Queue Joined 🎫', `You are #${newQueue.peopleAhead} in line for ${businessName}. Token: ${tokenNum}`, 'queue');
  };

  const leaveQueue = () => {
    if (queueToken) {
      addNotification('Left Queue', `You have left the virtual queue for ${queueToken.businessName}.`, 'queue');
    }
    setQueueToken(null);
  };

  const advanceQueueToken = () => {
    if (queueToken && queueToken.peopleAhead > 0) {
      const currentVal = parseInt(queueToken.currentServing.replace('DA-', ''), 10) + 1;
      const updatedServing = `DA-${currentVal}`;
      const newAhead = Math.max(0, queueToken.peopleAhead - 1);
      const newWait = Math.max(2, queueToken.estimatedWaitMinutes - 2);

      const updated: QueueToken = {
        ...queueToken,
        currentServing: updatedServing,
        peopleAhead: newAhead,
        estimatedWaitMinutes: newWait,
        status: newAhead === 0 ? 'called' : 'waiting',
      };

      setQueueToken(updated);
      if (newAhead === 0) {
        addNotification('It\'s Your Turn! 🔔', `Token ${queueToken.tokenNumber} is called now at ${queueToken.businessName}!`, 'queue');
      } else {
        addNotification('Queue Advanced ⏩', `Token ${updatedServing} is now being served. You are #${newAhead} ahead.`, 'queue');
      }
    }
  };

  const addBusiness = (bData: Omit<Business, 'id'>) => {
    const newB: Business = {
      ...bData,
      id: `b-${Date.now()}`,
    };
    setBusinesses(prev => [newB, ...prev]);
    addNotification('Business Created', `New business "${newB.name}" added to DostAI.`, 'system');
  };

  const updateBusiness = (id: string, partial: Partial<Business>) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, ...partial } : b));
  };

  const deleteBusiness = (id: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
  };

  const addOffer = (oData: Omit<Offer, 'id'>) => {
    const newO: Offer = {
      ...oData,
      id: `off-${Date.now()}`,
    };
    setOffers(prev => [newO, ...prev]);
    addNotification('New Offer Live 🏷️', `Offer "${newO.title}" created for ${newO.businessName}.`, 'offer');
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  const claimOffer = (offerId: string) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, isClaimed: true } : o));
    const target = offers.find(o => o.id === offerId);
    if (target) {
      addNotification('Offer Claimed! 🏷️', `You unlocked ${target.discountText} (${target.code}) for your next booking.`, 'offer');
    }
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        businesses,
        bookings,
        offers,
        queueToken,
        notifications,
        unreadNotificationCount,
        addBooking,
        cancelBooking,
        addComboBooking,
        joinQueue,
        leaveQueue,
        advanceQueueToken,
        addBusiness,
        updateBusiness,
        deleteBusiness,
        addOffer,
        deleteOffer,
        claimOffer,
        markNotificationAsRead,
        clearNotifications,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
