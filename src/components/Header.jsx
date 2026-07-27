import React, { useState } from 'react';
import { ShoppingBag, Search, Menu as MenuIcon, X, LogOut, User as UserIcon } from 'lucide-react';

export default function Header({ user, onLogout, cartCount, onOpenCart, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 nav-glass border-b border-outline-variant/20 transition-all duration-300">
      <nav className="max-w-container-max mx-auto px-gutter py-4 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            alt="Acharya's Kitchen Logo" 
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBqoCF2eJMk0dv6amHm_TTGFgisJdRw4S3VURCeL4r2TqA4tHJN9wtl2osP8XgB87WWG_2crCE-26wA5SFbNg2rBMD357op3qlI31kJ2w0Eu_LyecYYvSArssmnta7rt4C-oXX6olp2g9MaSg_lOvxka4m_nqlEllgNKJzCQshbhDd5uq2jL7n3r10exyLgag8CQJCKvyFIEkF3PyOBs3nev4USNEZnH8xkI6hdngsj3Xt5AGZDJCS-BnNSUQD8N67bDZ1c2kPC8" 
          />
          <span className="font-headline text-2xl font-bold text-primary tracking-tight">
            Acharya's Kitchen
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-body text-body-md">
          <button 
            onClick={() => handleNavClick('hero')}
            className="text-primary font-semibold border-b-2 border-primary pb-0.5 hover:opacity-90 transition-opacity"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('menu')}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Menu
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            How it Works
          </button>
          <button 
            onClick={() => handleNavClick('chef-note')}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            About Chef
          </button>
          <button 
            onClick={() => handleNavClick('reviews')}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Reviews
          </button>
        </div>

        {/* Action Controls & User Account */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button 
            onClick={() => handleNavClick('menu')}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors"
            title="Search menu"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative bg-primary text-on-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-label text-label-lg hover:bg-primary-container transition-all duration-300 soft-shadow flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-primary rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center ml-0.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Logout */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-outline-variant/30">
              <div className="flex items-center gap-1.5 text-xs font-label font-semibold text-on-surface">
                <UserIcon className="w-4 h-4 text-primary" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-on-surface-variant hover:text-error transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/30 px-gutter py-6 space-y-4 font-body animate-fadeIn">
          {user && (
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-primary" />
                <span className="font-label font-semibold text-sm text-on-surface">{user.name}</span>
              </div>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onLogout(); }}
                className="text-xs text-error font-label font-semibold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log Out
              </button>
            </div>
          )}
          <button 
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left font-semibold text-primary py-2"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('menu')}
            className="block w-full text-left text-on-surface-variant hover:text-primary py-2"
          >
            Full Menu
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left text-on-surface-variant hover:text-primary py-2"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('chef-note')}
            className="block w-full text-left text-on-surface-variant hover:text-primary py-2"
          >
            About Chef
          </button>
          <button 
            onClick={() => handleNavClick('reviews')}
            className="block w-full text-left text-on-surface-variant hover:text-primary py-2"
          >
            Customer Reviews
          </button>
        </div>
      )}
    </header>
  );
}
