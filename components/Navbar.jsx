'use client';

import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar({ onOpenBookingModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.documentElement.style.overflow = next ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.documentElement.style.overflow = '';
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} id="nav">
      <a href="/" className="logo" aria-label="ReviewRise home" onClick={closeMenu}>
        <Logo />
      </a>

      <ul className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
        <li><a href="/#how" onClick={closeMenu}>How it works</a></li>
        <li><a href="/#pricing" onClick={closeMenu}>Pricing</a></li>
        <li><a href="/#faq" onClick={closeMenu}>FAQ</a></li>
        <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>

        <li className="m-only">
          <button
            type="button"
            className="btn btn-nav"
            onClick={() => { closeMenu(); onOpenBookingModal?.(); }}
          >
            Schedule a Call
          </button>
        </li>
      </ul>

      <div className="nav-r">
        <button
          type="button"
          className="btn btn-nav"
          onClick={() => onOpenBookingModal?.()}
        >
          Schedule a Call
        </button>
        <button
          className="burger"
          id="burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <i aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}
