'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import BottomCta from './BottomCta';
import Footer from './Footer';
import BookingModal from './BookingModal';

export default function LegalPageLayout({
  title,
  tagline,
  children,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefilledBiz, setPrefilledBiz] = useState('');

  const handleOpenBooking = (bizName = '') => {
    if (typeof bizName === 'string') {
      setPrefilledBiz(bizName);
    }
    setModalOpen(true);
  };

  const handleCloseBooking = () => {
    setModalOpen(false);
  };

  return (
    <div className="legal-page-wrap">
      <Navbar onOpenBookingModal={handleOpenBooking} />

      {/* Hero Header Area with warm background and bold title (Flamingo Flow style) */}
      <header className="legal-hero">
        <div className="legal-hero-wrap">
          <h1 className="legal-hero-title">{title}</h1>
          {tagline && <p className="legal-hero-tagline">{tagline}</p>}
        </div>
      </header>

      {/* Main Content inside White Rounded Sheet + Final CTA */}
      <main id="main">
        <section className="legal-sheet sheet">
          <div className="legal-body-wrap">
            <article className="legal-content">
              {children}
            </article>
          </div>
        </section>

        {/* Final CTA Sheet */}
        <BottomCta onOpenBookingModal={handleOpenBooking} />
      </main>

      <Footer onOpenBookingModal={handleOpenBooking} />

      <BookingModal
        isOpen={modalOpen}
        onClose={handleCloseBooking}
        initialBizName={prefilledBiz}
      />
    </div>
  );
}
