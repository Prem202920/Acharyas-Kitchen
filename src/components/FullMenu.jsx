import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES } from '../data/menuData';
import { Search, Plus, Star, Clock, Sparkles } from 'lucide-react';

export default function FullMenu({ items, onAddToCart, onItemClick }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-section-gap bg-surface-container-low/50 scroll-mt-20">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Header & Controls */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-label font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            FRESHLY PREPARED DAILY
          </div>
          <h2 className="font-headline text-3xl md:text-headline-lg text-on-surface font-semibold">
            Our Culinary Menu
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Explore authentic recipes passed down through generations, crafted with slow cooking techniques and organic spices.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-label text-label-md transition-all shrink-0 font-medium ${
                  activeCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-on-surface-variant" />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="bg-surface rounded-xl overflow-hidden soft-shadow border border-outline-variant/30 flex flex-col justify-between group hover:shadow-soft-hover transition-all duration-300"
              >
                <div>
                  <div 
                    onClick={() => onItemClick && onItemClick(item)}
                    className="relative h-52 overflow-hidden cursor-pointer"
                  >
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={item.name}
                      src={item.image}
                    />
                    {item.isBestseller && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-label font-semibold px-3 py-1 rounded-sm shadow">
                        Bestseller
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.prepTime}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 
                        onClick={() => onItemClick && onItemClick(item)}
                        className="font-headline text-headline-md text-on-surface font-semibold cursor-pointer hover:text-primary transition-colors"
                      >
                        {item.name}
                      </h3>
                      <span className="font-body text-lg font-bold text-primary shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="font-body text-body-md text-on-surface-variant line-clamp-2 leading-relaxed text-sm">
                      {item.description}
                    </p>

                    {/* Dietary Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.dietary.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-0.5 bg-secondary-container/60 text-on-secondary-container rounded-full text-[11px] font-label font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="w-full bg-surface-container hover:bg-primary hover:text-white text-primary border border-primary/20 py-2.5 px-4 rounded-lg font-label text-label-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-xl border border-outline-variant/30 space-y-3">
            <p className="font-headline text-xl text-on-surface font-semibold">No dishes found matching "{searchQuery}"</p>
            <p className="font-body text-sm text-on-surface-variant">Try adjusting your search terms or selecting a different category.</p>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-2 text-primary font-label font-semibold text-sm underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
