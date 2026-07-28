import React from 'react';
import { Plus, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '../data/menuData';

export default function TrendingDishes({ items, onAddToCart, onViewAllClick }) {
  const mainFeature = items.find(item => item.id === 'item-1') || items[0];
  const sideFeatures = items.filter(item => item.id === 'item-2' || item.id === 'item-3');

  return (
    <section className="py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="font-headline text-3xl md:text-headline-lg text-on-surface font-semibold mb-2">
              Trending Dishes
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              The most loved flavors crafted by Chef Acharya this week.
            </p>
          </div>
          <button 
            onClick={onViewAllClick}
            className="text-primary font-label text-label-lg font-semibold underline decoration-1 underline-offset-4 hover:opacity-80 transition-opacity flex items-center gap-1 group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Asymmetric Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Large Bestseller Feature (Left 7 cols) */}
          {mainFeature && (
            <div className="lg:col-span-7 bg-surface-container-low rounded-xl overflow-hidden group soft-shadow border border-outline-variant/30 flex flex-col h-full hover:shadow-soft-hover transition-all duration-300">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={mainFeature.name} 
                  src={mainFeature.image} 
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-sm font-label text-xs font-semibold uppercase tracking-wider shadow">
                  Bestseller
                </div>
                <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full font-body text-xs font-semibold text-on-surface flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{mainFeature.rating} ({mainFeature.reviewsCount})</span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-headline text-2xl md:text-headline-md font-semibold text-on-surface">
                      {mainFeature.name}
                    </h3>
                    <span className="font-body text-xl font-bold text-primary shrink-0">
                      {formatPrice(mainFeature.price)}
                    </span>
                  </div>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-4">
                    {mainFeature.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {mainFeature.dietary.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-label font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => onAddToCart(mainFeature)}
                  className="w-full bg-primary text-on-primary py-3.5 px-6 rounded-lg font-label text-label-lg font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 soft-shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          )}

          {/* Right Column (5 cols) - 2 Secondary Items */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {sideFeatures.map((item) => (
              <div 
                key={item.id} 
                className="bg-surface-container-low rounded-xl overflow-hidden group soft-shadow border border-outline-variant/30 flex flex-col sm:flex-row h-full hover:shadow-soft-hover transition-all duration-300"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative shrink-0">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={item.name} 
                    src={item.image} 
                  />
                  {item.isBestseller && (
                    <div className="absolute top-3 left-3 bg-secondary text-white text-[10px] px-2 py-0.5 rounded font-label uppercase font-semibold">
                      Must Try
                    </div>
                  )}
                </div>

                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h4 className="font-headline text-lg font-semibold text-on-surface">
                        {item.name}
                      </h4>
                      <span className="font-body text-base font-bold text-primary">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.dietary.map((tag, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 bg-surface text-on-surface-variant rounded border border-outline-variant/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => onAddToCart(item)}
                    className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-lg font-label text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
