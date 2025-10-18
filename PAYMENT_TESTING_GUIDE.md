# 🧪 Payment Testing Guide

## ✅ Pre-Testing Checklist

Before testing payments, ensure:

### 1. MongoDB is Running
```bash
# Windows
net start MongoDB

# Or check if running
mongosh
```

### 2. Backend Server is Running
```bash
# Should see these messages:
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### 3. Frontend is Running
```bash
# Should see:
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

### 4. Internet Connection
- Active internet required for Razorpay SDK
- Check: https://checkout.razorpay.com/v1/checkout.js

---

## 🧪 Test Scenario 1: Cash on Delivery

### Steps:
1. Go to http://localhost:5173
2. Login (or signup)
3. Go to Menu page
4. Click "Order" on any product
5. Add products to cart
6. Fill in details
7. Select **"Cash on Delivery"**
8. Click "Place Order"

### Expected Result:
✅ Order placed immediately
✅ Success page shows
✅ Order ID displayed
✅ Order saved in MongoDB with `paymentStatus: "cod"`

### Check in MongoDB:
```javascript
db.orders.find({ paymentMode: "cash" }).pretty()
```

---

## 🧪 Test Scenario 2: Online Payment (Success)

### Steps:
1. Go to Order page
2. Add products to cart
3. Fill in details
4. Select **"Online Payment"**
5. Click "Place Order"
6. **Razorpay modal should open**
7. Select "Card" payment method
8. Enter test card details:
   - **Card Number**: `4111 1111 1111 1111`
   - **CVV**: `123`
   - **Expiry**: `12/25`
   - **Name**: `Test User`
9. Click "Pay Now"

### Expected Result:
✅ Razorpay modal opens
✅ Payment processes
✅ Modal closes
✅ Order saved in MongoDB with `paymentStatus: "paid"`
✅ Success page shows
✅ Order ID displayed

### Check in MongoDB:
```javascript
db.orders.find({ paymentMode: "online", paymentStatus: "paid" }).pretty()
```

### Check Browser Console:
```
✅ Razorpay script loaded successfully
✅ Opening Razorpay with options: ...
✅ Payment successful: { razorpay_payment_id: "pay_xxx", ... }
```

---

## 🧪 Test Scenario 3: Online Payment (Cancelled)

### Steps:
1. Go to Order page
2. Add products to cart
3. Fill in details
4. Select **"Online Payment"**
5. Click "Place Order"
6. Razorpay modal opens
7. **Click X button** or **press ESC** to close modal

### Expected Result:
✅ Modal closes
✅ Alert shows: "Payment cancelled or failed: Payment cancelled by user"
✅ Order NOT saved in database
✅ User stays on order page
✅ Can try again

### Check Browser Console:
```
✅ Payment cancelled by user
```

---

## 🧪 Test Scenario 4: Multiple Products

### Steps:
1. Go to Order page
2. Select "Classic Orange Juice", Quantity: 2
3. Click "Add to Cart"
4. Select "Vitamin Boost", Quantity: 1
5. Click "Add to Cart"
6. Cart shows 2 items
7. Fill in details
8. Select "Online Payment"
9. Click "Place Order"
10. Complete payment with test card

### Expected Result:
✅ Both products in cart
✅ Total price calculated correctly
✅ Razorpay shows correct total amount
✅ Payment succeeds
✅ **2 separate orders** created in MongoDB (one for each product)
✅ Both orders have same Order ID
✅ Success page shows

### Check in MongoDB:
```javascript
// Should see 2 orders with same orderId
db.orders.find({ orderId: "OJ-xxxxxxxxxx" }).pretty()
```

---

## 🧪 Test Scenario 5: Different Payment Methods in Razorpay

### Test UPI:
1. Open Razorpay modal
2. Select "UPI" tab
3. Enter: `success@razorpay`
4. Click "Pay"

**Expected**: ✅ Payment succeeds

### Test Net Banking:
1. Open Razorpay modal
2. Select "Net Banking" tab
3. Select any bank
4. Click "Pay"
5. On test page, click "Success"

**Expected**: ✅ Payment succeeds

### Test Wallet:
1. Open Razorpay modal
2. Select "Wallets" tab
3. Select any wallet
4. Complete test payment

**Expected**: ✅ Payment succeeds

---

## 🐛 Common Issues & Quick Fixes

### Issue 1: Razorpay Modal Not Opening

**Check:**
```javascript
// Open browser console (F12)
// Look for errors
```

**Quick Fix:**
1. Check internet connection
2. Refresh page
3. Try in incognito mode
4. Check console for "Razorpay script loaded successfully"

---

### Issue 2: "Failed to load Razorpay SDK"

**Cause**: No internet or script blocked

**Quick Fix:**
1. Check internet connection
2. Disable ad blockers
3. Try different browser
4. Check firewall settings

---

### Issue 3: Payment Succeeds but Order Not Saved

**Check:**
```bash
# Check MongoDB is running
mongosh

# Check backend logs
# Look for errors in terminal
```

**Quick Fix:**
1. Restart MongoDB
2. Restart backend server
3. Check MongoDB connection in backend logs

---

### Issue 4: "Loading..." Button Stuck

**Cause**: Error in payment flow

**Quick Fix:**
1. Refresh page
2. Check browser console
3. Try again

---

## 📊 Verification Checklist

After each test, verify:

### In Browser:
- [ ] No console errors
- [ ] Success page displays
- [ ] Order ID shown
- [ ] Can track order

### In MongoDB Compass:
- [ ] Order exists in `orders` collection
- [ ] Correct `paymentMode` ("cash" or "online")
- [ ] Correct `paymentStatus` ("cod" or "paid")
- [ ] All product details correct
- [ ] Customer details saved

### In Backend Logs:
- [ ] No errors
- [ ] Order creation logged
- [ ] MongoDB queries successful

---

## 🎯 Success Criteria

Payment integration is working if:

✅ **Cash on Delivery**:
- Order placed immediately
- Saved with status "cod"

✅ **Online Payment**:
- Razorpay modal opens
- Test card payment succeeds
- Order saved with status "paid"
- Payment ID captured

✅ **Error Handling**:
- Payment cancellation handled
- Errors shown to user
- Loading states work correctly

✅ **Multiple Products**:
- Cart works correctly
- All products ordered
- Total calculated correctly

---

## 📝 Test Log Template

Use this to track your tests:

```
Test Date: __________
Tester: __________

Test 1: Cash on Delivery
Status: [ ] Pass [ ] Fail
Notes: ___________________

Test 2: Online Payment (Success)
Status: [ ] Pass [ ] Fail
Payment ID: ___________________
Notes: ___________________

Test 3: Online Payment (Cancelled)
Status: [ ] Pass [ ] Fail
Notes: ___________________

Test 4: Multiple Products
Status: [ ] Pass [ ] Fail
Order ID: ___________________
Notes: ___________________

Issues Found:
1. ___________________
2. ___________________

Overall Status: [ ] All Tests Passed [ ] Some Failed
```

---

## 🚀 Ready for Production?

Before going live, ensure:

- [ ] All test scenarios pass
- [ ] No console errors
- [ ] MongoDB working correctly
- [ ] Backend stable
- [ ] Error handling works
- [ ] Mobile responsive tested
- [ ] Different browsers tested
- [ ] Live Razorpay keys obtained
- [ ] KYC completed with Razorpay
- [ ] Test with real card (small amount)

---

**Happy Testing!** 🧪✨

**Remember**: Use test cards only in test mode!
