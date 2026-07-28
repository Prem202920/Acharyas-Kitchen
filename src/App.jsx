import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import TrendingDishes from './components/TrendingDishes';
import FullMenu from './components/FullMenu';
import ChefNoteAndReviews from './components/ChefNoteAndReviews';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { MENU_ITEMS, formatPrice } from './data/menuData';
import { auth, onAuthStateChanged, signOut } from './firebase';
import { X, Plus, Star, Clock, Utensils } from 'lucide-react';

export default function App() {
  // Persistent Auth State from Firebase
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Cart & Modal State - Initial state is clean empty array by default
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Subscribe to Firebase Auth State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'Gourmet Diner')
        });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign out warning:", err);
    } finally {
      setUser(null);
    }
  };

  const handleAddToCart = (dish) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === dish.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(dishId);
    } else {
      setCart((prevCart) =>
        prevCart.map((i) => (i.id === dishId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleRemoveItem = (dishId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== dishId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading Screen while Firebase initializes persistent auth session
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4 font-body">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center soft-shadow animate-bounce">
          <Utensils className="w-8 h-8 text-primary" />
        </div>
        <p className="font-headline text-lg font-semibold text-primary">
          Connecting to Acharya's Kitchen Auth...
        </p>
      </div>
    );
  }

  // 1. Strict Auth Check: If user is NOT logged in, render the AuthScreen
  if (!user) {
    return <AuthScreen />;
  }

  // 2. Main Application Dashboard once user is verified & logged in
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body animate-fadeIn">
      {/* Header Bar with User Account & Firebase Logout */}
      <Header
        user={user}
        onLogout={handleLogout}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOrderClick={() => scrollToSection('menu')}
          onViewMenuClick={() => scrollToSection('menu')}
        />
        <HowItWorks />
        <TrendingDishes
          items={MENU_ITEMS}
          onAddToCart={handleAddToCart}
          onViewAllClick={() => scrollToSection('menu')}
        />
        <FullMenu
          items={MENU_ITEMS}
          onAddToCart={handleAddToCart}
          onItemClick={(dish) => setSelectedDish(dish)}
        />
        <ChefNoteAndReviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={() => setCart([])}
      />

      {/* Dish Detail Preview Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-lg w-full overflow-hidden soft-shadow border border-outline-variant/30 animate-fadeIn">
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 bg-surface/80 text-on-surface p-2 rounded-full hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-headline text-2xl font-semibold text-on-surface">
                  {selectedDish.name}
                </h3>
                <span className="font-body text-xl font-bold text-primary">
                  {formatPrice(selectedDish.price)}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-body text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <strong className="text-on-surface">{selectedDish.rating}</strong> ({selectedDish.reviewsCount} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  {selectedDish.prepTime}
                </span>
              </div>

              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {selectedDish.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedDish.dietary.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-label font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  handleAddToCart(selectedDish);
                  setSelectedDish(null);
                }}
                className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-label text-label-lg font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 soft-shadow pt-3"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Order — {formatPrice(selectedDish.price)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
