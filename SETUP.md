# 🍊 FreshJuice - Setup Guide

Complete setup instructions for the FreshJuice authentication system with MongoDB.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local MongoDB - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas/register)
- **npm** or **yarn** package manager

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
cd c:\Arulsuriya\Intern\Juice
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Or run mongod directly
   mongod --dbpath="C:\data\db"
   ```
3. Your MongoDB will be running at `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (Free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your database user password
7. Add `/freshjuice` at the end of the connection string

### 3. Environment Configuration

1. Open the `.env` file in the root directory
2. Update the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/freshjuice
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/freshjuice

# JWT Secret (IMPORTANT: Change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server Port
PORT=5000

# Email Configuration (Optional - for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=FreshJuice <noreply@freshjuice.com>

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Email Setup (Optional)

For password reset functionality, configure email:

#### Using Gmail:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Windows Computer"
   - Copy the generated password
4. Update `.env`:
   ```env
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

## 🏃 Running the Application

### Development Mode (Recommended)

Run both frontend and backend together:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## 🧪 Testing the Application

### 1. Create Admin Account

1. Open http://localhost:5173
2. Click "Login" button in navbar
3. Select "Admin" role
4. Click "Sign Up"
5. Fill in the form:
   - Name: Admin User
   - Email: admin@freshjuice.com
   - Password: admin123
6. Click "Sign Up"

### 2. Create Customer Account

1. Click "Login" again
2. Select "Customer" role
3. Click "Sign Up"
4. Fill in the form with customer details
5. Click "Sign Up"

### 3. Test Features

**As Customer:**
- Browse products
- Place orders
- Track orders
- Update profile

**As Admin:**
- Access Admin Dashboard
- View all orders
- Update order status
- Delete orders
- View statistics

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/update-profile` - Update profile (Protected)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders (Protected)
- `GET /api/orders/:orderId` - Get order by ID
- `PUT /api/orders/:orderId/status` - Update status (Admin only)
- `DELETE /api/orders/:orderId` - Delete order (Admin only)

## 🛠️ Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- For local MongoDB: `net start MongoDB` (Windows)

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
- Change PORT in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000

### CORS Error

**Error:** `Access to fetch has been blocked by CORS policy`

**Solution:**
- Ensure backend is running
- Check FRONTEND_URL in `.env` matches your frontend URL

### Email Not Sending

**Solution:**
- Email is optional for development
- The reset token will be shown in the API response
- Configure email settings properly for production

## 📁 Project Structure

```
Juice/
├── server/                 # Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── index.js           # Server entry
├── src/                   # Frontend
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── context/          # Auth context
│   ├── services/         # API services
│   └── data/             # Static data
├── .env                   # Environment variables
├── package.json          # Dependencies
└── README.md             # Documentation
```

## 🔒 Security Notes

1. **Change JWT_SECRET** in production to a strong random string
2. **Never commit** `.env` file to version control
3. **Use HTTPS** in production
4. **Enable MongoDB authentication** in production
5. **Rate limit** API endpoints in production
6. **Validate** all user inputs on backend

## 📝 Default Test Accounts

After setup, you can create these test accounts:

**Admin:**
- Email: admin@freshjuice.com
- Password: admin123
- Role: Admin

**Customer:**
- Email: customer@freshjuice.com
- Password: customer123
- Role: Customer

## 🆘 Need Help?

If you encounter any issues:

1. Check MongoDB is running: `mongosh` or `mongo`
2. Check server logs in terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Ensure all dependencies are installed: `npm install`

## 🎉 Success!

If everything is set up correctly, you should see:
- ✅ MongoDB connected successfully
- 🚀 Server running on http://localhost:5000
- Frontend running on http://localhost:5173

You can now use the full authentication system with role-based access control!
