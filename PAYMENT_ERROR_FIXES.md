# 🔧 Payment Integration - Error Fixes & Troubleshooting

## Common Errors & Solutions

### ❌ Error 1: "Razorpay is not defined"

**Symptoms:**
- Console error: `ReferenceError: Razorpay is not defined`
- Payment modal doesn't open
- Error when clicking "Place Order"

**Cause:**
Razorpay script not loaded properly

**Solution:**
The script is loaded dynamically in the code. If this error occurs:

1. **Check Internet Connection**
   - Razorpay SDK loads from CDN
   - Requires active internet

2. **Check Browser Console**
   - Open DevTools (F12)
   - Look for script loading errors

3. **Verify Script Loading**
   - The script should load from: `https://checkout.razorpay.com/v1/checkout.js`

**Fix:** Already handled in `src/lib/razorpay.js` with error checking:
```javascript
const scriptLoaded = await loadRazorpayScript();
if (!scriptLoaded) {
  alert('Failed to load Razorpay SDK. Please check your internet connection.');
  return;
}
```

---

### ❌ Error 2: "Cannot read property 'Razorpay' of undefined"

**Symptoms:**
- Error when opening payment modal
- `window.Razorpay` is undefined

**Cause:**
Script loaded but not accessible on window object

**Solution:**

Add a small delay before opening Razorpay:

**Update `src/lib/razorpay.js`:**
```javascript
export const initiateRazorpayPayment = async (orderData, onSuccess, onFailure) => {
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    alert('Failed to load Razorpay SDK. Please check your internet connection.');
    return;
  }

  // Add small delay to ensure script is fully loaded
  await new Promise(resolve => setTimeout(resolve, 100));

  if (!window.Razorpay) {
    alert('Razorpay SDK failed to initialize. Please refresh and try again.');
    return;
  }

  const options = {
    // ... rest of the code
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

---

### ❌ Error 3: "Payment amount is invalid"

**Symptoms:**
- Razorpay shows error about amount
- Payment fails immediately

**Cause:**
Amount must be in paise (₹1 = 100 paise) and must be an integer

**Solution:**

Ensure amount is properly converted:

**Check in `src/lib/razorpay.js`:**
```javascript
amount: Math.round(orderData.amount * 100), // Convert to paise and round
```

**Verify in Order.jsx:**
```javascript
const razorpayData = {
  amount: totalPrice, // Should be a number, not string
  // ...
};
```

---

### ❌ Error 4: "Key ID is invalid"

**Symptoms:**
- Error: "Invalid key_id"
- Payment modal doesn't open

**Cause:**
Wrong or missing Razorpay Key ID

**Solution:**

**Verify in `src/lib/razorpay.js`:**
```javascript
const RAZORPAY_KEY_ID = 'rzp_test_RN5RT3SpBDWrqZ'; // Must be exact
```

**Double-check:**
- No extra spaces
- Correct prefix (`rzp_test_` for test mode)
- Key copied correctly

---

### ❌ Error 5: "CORS Error" or Network Error

**Symptoms:**
- CORS policy error in console
- Network request failed
- Can't load Razorpay script

**Cause:**
Browser blocking external scripts or network issue

**Solution:**

1. **Check Browser Extensions**
   - Disable ad blockers
   - Disable privacy extensions
   - Try in incognito mode

2. **Check Internet Connection**
   - Ensure stable connection
   - Try refreshing page

3. **Check Firewall/Antivirus**
   - May be blocking Razorpay domain
   - Whitelist `checkout.razorpay.com`

---

### ❌ Error 6: Payment Modal Opens but Closes Immediately

**Symptoms:**
- Modal flashes and closes
- No error message shown

**Cause:**
Missing required fields in Razorpay options

**Solution:**

**Ensure all required fields in `src/lib/razorpay.js`:**
```javascript
const options = {
  key: RAZORPAY_KEY_ID, // Required
  amount: orderData.amount * 100, // Required, in paise
  currency: 'INR', // Required
  name: 'FreshJuice', // Required
  description: orderData.description || 'Order Payment', // Required
  handler: function (response) { // Required
    onSuccess(response);
  }
};
```

---

### ❌ Error 7: "Order not saved after successful payment"

**Symptoms:**
- Payment succeeds in Razorpay
- Order doesn't appear in database
- Success page doesn't show

**Cause:**
Database connection issue or API error

**Solution:**

1. **Check MongoDB Connection**
   ```bash
   # Ensure MongoDB is running
   mongosh
   ```

2. **Check Backend Server**
   ```bash
   # Should show: Server running on http://localhost:5000
   # Should show: MongoDB connected successfully
   ```

3. **Check Browser Console**
   - Look for API errors
   - Check network tab for failed requests

4. **Verify API Endpoint**
   - Ensure `/api/orders` is working
   - Test with Postman or similar tool

---

### ❌ Error 8: "Payment successful but user sees error"

**Symptoms:**
- Payment deducted (in test mode, shows success)
- User sees error message
- Order may or may not be saved

**Cause:**
Error in success callback handler

**Solution:**

**Add better error handling in `src/pages/Order.jsx`:**
```javascript
async (paymentResponse) => {
  // Payment successful
  try {
    await createOrderInDatabase(newOrderId, 'paid');
    setOrderId(newOrderId);
    setOrderSuccess(true);
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      paymentMode: 'cash'
    });
    setCart([]);
    setLoading(false);
  } catch (error) {
    console.error('Order creation error:', error);
    alert('Payment successful but failed to save order. Please contact support with Payment ID: ' + paymentResponse.razorpay_payment_id);
    setLoading(false);
  }
}
```

---

### ❌ Error 9: Test Card Not Working

**Symptoms:**
- Test card `4111 1111 1111 1111` fails
- Shows "Payment failed" error

**Cause:**
Incorrect card details or Razorpay test mode issue

**Solution:**

**Use exact test card details:**
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits (e.g., 123)
Expiry: Any future date (e.g., 12/25)
Name: Any name
```

**Alternative test cards:**
- Mastercard: `5555 5555 5555 4444`
- Rupay: `6073 8499 9000 0000`

**For UPI testing:**
- UPI ID: `success@razorpay`

---

### ❌ Error 10: "Loading..." button stuck

**Symptoms:**
- "Placing Order..." button stays loading
- Nothing happens
- Can't click again

**Cause:**
Loading state not reset on error

**Solution:**

**Ensure loading is reset in all cases:**
```javascript
try {
  // ... payment logic
} catch (error) {
  console.error('Order error:', error);
  alert('Failed to place order: ' + (error.message || 'Please try again.'));
  setLoading(false); // Important!
}
```

---

## 🔍 Debugging Steps

### Step 1: Check Browser Console
```
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Copy exact error message
```

### Step 2: Check Network Tab
```
1. Open DevTools (F12)
2. Go to Network tab
3. Try payment again
4. Look for failed requests (red)
5. Click on failed request
6. Check Response tab for error details
```

### Step 3: Check MongoDB
```bash
# Open MongoDB Compass or mongosh
mongosh

# Check if database exists
show dbs

# Check if orders collection exists
use freshjuice
show collections

# Check if orders are being saved
db.orders.find().pretty()
```

### Step 4: Check Backend Logs
```
Look at terminal where backend is running
Check for error messages
Ensure MongoDB connected successfully
```

---

## 🛠️ Complete Fix Checklist

### Before Testing Payment:
- [ ] MongoDB is running
- [ ] Backend server is running (port 5000)
- [ ] Frontend is running (port 5173)
- [ ] Internet connection is active
- [ ] Browser console is clear of errors

### During Payment:
- [ ] Razorpay modal opens
- [ ] Can enter card details
- [ ] No console errors
- [ ] Payment processes

### After Payment:
- [ ] Success callback fires
- [ ] Order saved to database
- [ ] Success page shows
- [ ] Order ID displayed

---

## 📝 Quick Fixes

### Fix 1: Refresh Everything
```bash
# Stop servers (Ctrl+C)
# Clear browser cache
# Restart MongoDB
net start MongoDB

# Restart application
npm run dev
```

### Fix 2: Clear Browser Data
```
1. Open browser settings
2. Clear cache and cookies
3. Close all tabs
4. Restart browser
5. Try again
```

### Fix 3: Check Environment
```bash
# Ensure .env file exists
# Check MongoDB URI is correct
MONGODB_URI=mongodb://localhost:27017/freshjuice
PORT=5000
```

---

## 🚨 Emergency Fixes

### If Nothing Works:

1. **Reinstall Dependencies**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Check Razorpay Status**
   - Visit: https://status.razorpay.com
   - Check if service is down

3. **Try Different Browser**
   - Chrome
   - Firefox
   - Edge

4. **Disable All Extensions**
   - Open incognito/private mode
   - Test payment there

---

## 📞 Getting Help

### Error Information to Collect:

1. **Exact error message** from console
2. **Browser** and version
3. **Steps** to reproduce
4. **Network tab** screenshot
5. **Console tab** screenshot

### Where to Get Help:

- **Razorpay Docs**: https://razorpay.com/docs
- **Razorpay Support**: support@razorpay.com
- **Test Cards**: https://razorpay.com/docs/payments/payments/test-card-details/

---

## ✅ Verification Script

Run this in browser console to check setup:

```javascript
// Check if Razorpay script loaded
console.log('Razorpay available:', typeof window.Razorpay !== 'undefined');

// Check if key is set
console.log('Key configured:', 'rzp_test_RN5RT3SpBDWrqZ');

// Check if backend is running
fetch('http://localhost:5000/api/orders')
  .then(res => console.log('Backend status:', res.status))
  .catch(err => console.log('Backend error:', err));
```

---

**Most common issue**: Internet connection or MongoDB not running!

**Quick fix**: Restart MongoDB and ensure internet is working!
