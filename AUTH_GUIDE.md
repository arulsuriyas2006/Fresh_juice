# 🔐 Authentication System Guide

Complete guide to using the FreshJuice authentication system.

## 🎯 Features Overview

### ✅ Implemented Features

1. **User Registration (Signup)**
   - Customer and Admin role selection
   - Email validation
   - Password hashing (bcryptjs)
   - Automatic login after signup

2. **User Login**
   - Email and password authentication
   - Role-based login
   - JWT token generation
   - Persistent sessions (localStorage)

3. **Forgot Password**
   - Email-based password reset
   - Secure reset tokens
   - Token expiration (1 hour)
   - Email notifications

4. **Role-Based Access Control**
   - Customer role: Can place and track orders
   - Admin role: Full dashboard access, order management
   - Protected routes and API endpoints

5. **User Profile**
   - Auto-fill order forms with user data
   - Profile information display
   - Logout functionality

## 🚪 Login Button in Navbar

The navbar now shows:
- **Login button** (when not logged in)
- **User menu** with name and role (when logged in)
- **Admin link** (only visible to admins)

## 📝 How to Use

### For Customers

1. **Sign Up**
   - Click "Login" button in navbar
   - Select "Customer" role
   - Click "Sign Up" link
   - Fill in: Name, Email, Password, Phone (optional), Address (optional)
   - Click "Sign Up"

2. **Login**
   - Click "Login" button
   - Select "Customer" role
   - Enter email and password
   - Click "Login"

3. **Place Orders**
   - Browse menu and select products
   - Order form auto-fills with your information
   - Track your orders

4. **Logout**
   - Click your name in navbar
   - Click "Logout"

### For Admins

1. **Sign Up as Admin**
   - Click "Login" button
   - Select "Admin" role
   - Click "Sign Up" link
   - Fill in details
   - Click "Sign Up"

2. **Access Admin Dashboard**
   - After login, "Admin" link appears in navbar
   - Click "Admin" to access dashboard
   - View statistics, manage orders

3. **Manage Orders**
   - Update order status via dropdown
   - Delete individual orders
   - Clear all orders
   - Refresh data

### Password Reset

1. **Request Reset**
   - Click "Login" → "Forgot Password?"
   - Enter your email
   - Click "Send Reset Link"

2. **Reset Password**
   - Check your email for reset link
   - Click link (or use token in development)
   - Enter new password
   - Login with new password

## 🔒 Security Features

### Password Security
- Minimum 6 characters required
- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text

### Token Security
- JWT tokens with 30-day expiration
- Tokens stored in localStorage
- Validated on every protected request

### API Security
- Protected endpoints require valid JWT
- Role-based middleware authorization
- CORS configuration for frontend

### Input Validation
- Email format validation
- Required field checks
- Phone number validation (10 digits)

## 🎨 UI Components

### AuthModal Component
Location: `src/components/AuthModal.jsx`

Features:
- Login form
- Signup form
- Forgot password form
- Role selection (Customer/Admin)
- Form validation
- Error/success messages
- Smooth animations

### Navbar Updates
Location: `src/components/Navbar.jsx`

Changes:
- Replaced "Admin" button with "Login" button
- Added user dropdown menu
- Shows user name and role when logged in
- Admin link only visible to admins
- Logout functionality

## 🗄️ Data Storage

### Frontend (localStorage)
```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Backend (MongoDB)
```javascript
// User Collection
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$hashed...",
  "phone": "1234567890",
  "address": "123 Main St",
  "role": "customer",
  "createdAt": ISODate,
  "resetPasswordToken": null,
  "resetPasswordExpire": null
}

// Order Collection
{
  "_id": ObjectId,
  "orderId": "ORD123456",
  "userId": ObjectId (optional),
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St",
  "productId": 1,
  "productName": "Classic Orange Juice",
  "quantity": 2,
  "totalPrice": 178,
  "paymentMode": "cash",
  "status": "received",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

## 🔄 Authentication Flow

### Signup Flow
```
User clicks "Login" 
→ Selects role (Customer/Admin)
→ Clicks "Sign Up"
→ Fills form
→ Submits
→ Backend validates
→ Creates user in MongoDB
→ Hashes password
→ Generates JWT token
→ Returns token + user data
→ Frontend stores in localStorage
→ Auto-login
→ Redirects to home
```

### Login Flow
```
User clicks "Login"
→ Selects role
→ Enters credentials
→ Submits
→ Backend validates
→ Checks role matches
→ Compares password hash
→ Generates JWT token
→ Returns token + user data
→ Frontend stores in localStorage
→ Updates UI
→ Shows user menu
```

### Protected Route Access
```
User navigates to /admin
→ Frontend checks if user exists
→ Checks if user.role === 'admin'
→ If not admin: Redirect to home
→ If admin: Allow access
→ Backend validates JWT on API calls
→ Checks role in middleware
→ Returns data or 403 Forbidden
```

## 🧪 Testing Scenarios

### Test Case 1: Customer Signup & Order
1. Sign up as customer
2. Login
3. Browse menu
4. Place order (form auto-filled)
5. Track order
6. Logout

### Test Case 2: Admin Access
1. Sign up as admin
2. Login
3. Verify "Admin" link appears
4. Access admin dashboard
5. View statistics
6. Update order status
7. Logout

### Test Case 3: Role Protection
1. Login as customer
2. Try to access /admin directly
3. Should be redirected to home
4. Logout
5. Login as admin
6. Access /admin successfully

### Test Case 4: Password Reset
1. Click "Forgot Password"
2. Enter email
3. Check email/console for token
4. Use token to reset password
5. Login with new password

## 🐛 Common Issues & Solutions

### Issue: "User not found"
**Solution:** Check email spelling, ensure user is registered

### Issue: "Invalid email or password"
**Solution:** Verify credentials, check role selection matches account

### Issue: "Access denied. Admin only"
**Solution:** Login with admin account, not customer account

### Issue: Token expired
**Solution:** Logout and login again to get new token

### Issue: MongoDB connection error
**Solution:** Ensure MongoDB is running, check .env configuration

## 📊 API Response Examples

### Successful Login
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "role": "customer"
  }
}
```

### Failed Login
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Protected Endpoint (No Token)
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

## 🎓 Best Practices

1. **Always logout** when using shared computers
2. **Use strong passwords** (minimum 6 characters, mix of letters and numbers)
3. **Don't share** admin credentials
4. **Verify role** before attempting admin actions
5. **Check email** for password reset links
6. **Clear browser cache** if experiencing login issues

## 🚀 Future Enhancements

Potential improvements:
- Email verification on signup
- Two-factor authentication (2FA)
- Social login (Google, Facebook)
- Remember me functionality
- Session timeout warnings
- Password strength meter
- Account deletion
- Profile picture upload
- Order history page for customers

---

**Need help?** Check [SETUP.md](SETUP.md) for installation instructions or [README.md](README.md) for project overview.
