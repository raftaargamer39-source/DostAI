# 🏙️ DostAI — Your AI Dost for the City

> **"Tell Dost what you want. Find the best place, best time, best deal — and book it."**

DostAI is an AI-powered city companion that transforms how urban residents discover, compare, and book experiences across restaurants, cinemas, parking, healthcare, salons, and virtual queues.

---

## ✨ Features

- 🤖 **Natural Language City AI**: Understands complex multi-activity intent (e.g., *"Movie and dinner for 4 friends under ₹2000 tonight"*).
- ⚖️ **Weighted AI Recommendation Engine**: Evaluates wait time (25%), crowd (20%), price (15%), distance (15%), availability (10%), rating (10%), and offers (5%).
- 📊 **Crowd & Wait-Time Prediction Engine**: Predicts hourly crowd trends, provides entry/service/payment bottleneck breakdowns, confidence scores, and identifies the best time to visit.
- 🎟️ **Multi-Service Booking System**:
  - 🎬 **Cinema**: Interactive 2D seat selection grid (A1-C5) with live price estimation.
  - 🍽️ **Restaurant**: Table booking (2/4/6 seaters) with date & time slots.
  - 🅿️ **Parking**: Real-time slot grid (P01-P20) reservation.
  - 🎫 **Virtual Queue**: Real-time token generator, live queue position tracking, and ticket updates.
  - ⚡ **Combo Bookings**: 1-Click atomic multi-service booking ("Book Everything").
- 📱 **QR Ticket Verification**: Safe booking identifier QR code generation (`DA-2026-XXXXX`).
- 🏬 **Business Dashboard**:
  - Daily Visitor & Revenue analytics.
  - Real-time Virtual Queue Control Room ("Next Customer", Pause, Resume).
  - Service & Offer CRUD Management.
  - 🔮 **What-If AI Simulator**: Simulates wait-time reductions and throughput gains when staff or counters are added.
- ⚡ **Hackathon Demo Mode**: 1-Click presentation mode with pre-loaded realistic scenarios.

---

## 🔑 Demo Credentials

### User Demo Account
- **Email**: `user@dostai.demo`
- **Password**: `demo123`

### Business Owner Demo Account
- **Email**: `business@dostai.demo`
- **Password**: `demo123`

*(You can also use the Role Switcher toggle button in the header at any time during testing!)*

---

## 🚀 Hackathon Demo Steps

1. **Open Application**: Click **⚡ Load Demo Scenario** on the AI Chat or Dashboard page.
2. **Execute Natural Language Prompt**:
   - Prompt: *"Dost, I want to watch a movie and have dinner with 3 friends tonight under ₹2000."*
3. **Review Dost's Pick**:
   - View **City Mall** multi-experience recommendation (7:30 PM Movie Seats B5-B8 + 9:15 PM 4-Person Table + Parking Slot P24 + ₹350 Discount Offer = ₹1,780 Total, 14 min Expected Wait).
4. **Click "Book Everything"**:
   - Atomically reserves cinema seats, restaurant table, and parking slot.
   - Generates QR code ticket and pushes notifications.
5. **View Ticket & Queue**:
   - Go to **My Bookings** to inspect QR Ticket.
   - Join CineMax virtual queue to receive live token `DA-125`.
6. **Switch to Business Dashboard**:
   - Click **"Role: Business"** in the top navigation bar.
   - Observe incoming bookings, real-time visitor stats, and live queue controller.
   - Click **"Next Customer"** in Queue Manager to advance the live queue token.
7. **Demonstrate AI What-If Simulator**:
   - Select scenario *"Add 2 service counters"* in the What-If Simulator.
   - Watch predicted wait time drop from 45 min to 25 min (44% improvement).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router v6.
- **Backend**: FastAPI (Python), SQLite / PostgreSQL support, SQLAlchemy, Pydantic v2.
- **AI/ML**: Synthetic Explainable Prediction Models + Dual LLM Abstraction (Gemini API + Deterministic Parser Fallback).

---

## 📦 Run Commands

### 1. Frontend Setup & Launch
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173 in your browser.

### 2. Backend Setup & Launch (Optional)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m app.database.seed
uvicorn main:app --reload --port 8000
```
Open API docs at http://localhost:8000/docs.

*Note: The frontend includes a full offline/local state service fallback so all features, state persistence, bookings, and demo scenarios work 100% locally out-of-the-box!*
