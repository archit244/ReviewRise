'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SayNote from '../components/SayNote';
import TabbedFeatures from '../components/TabbedFeatures';
import Stepper from '../components/Stepper';
import SurveyCallout from '../components/SurveyCallout';
import ReviewsProof from '../components/ReviewsProof';
import Industries from '../components/Industries';
import EverythingHandled from '../components/EverythingHandled';
import SeoAbout from '../components/SeoAbout';
import Pricing from '../components/Pricing';
import Faq from '../components/Faq';
import BottomCta from '../components/BottomCta';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

export default function HomePage() {
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
      
      <main id="main">
        <Hero onOpenBookingModal={handleOpenBooking} />
        <SayNote />
        <TabbedFeatures />
        <Industries />
        <Stepper onOpenBookingModal={handleOpenBooking} />
        <SurveyCallout />
        <EverythingHandled onOpenBookingModal={handleOpenBooking} />
        <ReviewsProof />
        <SeoAbout />
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
