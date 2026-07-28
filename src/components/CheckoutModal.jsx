import React, { useState } from 'react';
import { X, CheckCircle2, Clock, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../data/menuData';

export default function CheckoutModal({ isOpen, onClose, cart, onClearCart }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Prem Acharya',
    phone: '+91 98765 43210',
    address: '42 Heritage Lane, Indiranagar, Bengaluru',
    instructions: 'Ring doorbell twice. Leave at security desk if unavailable.',
    paymentMethod: 'card'
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% GST
  const deliveryFee = subtotal > 0 ? 40 : 0; // ₹40 delivery & packaging fee
  const total = subtotal + tax + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onClearCart) onClearCart();
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl max-w-lg w-full overflow-hidden soft-shadow border border-outline-variant/30 animate-fadeIn">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="font-headline text-xl font-semibold text-on-surface">
              {isSubmitted ? 'Order Confirmed!' : 'Express Checkout'}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 text-on-surface-variant hover:text-primary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-secondary/15 rounded-full flex items-center justify-center mx-auto text-secondary animate-scaleUp">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="font-headline text-2xl font-semibold text-on-surface">
                Thank You for Your Order!
              </h3>
              <p className="font-body text-sm text-on-surface-variant max-w-xs mx-auto">
                Chef Acharya has received your order. We are preparing your hearth-crafted meal.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl text-left space-y-3 border border-outline-variant/30 text-xs font-body">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                <span className="font-semibold text-on-surface">Order Number:</span>
                <span className="font-mono text-primary font-bold">#AK-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Estimated Delivery: <strong>25 - 35 mins</strong></span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate">Deliver to: <strong>{formData.address}</strong></span>
              </div>
              <div className="flex justify-between pt-2 border-t border-outline-variant/20 font-bold text-sm text-on-surface">
                <span>Amount Paid:</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-label text-label-lg font-semibold hover:bg-primary-container transition-all"
            >
              Done & Return to Kitchen
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-3">
              <label className="block text-xs font-label font-semibold text-on-surface uppercase tracking-wider">
                Delivery Details
              </label>
              
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
              />

              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
              />

              <input
                type="text"
                required
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
              />

              <input
                type="text"
                placeholder="Delivery instructions (optional)"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-surface border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-label font-semibold text-on-surface uppercase tracking-wider">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3 font-body text-xs">
                <label className={`p-3 border rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  formData.paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary font-semibold' : 'border-outline-variant/30 text-on-surface-variant'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="accent-primary"
                  />
                  <CreditCard className="w-4 h-4" />
                  <span>Credit / UPI Card</span>
                </label>

                <label className={`p-3 border rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5 text-primary font-semibold' : 'border-outline-variant/30 text-on-surface-variant'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="accent-primary"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
              <div>
                <span className="font-body text-xs text-on-surface-variant">Total Amount Due</span>
                <div className="font-headline text-xl font-bold text-primary">{formatPrice(total)}</div>
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label text-label-lg font-semibold hover:bg-primary-container transition-all soft-shadow"
              >
                Place Order Now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
