# 🍊 FreshJuice - Simple Setup Guide

## 📋 What You Need

1. **Node.js** - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Local MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas (Cloud)** - [Sign up free](https://www.mongodb.com/cloud/atlas/register)

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd c:\Arulsuriya\Intern\Juice
npm install
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB
1. Install MongoDB
2. Start MongoDB service:
   ```bash
   net start MongoDB
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Update `.env` file with your connection string

### Step 3: Configure Environment

The `.env` file is already created. If using MongoDB Atlas, update it:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start the Application

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🔐 Admin Login

### Default Credentials

When you first run the app, use these credentials to login:

- **Email**: `admin@freshjuice.com`
- **Password**: `admin123`

The admin account will be automatically created in MongoDB on first login.

### How to Login

1. Open http://localhost:5173
2. Click **"Login"** button in navbar
3. Use the default credentials shown in the modal
4. Click **"Login as Admin"**

## 📊 View Data in MongoDB Compass

### What is MongoDB Compass?

MongoDB Compass is a visual tool to view and manage your MongoDB data.

### Install MongoDB Compass

1. Download from [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Install and open it

### Connect to Your Database

1. Open MongoDB Compass
2. Connection string:
   - **Local**: `mongodb://localhost:27017`
   - **Atlas**: Use your Atlas connection string
3. Click **"Connect"**

### View Your Data

After connecting, you'll see:

1. **Database**: `freshjuice`
2. **Collections**:
   - **users** - Admin account stored here
   - **orders** - All orders stored here

You can:
- View all data
- Edit records
- Delete records
- Search and filter

## 📝 Features

### Admin Dashboard

After login, you can:
- ✅ View all orders
- ✅ Update order status
- ✅ Delete orders
- ✅ See statistics (total orders, revenue, etc.)

### Customer Features

Customers can (without login):
- Browse juice menu
- Place orders
- Track orders by Order ID

## 🔄 How It Works

### 1. Admin Login
- Admin enters email and password
- Backend checks MongoDB for admin user
- If first time, creates admin automatically
- Stores admin session in localStorage

### 2. Orders
- All orders saved directly to MongoDB
- No JWT tokens needed
- Simple and straightforward

### 3. Data Storage
- **MongoDB** stores all data
- **localStorage** stores admin session
- View everything in MongoDB Compass

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem**: Can't connect to MongoDB

**Solution**:
- Ensure MongoDB is running: `net start MongoDB`
- Check `.env` file has correct connection string
- For Atlas, check username/password are correct

### Port Already in Use

**Problem**: Port 5000 or 5173 already in use

**Solution**:
- Change PORT in `.env` to different number (e.g., 5001)
- Or close other applications using these ports

### Admin Login Not Working

**Problem**: Can't login with default credentials

**Solution**:
- Check MongoDB is running
- Check backend console for errors
- Try deleting the user from MongoDB Compass and login again (it will recreate)

## 📱 Testing the App

### 1. Test Admin Login
1. Click "Login"
2. Use default credentials
3. Should see admin dashboard

### 2. Test Orders
1. Go to Menu page
2. Click "Order" on any product
3. Fill form and submit
4. Note the Order ID

### 3. Test Order Tracking
1. Go to Track page
2. Enter Order ID
3. See order status

### 4. Test Admin Features
1. Login as admin
2. Go to Admin dashboard
3. Update order status
4. Delete an order

## 💾 View Data in MongoDB Compass

### See Admin User
1. Open MongoDB Compass
2. Connect to database
3. Open `freshjuice` database
4. Click `users` collection
5. You'll see admin user with:
   - email: admin@freshjuice.com
   - password: (hashed)
   - role: admin

### See Orders
1. In MongoDB Compass
2. Click `orders` collection
3. You'll see all orders with:
   - orderId
   - customer details
   - product info
   - status
   - timestamps

## 🎯 Summary

- **No JWT tokens** - Simple session-based auth
- **No signup** - Only admin login with default credentials
- **All data in MongoDB** - View everything in MongoDB Compass
- **Default admin**: admin@freshjuice.com / admin123

## ✅ Success Checklist

- [ ] MongoDB is running
- [ ] Dependencies installed (`npm install`)
- [ ] Application started (`npm run dev`)
- [ ] Can access http://localhost:5173
- [ ] Can login with default admin credentials
- [ ] Can see admin dashboard
- [ ] MongoDB Compass connected
- [ ] Can see data in MongoDB Compass

---

**Need help?** Check the console for error messages or ensure MongoDB is running properly.
