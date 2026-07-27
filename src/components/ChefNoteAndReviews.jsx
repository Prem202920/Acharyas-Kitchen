import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export default function ChefNoteAndReviews() {
  return (
    <section id="chef-note" className="py-section-gap bg-surface-container scroll-mt-20">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Chef's Note Quote Container */}
        <div className="chef-note bg-surface p-8 lg:p-12 rounded-r-xl soft-shadow border border-outline-variant/30 space-y-6">
          <Quote className="w-12 h-12 text-primary opacity-80" />
          
          <h2 className="font-display text-2xl lg:text-headline-lg text-on-surface italic leading-relaxed">
            "Cooking is a language of love. In Acharya's Kitchen, every dish tells a story of tradition, patience, and the perfect blend of slow-roasted spices."
          </h2>

          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shrink-0 soft-shadow">
              <img 
                className="w-full h-full object-cover" 
                alt="Chef Rajesh Acharya" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuoB1N0ZPG16zAwJJg251A8fonNuyOmW4w7JYSYBO7zmDwFmP8-ILENXH2JaB5hNuIp8GiHZCUSEaY0B3AsLPn6nP2_TLIlggHOmd-NZb6OcHlMv4SaWkVJFimqvACmBJvBobk2Q4t56o2_BOkX7-ileIYBBAfr9wAe_gKyDO8IE2ZcIaHSy6Xl1oy98b0DJPYtuLBYpd9BpHWfba_a0ZdrDlVhvdJdXuHH7CLJKB4m3T8OOvvGEn7f_4Ql9rxRGmcHGOHJBn9NvQ" 
              />
            </div>
            <div>
              <h3 className="font-headline text-headline-md font-semibold text-primary">
                Chef Rajesh Acharya
              </h3>
              <p className="font-label text-label-md text-on-surface-variant uppercase tracking-widest font-semibold">
                Founder & Executive Chef
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Reviews */}
        <div id="reviews" className="space-y-8 scroll-mt-20">
          <div>
            <span className="font-label text-xs font-semibold uppercase tracking-widest text-primary">
              TESTIMONIALS
            </span>
            <h2 className="font-headline text-3xl md:text-headline-lg font-semibold text-on-surface mt-1">
              What Our Diners Say
            </h2>
          </div>

          <div className="space-y-6">
            {TESTIMONIALS.map(t => (
              <div 
                key={t.id} 
                className="bg-surface p-6 lg:p-8 rounded-xl soft-shadow border border-outline-variant/30 space-y-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-primary">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-secondary font-label font-medium bg-secondary-container/40 px-2.5 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Verified Order
                  </span>
                </div>

                <p className="font-body text-body-md text-on-surface leading-relaxed italic">
                  "{t.content}"
                </p>

                <div className="font-label text-label-lg font-bold text-on-surface">
                  — {t.name} <span className="text-on-surface-variant font-normal text-xs">({t.role})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
