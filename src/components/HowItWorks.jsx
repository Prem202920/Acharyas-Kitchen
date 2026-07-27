import React from 'react';
import { BookOpen, Flame, Truck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Browse Our Menu",
      description: "Explore our curated selection of seasonal dishes, each prepared with hand-picked organic ingredients.",
    },
    {
      icon: <Flame className="w-8 h-8 text-primary" />,
      title: "Expertly Crafted",
      description: "Our master chefs prepare your meal with precision and slow-cooked care, preserving heritage flavors.",
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Safe & Fresh Delivery",
      description: "Enjoy piping hot, restaurant-quality food delivered right to your doorstep in eco-friendly packaging.",
    },
  ];

  return (
    <section id="how-it-works" className="py-section-gap bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <h2 className="font-headline text-headline-lg text-on-surface font-semibold">
            How It Works
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="font-body text-body-md text-on-surface-variant">
            From our kitchen hearth to your family table in three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center group flex flex-col items-center">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 soft-shadow group-hover:scale-110 group-hover:bg-primary-container/10 transition-all duration-300 border border-outline-variant/30">
                {step.icon}
              </div>
              <h3 className="font-headline text-headline-md text-on-surface font-semibold mb-3">
                {step.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant max-w-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
