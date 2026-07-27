import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const discountAmount = subtotal * discount;
  const total = Math.max(0, subtotal + tax + deliveryFee - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HEARTH10') {
      setDiscount(0.10);
      setPromoError('');
    } else if (promoCode.trim() !== '') {
      setPromoError('Invalid code. Try "HEARTH10" for 10% off!');
      setDiscount(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-outline-variant/30 flex flex-col justify-between shadow-2xl animate-slideLeft">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="font-headline text-xl font-semibold text-on-surface">Your Order</h2>
              <span className="bg-primary/10 text-primary text-xs font-label font-bold px-2 py-0.5 rounded-full ml-1">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-outline-variant/20">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-lg object-cover border border-outline-variant/30 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline text-base font-semibold text-on-surface truncate">
                      {item.name}
                    </h3>
                    <div className="font-body text-sm font-bold text-primary mt-0.5">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-outline-variant/40 rounded-lg bg-surface-container-low">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-on-surface-variant hover:text-primary"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-label text-xs font-semibold text-on-surface">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-on-surface-variant hover:text-primary"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto text-on-surface-variant opacity-60">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-headline text-lg font-semibold text-on-surface">Your cart is empty</p>
                <p className="font-body text-sm text-on-surface-variant max-w-xs mx-auto">
                  Add some delicious authentic dishes from our menu to begin your culinary journey.
                </p>
              </div>
            )}
          </div>

          {/* Footer & Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. HEARTH10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-surface border border-outline-variant/40 rounded-lg text-on-surface focus:outline-none focus:border-primary"
                  />
                  <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-on-surface-variant" />
                </div>
                <button
                  type="submit"
                  className="bg-secondary text-white px-3 py-2 rounded-lg text-xs font-label font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-error font-body">{promoError}</p>}
              {discount > 0 && <p className="text-[11px] text-secondary font-body font-medium">✓ 10% Hearth Discount applied!</p>}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 font-body text-xs text-on-surface-variant border-t border-outline-variant/20 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-on-surface">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco-Packaging & Delivery</span>
                  <span className="font-medium text-on-surface">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-headline text-lg font-bold text-on-surface pt-2 border-t border-outline-variant/30">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onCheckout}
                className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-label text-label-lg font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 soft-shadow"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
