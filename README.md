# 🇲🇾 Social Media Business Trainer (Instagram & Facebook)

A gamified 7-day training platform for Sabahan small businesses to master social media marketing using AI-powered coaching in Sabahan dialect.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Backend:
- 🔐 JWT Authentication (Register/Login)
- 🎮 Gamification Engine (Progress tracking, badges, stats)
- 🤖 AI-Powered Features (Gemini AI)
  - Bio generation in Bahasa Malaysia
  - Image caption analysis
  - Customer service coaching
  - Hashtag generation
  - General chat with "Coach Digital Sabah"
- 📊 User Progress Tracking
- 💾 MongoDB Data Persistence

### Frontend:
- 📱 Mobile-First Design (480px max width, looks like a phone)
- 🎨 7-Day Interactive Curriculum
- 📈 Real-time Stats Dashboard
- 🗣️ Sabahan Dialect AI Coach
- 🎉 Gamification (Badges, animated stats, confetti)

---

## 🛠️ Tech Stack

### Backend:
- Node.js + Express.js
- MongoDB (Mongoose)
- Google Gemini AI
- JWT Authentication
- bcryptjs (Password hashing)

### Frontend:
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Recharts (Data visualization)
- Lucide React (Icons)
- Canvas Confetti (Celebrations)

---

## 📦 Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Check: `node --version`

2. **MongoDB** (Choose one):
   - **Option A:** MongoDB Atlas (Cloud - Recommended)
     - Sign up: https://www.mongodb.com/cloud/atlas
   - **Option B:** Local MongoDB
     - Download: https://www.mongodb.com/try/download/community

3. **Google Gemini API Key**
   - Get free key: https://makersuite.google.com/app/apikey

4. **Git** (Optional, for version control)
   - Download: https://git-scm.com/

---

## 🚀 Installation

### Step 1: Clone/Download Project

If you have Git:
```powershell
cd C:\Users\Fernado\Desktop
git clone <repository-url> bh2025
cd bh2025
```

Or just navigate to your existing project folder:
```powershell
cd C:\Users\Fernado\Desktop\bh2025
```

---

### Step 2: Backend Setup

#### 2.1 Install Backend Dependencies

```powershell
cd server
npm install
```

#### 2.2 Configure Environment Variables

Copy the example file:
```powershell
Copy-Item .env.example .env
```

Edit `.env` file with your values:
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/social-media-business-trainer
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/social-media-business-trainer

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_key_here_change_me

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Gemini Models
GEMINI_MODEL=gemini-1.5-pro
GEMINI_VISION_MODEL=gemini-1.5-flash

# Server Port
PORT=5000
```

#### 2.3 Start Backend Server

```powershell
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: <your-db-host>
```

**Backend is now running at:** http://localhost:5000

---

### Step 3: Frontend Setup

#### 3.1 Install Frontend Dependencies

Open a **NEW terminal window** (keep backend running):

```powershell
cd C:\Users\Fernado\Desktop\bh2025\client
npm install
```

#### 3.2 Configure Environment Variables

Create `.env` file in `client/` folder:
```powershell
New-Item .env
```

Add this content:
```env
VITE_API_URL=http://localhost:5000/api
```

#### 3.3 Start Frontend Dev Server

```powershell
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Frontend is now running at:** http://localhost:5173

---

## 🎯 Running the Project

### Quick Start (Both Servers)

You need **TWO terminal windows**:

**Terminal 1 - Backend:**
```powershell
cd C:\Users\Fernado\Desktop\bh2025\server
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\Fernado\Desktop\bh2025\client
npm run dev
```

### Accessing the App

1. Open browser: http://localhost:5173
2. Register a new account
3. Start your 7-day journey!

### Testing the Backend API

**Option 1:** Import Postman Collection
- File: `server/postman_collection.json`
- Import into Postman
- Test all endpoints

**Option 2:** Check API Docs
- Visit: http://localhost:5000
- See all available endpoints

---

## 📁 Project Structure

```
bh2025/
├── server/                    # Backend (Node.js + Express)
│   ├── config/
│   │   ├── db.js             # MongoDB connection
│   │   └── sabahan-prompt.js # Sabahan dialect system
│   ├── middleware/
│   │   └── auth.js           # JWT authentication
│   ├── models/
│   │   └── User.js           # User schema
│   ├── routes/
│   │   ├── auth.js           # Register/Login
│   │   ├── user.js           # User profile & progress
│   │   └── ai.js             # AI features (Gemini)
│   ├── .env                  # Environment variables
│   ├── .env.example          # Template
│   ├── package.json
│   ├── server.js             # Main entry point
│   └── README.md             # Backend documentation
│
├── client/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── MobileContainer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── BottomNav.jsx
│   │   │   ├── Button.jsx
│   │   │   └── ... (more components)
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Day1_Setup.jsx
│   │   │   └── ... (7 day pages)
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   ├── api.js        # Axios configuration
│   │   │   └── helpers.js    # Utility functions
│   │   ├── App.jsx           # Router setup
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Tailwind + global styles
│   ├── .env                  # Frontend env vars
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md                 # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Protected Endpoints (Require `Authorization: Bearer <token>`)

#### Get User Profile
```http
GET /user/me
Authorization: Bearer <your_jwt_token>
```

#### Update Progress
```http
PUT /user/progress
Authorization: Bearer <your_jwt_token>

{
  "dayCompleted": 1
}
```

#### AI Features
- `POST /ai/chat` - Chat with Coach Digital Sabah
- `POST /ai/generate-bio` - Generate bios
- `POST /ai/analyze-image` - Analyze image & caption
- `POST /ai/chat-coach` - Grade customer service
- `POST /ai/generate-hashtags` - Generate hashtags

See `server/README.md` for complete API documentation.

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `MongoDB Connection Error`
```
Error: bad auth : authentication failed
```
**Solution:**
1. Check `MONGO_URI` in `.env`
2. If using MongoDB Atlas:
   - Verify username/password
   - Whitelist your IP address
   - Encode special characters in password
3. If using local MongoDB:
   - Ensure MongoDB is running
   - Try: `mongodb://localhost:27017/social-media-business-trainer`

---

**Problem:** `Gemini API Error - 404 Not Found`
```
models/gemini-3.0-pro is not found
```
**Solution:**
1. Check `GEMINI_API_KEY` in `.env`
2. Use valid model names:
   - `gemini-1.5-pro` (recommended)
   - `gemini-1.5-flash` (faster)
   - `gemini-2.0-flash-exp` (experimental)

---

**Problem:** `Port 5000 already in use`
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
1. Change `PORT=5001` in `.env`
2. Or kill the process using port 5000:
   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
   ```

---

### Frontend Issues

**Problem:** `Cannot connect to backend`
```
Network Error / CORS Error
```
**Solution:**
1. Ensure backend is running on http://localhost:5000
2. Check `VITE_API_URL` in `client/.env`
3. Restart both servers

---

**Problem:** `Tailwind classes not working`
```
Styles not applied
```
**Solution:**
1. Ensure Tailwind is installed: `npm list tailwindcss`
2. Check `tailwind.config.js` exists
3. Restart dev server: `npm run dev`

---

**Problem:** `Blank white screen`
```
Nothing shows up
```
**Solution:**
1. Check browser console for errors (F12)
2. Ensure all imports are correct
3. Check if backend is running
4. Try clearing browser cache (Ctrl+Shift+R)

---

## 🎓 Usage Guide

### For New Users:

1. **Register Account**
   - Go to http://localhost:5173/register
   - Create account with username, email, password

2. **Dashboard**
   - See your stats (followers, views, likes)
   - View 7-day timeline
   - Days unlock progressively

3. **Complete Each Day**
   - Day 1: Set up business profile
   - Day 2: Generate professional bios with AI
   - Day 3: Analyze photos & create captions
   - Day 4: Practice customer service
   - Day 5: Generate hashtags
   - Day 6: Design Instagram stories
   - Day 7: View progress report & celebrate!

4. **Chat with Coach**
   - Ask questions anytime
   - Get tips in Sabahan dialect
   - Friendly, supportive coaching

---

## 🔒 Security Notes

- Never commit `.env` files to Git
- Change `JWT_SECRET` in production
- Use strong passwords
- Keep API keys secret
- Enable CORS only for trusted origins in production

---

## 📝 Development Notes

### Available Scripts

**Backend:**
- `npm start` - Run production server
- `npm run dev` - Run development server

**Frontend:**
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

- Backend uses ES6 modules
- Frontend uses JSX/React
- 100% Bahasa Malaysia/Sabahan output
- Mobile-first design (480px max)

---

## 🤝 Support

For issues or questions:
1. Check this README
2. Check `server/README.md` for backend details
3. Check `client/FRONTEND_SETUP.md` for frontend details
4. Review `server/SABAHAN_DIALECT.md` for AI dialect info

---

## 🎉 Credits

Built for Sabahan small businesses to learn social media marketing with AI-powered coaching in authentic Sabahan dialect.

**Language:** Bahasa Malaysia / Sabahan
**Target Audience:** Local Malaysian businesses (especially Sabah)
**AI Coach:** "Coach Digital Sabah" powered by Google Gemini

---

**Ready to start?** Follow the [Installation](#installation) steps above! 🚀
