import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Zap, CreditCard, Wallet, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUSDC: number;
  images: string[];
  category: 'apparel' | 'supplements' | 'equipment' | 'digital' | 'premium';
  creator: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  badges: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  inStock: boolean;
  featured: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'usdc'>('card');
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'apparel', name: 'Apparel', icon: '👕' },
    { id: 'supplements', name: 'Supplements', icon: '💊' },
    { id: 'equipment', name: 'Equipment', icon: '🏋️' },
    { id: 'digital', name: 'Digital', icon: '📱' },
    { id: 'premium', name: 'Premium', icon: '⭐' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    // Mock data - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Glow Queen Protein',
        description: 'Premium whey protein for the influencer lifestyle',
        price: 49.99,
        priceUSDC: 50.0,
        images: ['/products/glow-protein.jpg'],
        category: 'supplements',
        creator: {
          id: 'sara',
          name: 'FitQueen Sara',
          avatar: '/avatars/sara.jpg',
          verified: true
        },
        badges: ['Creator Unlocked'],
        rating: 4.8,
        reviewCount: 127,
        tags: ['protein', 'glow', 'influencer'],
        inStock: true,
        featured: true
      },
      {
        id: '2',
        name: 'Bro Mode Tank',
        description: 'Ultimate gym tank for the grind',
        price: 29.99,
        priceUSDC: 30.0,
        images: ['/products/bro-tank.jpg'],
        category: 'apparel',
        creator: {
          id: 'mike',
          name: 'GrindBro Mike',
          avatar: '/avatars/mike.jpg',
          verified: true
        },
        badges: ['Badge Beast'],
        rating: 4.9,
        reviewCount: 89,
        tags: ['tank', 'gym', 'bro'],
        inStock: true,
        featured: false
      },
      {
        id: '3',
        name: 'SwarmStarter Pro',
        description: 'Premium access to AI app builder',
        price: 19.99,
        priceUSDC: 20.0,
        images: ['/products/swarmstarter.jpg'],
        category: 'premium',
        creator: {
          id: 'tristan',
          name: 'Tristan AI',
          avatar: '/avatars/tristan.jpg',
          verified: true
        },
        badges: ['Launch Muse'],
        rating: 4.7,
        reviewCount: 234,
        tags: ['ai', 'builder', 'premium'],
        inStock: true,
        featured: true
      },
      {
        id: '4',
        name: 'Crypto Fitness Tracker',
        description: 'Earn USDC while you track your workouts',
        price: 149.99,
        priceUSDC: 150.0,
        images: ['/products/crypto-tracker.jpg'],
        category: 'equipment',
        creator: {
          id: 'tech',
          name: 'TechFit Labs',
          avatar: '/avatars/techfit.jpg',
          verified: true
        },
        badges: ['Crypto Queen'],
        rating: 4.6,
        reviewCount: 45,
        tags: ['crypto', 'tracker', 'tech'],
        inStock: true,
        featured: true
      }
    ];

    setProducts(mockProducts);
    setLoading(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = paymentMethod === 'usdc' ? item.product.priceUSDC : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const checkout = async () => {
    // Mock checkout process - replace with actual implementation
    alert(`Checkout with ${paymentMethod.toUpperCase()} for $${getTotalPrice().toFixed(2)}`);
    setCart([]);
    setShowCart(false);
  };

  const renderProduct = (product: Product) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      {product.featured && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          Featured
        </div>
      )}
      
      <div className="relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <img 
            src={product.creator.avatar} 
            alt={product.creator.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{product.creator.name}</span>
          {product.creator.verified && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        
        {product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.badges.map(badge => (
              <span 
                key={badge}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
              >
                🏆 {badge}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="font-bold text-lg text-gray-900">
              ${paymentMethod === 'usdc' ? product.priceUSDC.toFixed(2) : product.price.toFixed(2)}
            </div>
            {paymentMethod === 'usdc' && (
              <div className="text-sm text-green-600 font-medium">USDC</div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              product.inStock
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderCart = () => (
    <AnimatePresence>
      {showCart && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold">Shopping Cart</h2>
            <button 
              onClick={() => setShowCart(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-xs text-gray-600">
                        ${(paymentMethod === 'usdc' ? item.product.priceUSDC : item.product.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)} {paymentMethod === 'usdc' ? 'USDC' : ''}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={checkout}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Checkout with {paymentMethod.toUpperCase()}
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Hive Store 🛍️
            </h1>
            
            <div className="flex items-center space-x-4">
              {/* Payment Method Toggle */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-medium">Card</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setPaymentMethod('usdc')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    paymentMethod === 'usdc'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-medium">USDC</span>
                </motion.button>
              </div>
              
              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCart(true)}
                className="relative p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </div>
                )}
              </motion.button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          {/* Categories */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(renderProduct)}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No products available in this category.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {renderCart()}
    </div>
  );
};

export default Store;