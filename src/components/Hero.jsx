import React from 'react';
import { ArrowRight, Utensils } from 'lucide-react';

export default function Hero({ onOrderClick, onViewMenuClick }) {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[85vh] flex items-center bg-surface pt-24 pb-16">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column Text & CTAs */}
        <div className="z-10 space-y-8 py-8 lg:py-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label text-label-md tracking-wider font-semibold">
            <Utensils className="w-3.5 h-3.5" />
            PREMIUM CLOUD KITCHEN
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-display-lg text-on-surface leading-tight">
            Authentic Flavors,<br />
            <span className="text-primary italic font-normal">Delivered to Your Door</span>
          </h1>

          <p className="font-body text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            Experience the warmth of a home-cooked meal crafted by culinary experts. We bring the traditional taste of the hearth directly to your dining table.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={onOrderClick}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label text-label-lg font-semibold hover:bg-primary-container transition-all duration-300 soft-shadow flex items-center justify-center gap-2 group"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onViewMenuClick}
              className="border border-secondary text-secondary px-8 py-4 rounded-lg font-label text-label-lg font-semibold hover:bg-secondary-container/50 transition-all duration-300 text-center"
            >
              View Full Menu
            </button>
          </div>
        </div>

        {/* Right Column Editorial Image Container */}
        <div className="relative h-full w-full flex items-center justify-center min-h-[380px]">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Background Decorative Blob */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-110"></div>
            
            {/* Editorial Dish Visual */}
            <img 
              className="relative w-full h-full object-cover rounded-2xl soft-shadow transform -rotate-3 hover:rotate-0 transition-transform duration-700 ease-out border-4 border-surface" 
              alt="Signature traditional Indian meal in terracotta tableware" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDausiJI0AaA81hD5i6mYdfs7NQac1_bw_XTQ6K-mZFa8exEHIKrr5RSUMj9_EcAKn8SwgnTsiQk0_tiuLaNpYC4C_Pdbvr-GZYXAi7uOjXDvc8zoZaQTJBOVqIddxHF-JrG2Yg7U8qf5asL9AE51K98klEKhwwGuLIiYQrl9VtXP3OCs0gVpY5e1x-RTTRuL-oRWLZbXM_Xq6-O3cYdUvaroh4J06G_bVGL4FKtzjk5GK8nZDvByMX7QfxU4Ox0cKUx9JnQ5HMXc0" 
            />

            {/* Floating Quality Stamp Badge */}
            <div className="absolute -bottom-4 -left-4 sm:left-4 bg-surface p-4 rounded-xl soft-shadow border border-outline-variant/40 flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-lg">
                ★
              </div>
              <div>
                <div className="font-label text-label-md font-bold text-on-surface">100% Authentic</div>
                <div className="font-body text-xs text-on-surface-variant">Handcrafted Spices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
