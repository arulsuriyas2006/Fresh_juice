import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'FreshJuice API Server',
    status: 'Running',
    version: '1.0.0'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FreshJuice API is running' });
});

// Import routes only if they exist
try {
  const productsRoutes = await import('./routes/products.js');
  app.use('/api/products', productsRoutes.default);
  console.log('✅ Products routes loaded');
} catch (err) {
  console.log('⚠️ Products routes not loaded:', err.message);
}

try {
  const authRoutes = await import('./routes/auth.js');
  app.use('/api/auth', authRoutes.default);
  console.log('✅ Auth routes loaded');
} catch (err) {
  console.log('⚠️ Auth routes not loaded:', err.message);
}

try {
  const orderRoutes = await import('./routes/orders.js');
  app.use('/api/orders', orderRoutes.default);
  console.log('✅ Order routes loaded');
} catch (err) {
  console.log('⚠️ Order routes not loaded:', err.message);
}

try {
  const loyaltyRoutes = await import('./routes/loyalty.js');
  app.use('/api/loyalty', loyaltyRoutes.default);
  console.log('✅ Loyalty routes loaded');
} catch (err) {
  console.log('⚠️ Loyalty routes not loaded:', err.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
