import React from 'react';
import { Globe, Share2, Mail, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-high border-t border-outline-variant/30 text-on-surface">
      {/* CTA Banner section */}
      <div className="py-20 bg-primary text-on-primary text-center">
        <div className="max-w-2xl mx-auto px-gutter space-y-6">
          <h2 className="font-display text-3xl md:text-display-lg font-semibold">
            Ready to Taste the Tradition?
          </h2>
          <p className="font-body text-body-lg opacity-90 leading-relaxed max-w-lg mx-auto">
            Join thousands of food lovers who enjoy authentic, hearth-cooked Indian meals delivered fresh daily.
          </p>
          <a
            href="#menu"
            className="inline-block bg-surface text-primary px-10 py-4 rounded-lg font-label text-label-lg font-semibold hover:bg-surface-bright transition-all transform hover:scale-105 soft-shadow"
          >
            Start Your Order Now
          </a>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-container-max mx-auto px-gutter py-section-gap grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <img 
              alt="Logo" 
              className="h-8 w-8 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBqoCF2eJMk0dv6amHm_TTGFgisJdRw4S3VURCeL4r2TqA4tHJN9wtl2osP8XgB87WWG_2crCE-26wA5SFbNg2rBMD357op3qlI31kJ2w0Eu_LyecYYvSArssmnta7rt4C-oXX6olp2g9MaSg_lOvxka4m_nqlEllgNKJzCQshbhDd5uq2jL7n3r10exyLgag8CQJCKvyFIEkF3PyOBs3nev4USNEZnH8xkI6hdngsj3Xt5AGZDJCS-BnNSUQD8N67bDZ1c2kPC8" 
            />
            <span className="font-headline text-2xl font-bold text-primary">
              Acharya's Kitchen
            </span>
          </div>

          <p className="font-body text-body-md text-on-surface-variant max-w-md leading-relaxed">
            Bringing the soul of Indian heritage cooking to modern lifestyles through expert craftsmanship, organic spices, and premium delivery.
          </p>

          <div className="flex gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all soft-shadow">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all soft-shadow">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all soft-shadow">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">
            Navigation
          </h4>
          <ul className="space-y-3 font-body text-body-md text-on-surface-variant">
            <li><a href="#hero" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#menu" className="hover:text-primary transition-colors">Full Menu</a></li>
            <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
            <li><a href="#chef-note" className="hover:text-primary transition-colors">About Chef Acharya</a></li>
            <li><a href="#reviews" className="hover:text-primary transition-colors">Customer Reviews</a></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">
            Kitchen Information
          </h4>
          <ul className="space-y-3 font-body text-body-md text-on-surface-variant">
            <li>Operating Hours: <strong>11:00 AM - 11:00 PM</strong></li>
            <li>Contact: <a href="mailto:hello@acharyaskitchen.com" className="text-primary hover:underline">hello@acharyaskitchen.com</a></li>
            <li>Support Hotline: <strong>+1 (800) 555-HEARTH</strong></li>
            <li>Privacy Policy & Terms of Service</li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-container-max mx-auto px-gutter py-6 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-label text-on-surface-variant">
        <p>© 2026 Acharya's Kitchen. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            Designed with Heritage Passion
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            Verified Cloud Kitchen
          </span>
        </div>
      </div>
    </footer>
  );
}
