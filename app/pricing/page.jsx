'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Pricing from '../../components/Pricing';
import Faq from '../../components/Faq';
import BottomCta from '../../components/BottomCta';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';

export default function PricingPage() {
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
    <>
      <Navbar onOpenBookingModal={handleOpenBooking} />
      
      <main id="main" style={{ paddingTop: '2rem' }}>
        <Pricing onOpenBookingModal={handleOpenBooking} />
        <Faq />
        <BottomCta onOpenBookingModal={handleOpenBooking} />
      </main>

      <Footer onOpenBookingModal={handleOpenBooking} />

      <BookingModal
        isOpen={modalOpen}
        onClose={handleCloseBooking}
        initialBizName={prefilledBiz}
      />
    </>
  );
}

