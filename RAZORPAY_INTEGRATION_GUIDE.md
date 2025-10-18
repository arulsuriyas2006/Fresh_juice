# 💳 Razorpay Payment Integration Guide

## Overview

Razorpay payment gateway has been integrated for online payments. When users select "Online Payment" and click "Place Order", they will be redirected to Razorpay's secure payment interface.

## 🔑 Credentials

**Test Mode Credentials:**
- **Key ID**: `rzp_test_RN5RT3SpBDWrqZ`
- **Key Secret**: `74Sr4fUj73e0eYgJJxbEB0S6`

⚠️ **Important**: These are TEST credentials. For production, replace with live credentials from your Razorpay dashboard.

## ✨ Features Implemented

### 1. **Payment Gateway Integration**
- Razorpay Checkout integration
- Secure payment processing
- Real-time payment status

### 2. **Payment Flow**
- User fills order form
- Selects "Online Payment"
- Clicks "Place Order"
- Razorpay modal opens
- User completes payment
- Order saved to database

### 3. **Payment Methods Supported**
- Credit/Debit Cards
- Net Banking
- UPI
- Wallets (Paytm, PhonePe, etc.)
- EMI options

## 🔄 Payment Flow

### Step-by-Step Process

```
1. User adds products to cart
   ↓
2. Fills personal information
   ↓
3. Selects "Online Payment"
   ↓
4. Clicks "Place Order"
   ↓
5. Razorpay modal opens
   ↓
6. User enters payment details
   ↓
7. Payment processed
   ↓
8. Success → Order saved with status "paid"
   ↓
9. User redirected to success page
```

## 💻 Technical Implementation

### Files Created/Modified

1. **`src/lib/razorpay.js`** - Razorpay utility functions
2. **`src/pages/Order.jsx`** - Updated order submission logic

### Key Functions

#### `loadRazorpayScript()`
Dynamically loads Razorpay SDK script.

```javascript
const scriptLoaded = await loadRazorpayScript();
```

#### `initiateRazorpayPayment()`
Opens Razorpay payment modal with order details.

```javascript
initiateRazorpayPayment(
  razorpayData,
  onSuccess,
  onFailure
);
```

## 🎯 Payment Options

### Cash on Delivery
- Order placed immediately
- Payment status: `cod`
- No payment gateway involved

### Online Payment
- Razorpay modal opens
- Multiple payment methods
- Payment status: `paid` (after successful payment)

## 📊 Order Data Structure

```javascript
{
  orderId: "OJ-1234567890",
  name: "John Doe",
  phone: "9876543210",
  address: "123 Main St",
  productId: 1,
  productName: "Classic Orange Juice",
  quantity: 2,
  totalPrice: 178,
  paymentMode: "online",
  paymentStatus: "paid" // or "cod"
}
```

## 🧪 Testing

### Test Payment

1. **Go to Order page**
2. **Add products to cart**
3. **Fill form details**
4. **Select "Online Payment"**
5. **Click "Place Order"**
6. **Razorpay modal opens**

### Test Card Details

Razorpay provides test cards for testing:

**Success Card:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Other Test Cards:**
- **Mastercard**: `5555 5555 5555 4444`
- **Rupay**: `6073 8499 9000 0000`

**Test UPI:**
- UPI ID: `success@razorpay`

**Test Net Banking:**
- Select any bank
- Will show test success page

## 🔒 Security Features

### Built-in Security
- ✅ PCI DSS compliant
- ✅ SSL encrypted
- ✅ Secure payment gateway
- ✅ No card details stored on your server
- ✅ Razorpay handles all sensitive data

### Payment Verification
- Payment ID returned on success
- Order ID verification
- Signature verification (can be added)

## 💡 Razorpay Modal Features

### Pre-filled Information
- Customer name
- Phone number
- Email (if available)

### Customization
- Brand color: Orange (#f97316)
- Company name: FreshJuice
- Order description
- Amount display

### User Experience
- Clean, professional interface
- Mobile responsive
- Multiple payment options
- Easy to use

## 🎨 UI Flow

### Payment Selection
```
┌─────────────────────────────────┐
│  💳 Payment Mode                │
├─────────────────────────────────┤
│  ⚪ Cash on Delivery            │
│  ⚫ Online Payment               │
└─────────────────────────────────┘
       ↓ Click "Place Order"
┌─────────────────────────────────┐
│   Razorpay Payment Modal        │
│                                 │
│   Pay ₹297.00                   │
│   to FreshJuice                 │
│                                 │
│   [Card] [UPI] [NetBanking]    │
│                                 │
│   Enter card details...         │
│                                 │
│   [Pay Now]                     │
└─────────────────────────────────┘
```

## 📱 Success/Failure Handling

### On Success
```javascript
{
  razorpay_payment_id: "pay_xxxxxxxxxxxxx",
  razorpay_order_id: "order_xxxxxxxxxxxxx",
  razorpay_signature: "xxxxxxxxxxxxx"
}
```
- Order saved to database
- Payment status: "paid"
- User redirected to success page

### On Failure/Cancel
- Alert shown to user
- Order NOT saved
- User can retry payment

## 🚀 Going Live

### Steps to Use Live Credentials

1. **Login to Razorpay Dashboard**
   - Go to https://dashboard.razorpay.com

2. **Get Live Keys**
   - Navigate to Settings → API Keys
   - Generate Live Keys
   - Copy Key ID and Key Secret

3. **Update Code**
   - Open `src/lib/razorpay.js`
   - Replace test key with live key:
   ```javascript
   const RAZORPAY_KEY_ID = 'rzp_live_YOUR_LIVE_KEY';
   ```

4. **Test in Production**
   - Use real card for testing
   - Verify payments in dashboard
   - Check order creation

## 📊 Razorpay Dashboard

### What You Can See
- All transactions
- Payment status
- Refund management
- Settlement reports
- Customer details
- Analytics

### Access Dashboard
- URL: https://dashboard.razorpay.com
- Login with your Razorpay account
- View all test/live transactions

## 🔧 Customization Options

### Change Brand Color
```javascript
theme: {
  color: '#f97316' // Change to your brand color
}
```

### Add Logo
```javascript
image: '/your-logo.png'
```

### Change Description
```javascript
description: 'Your custom description'
```

## ⚠️ Important Notes

### Test Mode
- ✅ No real money charged
- ✅ Use test cards only
- ✅ Payments visible in test dashboard
- ✅ Perfect for development

### Live Mode
- ⚠️ Real money transactions
- ⚠️ Requires KYC verification
- ⚠️ Settlement to bank account
- ⚠️ Transaction fees apply

### Transaction Fees
- Razorpay charges ~2% per transaction
- Check current rates on Razorpay website
- Fees deducted from settlement

## 🐛 Troubleshooting

### Payment Modal Not Opening
- Check internet connection
- Verify Razorpay script loaded
- Check browser console for errors

### Payment Failing
- Verify test card details
- Check Razorpay dashboard for errors
- Ensure amount is correct

### Order Not Saving After Payment
- Check database connection
- Verify API endpoint working
- Check browser console for errors

## 📞 Support

### Razorpay Support
- Email: support@razorpay.com
- Phone: +91-80-6891-8031
- Docs: https://razorpay.com/docs

### Integration Docs
- Checkout: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-details/

## ✅ Testing Checklist

- [ ] Razorpay script loads correctly
- [ ] Payment modal opens on "Online Payment"
- [ ] Test card payment succeeds
- [ ] Order saved with "paid" status
- [ ] Success page displays
- [ ] Payment cancellation handled
- [ ] Cash on Delivery still works
- [ ] Mobile responsive
- [ ] Error handling works

## 🎯 Benefits

### For Customers
- Multiple payment options
- Secure payment gateway
- Instant payment confirmation
- Trusted payment interface

### For Business
- Automated payment collection
- Real-time payment tracking
- Reduced cash handling
- Professional payment system
- Easy reconciliation

---

**Razorpay integration complete!** 💳✨

**Test it now:**
1. Go to Order page
2. Add products to cart
3. Select "Online Payment"
4. Click "Place Order"
5. Use test card: `4111 1111 1111 1111`
6. Complete payment!
