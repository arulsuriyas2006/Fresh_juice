import express from 'express';

const router = express.Router();

// Sample products data (same as frontend)
const products = [
  {
    id: 1,
    name: 'Classic Orange Juice',
    description: 'Pure, fresh-squeezed orange with no additives, just pure goodness.',
    price: 89,
    category: 'classic',
    image: '/images/orange-juice.jpg',
    stock: 100,
    features: ['100% Natural', 'No Sugar Added', 'Fresh Squeezed'],
    isPopular: true
  },
  {
    id: 2,
    name: 'Pulp Delight',
    description: 'Extra pulpy orange juice for those who love the real fruit texture.',
    price: 99,
    category: 'premium',
    image: '/images/pulp-delight.jpg',
    stock: 75,
    features: ['Extra Pulp', 'Rich Texture', 'Vitamin C Boost'],
    isPopular: true
  },
  {
    id: 3,
    name: 'Vitamin Boost',
    description: 'Fortified with extra vitamins and minerals for your daily health needs.',
    price: 119,
    category: 'premium',
    image: '/images/vitamin-boost.jpg',
    stock: 50,
    features: ['Vitamin Fortified', 'Immunity Boost', 'Energy Plus'],
    isPopular: true
  },
  {
    id: 4,
    name: 'Tropical Fusion',
    description: 'A delightful blend of orange, mango, and passion fruit.',
    price: 129,
    category: 'fusion',
    image: '/images/tropical-fusion.jpg',
    stock: 60,
    features: ['Exotic Blend', 'Refreshing', 'Natural Sweetness'],
    isPopular: false
  },
  {
    id: 5,
    name: 'Green Detox',
    description: 'Orange juice mixed with spinach and cucumber for a healthy cleanse.',
    price: 139,
    category: 'healthy',
    image: '/images/green-detox.jpg',
    stock: 40,
    features: ['Detoxifying', 'Low Calorie', 'Nutrient Rich'],
    isPopular: false
  }
];

// GET all products
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// GET single product by ID
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

export default router;
