# 🔐 Customer Authentication Guide

## ✨ Features

### For Customers
- ✅ **Sign Up** - Create new customer account
- ✅ **Login** - Access your account
- ✅ **Auto-fill** - Order forms pre-filled with your info
- ✅ **Profile** - View your details in navbar

### For Admin
- ✅ **Default Login** - Use admin@freshjuice.com / admin123
- ✅ **Dashboard Access** - Full admin panel

## 🚀 How to Use

### Customer Signup

1. Click **"Login"** button in navbar
2. Select **"Customer"** role
3. Click **"Sign Up"** link at bottom
4. Fill in the form:
   - **Name** (required)
   - **Email** (required)
   - **Password** (required, min 6 characters)
   - **Phone** (optional)
   - **Address** (optional)
5. Click **"Sign Up"**
6. Account created! You're automatically logged in

### Customer Login

1. Click **"Login"** button
2. Select **"Customer"** role
3. Enter your email and password
4. Click **"Login as Customer"**

### Admin Login

1. Click **"Login"** button
2. Select **"Admin"** role
3. Use default credentials (shown in blue box):
   - Email: `admin@freshjuice.com`
   - Password: `admin123`
4. Click **"Login as Admin"**

## 💾 Data Storage

All user data is stored in MongoDB:

### View in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Open `freshjuice` database
4. Click `users` collection

You'll see:
- **Admin user** (created on first login)
- **Customer users** (created on signup)

### User Document Structure

```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$hashed...",
  "phone": "1234567890",
  "address": "123 Main St",
  "role": "customer",
  "createdAt": ISODate("2024-...")
}
```

## 🎯 Role-Based Features

### Customer Features
- ✅ Browse menu
- ✅ Place orders (auto-filled with saved info)
- ✅ Track orders
- ✅ View profile in navbar
- ❌ Cannot access admin dashboard

### Admin Features
- ✅ All customer features
- ✅ Access admin dashboard
- ✅ Manage all orders
- ✅ Update order status
- ✅ View statistics

## 🔄 Login Flow

### Customer Signup Flow
```
Click Login 
→ Select "Customer" 
→ Click "Sign Up"
→ Fill form (name, email, password)
→ Submit
→ Backend creates user in MongoDB
→ Password hashed with bcryptjs
→ User logged in automatically
→ Saved to localStorage
→ Navbar shows user name
```

### Customer Login Flow
```
Click Login
→ Select "Customer"
→ Enter email & password
→ Submit
→ Backend checks MongoDB
→ Verifies password hash
→ Checks role matches
→ Returns user data
→ Saved to localStorage
→ Navbar shows user name
```

### Admin Login Flow
```
Click Login
→ Select "Admin"
→ Enter default credentials
→ Submit
→ Backend checks MongoDB
→ If first time, creates admin
→ Verifies password
→ Returns admin data
→ Saved to localStorage
→ Admin link appears in navbar
```

## 📱 UI Components

### Login Modal Features

**Role Selection**
- Customer or Admin toggle
- Visual icons for each role

**Login Mode**
- Email and password fields
- Role-specific button text
- Admin shows default credentials

**Signup Mode** (Customer only)
- Name, email, password (required)
- Phone and address (optional)
- Creates customer account

**Switch Between Modes**
- "Don't have an account? Sign Up"
- "Already have an account? Login"

## 🧪 Testing

### Test Customer Signup
1. Click Login → Customer → Sign Up
2. Create account with:
   - Name: Test Customer
   - Email: customer@test.com
   - Password: test123
3. Should auto-login and show name in navbar

### Test Customer Login
1. Logout
2. Click Login → Customer
3. Enter customer@test.com / test123
4. Should login successfully

### Test Admin Login
1. Click Login → Admin
2. Use admin@freshjuice.com / admin123
3. Should see Admin link in navbar

### Test Auto-fill
1. Login as customer
2. Go to Order page
3. Form should be pre-filled with your info

### Verify in MongoDB Compass
1. Open MongoDB Compass
2. View `users` collection
3. Should see both admin and customer users
4. Passwords should be hashed

## 🔒 Security

- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ Role verification on backend
- ✅ Email uniqueness enforced
- ✅ Minimum password length (6 characters)
- ✅ Session stored in localStorage
- ✅ Role-based access control

## 📊 API Endpoints

### POST /api/auth/signup
Creates new customer account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### POST /api/auth/login
Login customer or admin
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

### POST /api/auth/logout
Logout user (clears localStorage)

## 🎨 Benefits

### For Customers
- No need to enter details every time
- Secure account with password
- Track order history
- Personalized experience

### For Business
- Customer database in MongoDB
- User analytics possible
- Email marketing potential
- Better customer retention

## 🐛 Troubleshooting

### "User already exists"
- Email is already registered
- Try logging in instead
- Or use different email

### "Invalid email or password"
- Check email spelling
- Check password is correct
- Ensure role selection matches account type

### "This account is registered as customer, not admin"
- You selected wrong role
- Switch to correct role and try again

### Can't see data in MongoDB Compass
- Ensure MongoDB is running
- Check connection string
- Refresh the collection view

## ✅ Summary

- **Customers** can signup and login
- **All data** stored in MongoDB
- **Passwords** are hashed securely
- **Auto-fill** for logged-in users
- **Role-based** access control
- **Admin** uses default credentials
- **View everything** in MongoDB Compass

---

**Ready to test!** Create your customer account and start ordering! 🍊
