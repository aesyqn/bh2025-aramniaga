# Social Media Business Trainer - Backend API

A gamified learning platform backend for small businesses to master Instagram & Facebook marketing through a 7-day journey with AI-powered coaching.

## 🚀 Features

- **User Authentication**: JWT-based secure registration and login
- **Gamification Engine**: Track progress through 7 days with stats and badges
- **Sabahan Dialect AI Coach**: "Coach Digital Sabah" speaks in authentic Sabahan Malay dialect - friendly, relatable, and supportive
- **AI Integration**: Google Gemini AI for:
  - General chat with Coach Digital Sabah (ask anything about social media!)
  - Bio generation in Bahasa Malaysia (Instagram & Facebook)
  - Image analysis and caption suggestions in Sabahan dialect
  - Customer service coaching in Sabahan dialect
  - Hashtag generation (Instagram & Facebook)
- **Progress Tracking**: User stats, badges, and content history

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Gemini API Key

## 🔧 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-1.5-pro
   GEMINI_VISION_MODEL=gemini-1.5-flash
   PORT=5000
   ```
   ```

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB on your machine
2. Use connection string: `mongodb://localhost:27017/social-media-business-trainer`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string from "Connect" button
4. Whitelist your IP address
5. Use connection string format: `mongodb+srv://username:password@cluster.mongodb.net/social-media-business-trainer`

## 🔑 Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

### Available Gemini Models

Choose the right model for your needs:

**GEMINI_MODEL** (for text generation):
- `gemini-1.5-pro` ⭐ **Recommended** - Best quality, slower
- `gemini-1.5-flash` - Faster, good quality
- `gemini-2.0-flash-exp` - Experimental, fastest

**GEMINI_VISION_MODEL** (for image analysis):
- `gemini-1.5-flash` ⭐ **Recommended** - Fast and accurate
- `gemini-1.5-pro` - Better quality, slower

## 🏃 Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (Public)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### User Routes (Protected - Requires Bearer Token)

#### Get User Profile
```http
GET /api/user/me
Authorization: Bearer <your_jwt_token>
```

#### Update Business Profile
```http
PUT /api/user/update
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "businessName": "My Coffee Shop",
  "niche": "Cafe",
  "description": "Artisan coffee in KL"
}
```

#### Update Progress (Complete Day)
```http
PUT /api/user/progress
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "dayCompleted": 1
}
```

### AI Routes (Protected - Requires Bearer Token)

#### Chat with Coach Digital Sabah
```http
POST /api/ai/chat
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "message": "Macam mana mau dapat banyak follower?"
}
```

#### Generate Bio (Instagram & Facebook)
```http
POST /api/ai/generate-bio
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "niche": "Cafe",
  "description": "We serve artisan coffee in Kuala Lumpur"
}
```

#### Analyze Image (Instagram/Facebook Posts)
```http
POST /api/ai/analyze-image
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQ..."
}
```

#### Chat Coach
```http
POST /api/ai/chat-coach
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "scenario": "Barang saya rosak! Nak refund!",
  "userReply": "Maaf atas kesulitan ini. Boleh saya bantu?"
}
```

#### Generate Hashtags
```http
POST /api/ai/generate-hashtags
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "keyword": "Kopi"
}
```

## 🧪 Testing with Postman

1. **Create a new collection** in Postman
2. **Register a user** using `/api/auth/register`
3. **Copy the token** from the response
4. **Set up authorization** for protected routes:
   - Type: Bearer Token
   - Token: `<paste_your_token>`
5. **Test each endpoint** according to the examples above

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   └── User.js            # User schema
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── user.js            # User management routes
│   └── ai.js              # AI-powered routes
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js              # Main entry point
```

## 🎮 Gamification System

- **Current Day**: Tracks user's progress (0-7)
- **Completed Days**: Array of finished days
- **Stats**: Followers, views, likes (simulated growth)
- **Badges**: Earned for milestones
  - "First Step" - Complete Day 1
  - "Halfway Hero" - Complete Day 3
  - "7-Day Champion" - Complete Day 7

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected routes require valid token
- Input validation on all endpoints

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check your `MONGO_URI` in `.env`
- Ensure MongoDB is running (if local)
- Whitelist IP in MongoDB Atlas

**Gemini API Error:**
- Verify `GEMINI_API_KEY` is correct
- Check API quota/limits
- Ensure internet connection

**Port Already in Use:**
- Change `PORT` in `.env`
- Or kill process using port 5000

## 📝 Notes

- Base64 image limit: 50MB
- JWT tokens expire in 30 days
- New users start with base stats (100 followers, 250 views, 50 likes)
- All AI responses use Sabahan Malay dialect through "Coach Digital Sabah" persona
- Sabahan dialect includes: "bah", "ka", "sia" (saya), "nda" (tidak), "mau" (hendak), etc.
- Bios and hashtags work for both Instagram and Facebook
- AI coach is friendly, supportive, and speaks like a local Sabahan friend

## 🤝 Support

For issues or questions, please check the API documentation at `http://localhost:5000/` when the server is running.
