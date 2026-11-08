'use client';

import React, { useRef, useEffect } from 'react';

const INDUSTRIES = [
  { img: 'ind-dentists.jpg', title: 'Dentists' },
  { img: 'ind-hair-salons.jpg', title: 'Hair Salons' },
  { img: 'ind-movers.jpg', title: 'Movers' },
  { img: 'ind-med-spas.jpg', title: 'Med Spas' },
  { img: 'ind-laser-clinics.jpg', title: 'Laser Clinics' },
  { img: 'ind-hvac.jpg', title: 'HVAC' },
  { img: 'ind-tattoo-studios.jpg', title: 'Tattoo Studios' },
  { img: 'ind-vets.jpg', title: 'Vets' },
  { img: 'ind-restaurants.jpg', title: 'Restaurants' },
  { img: 'ind-automotive.jpg', title: 'Automotive' },
  { img: 'ind-massage.jpg', title: 'Massage' },
  { img: 'ind-tanning.jpg', title: 'Tanning' },
  { img: 'ind-nail-salons.jpg', title: 'Nail Salons' },
  { img: 'ind-plumbing.jpg', title: 'Plumbing' },
  { img: 'ind-chiropractors.jpg', title: 'Chiropractors' },
  { img: 'ind-physical-therapy.jpg', title: 'Physical Therapy' },
  { img: 'ind-junk-removal.jpg', title: 'Junk Removal' },
  { img: 'ind-waterproofing.jpg', title: 'Waterproofing' },
  { img: 'ind-cleaning.jpg', title: 'Cleaning' },
  { img: 'ind-rentals.jpg', title: 'Rentals' }
];

export default function Industries({ onOpenBookingModal }) {
  const trackRef = useRef(null);

  return (
    <section className="ind sheet" id="product">
      <div className="wrap">
        <h2 className="h-64">If You Have Customers, We Get You More of Them.</h2>
        <p className="ind-sub">Any service business. Here are some we work with every day.</p>
      </div>

      <div className="mq-track" style={{ '--dur': '80s' }} ref={trackRef}>
        {INDUSTRIES.concat(INDUSTRIES).map((ind, idx) => (
          <div
            key={idx}
            className="icard"
            style={{ cursor: 'pointer' }}
            onClick={() => onOpenBookingModal?.()}
          >
            <img src={`/img/${ind.img}`} alt={ind.title} loading="lazy" decoding="async" />
            <span>{ind.title}</span>
            <em>Learn more</em>
          </div>
        ))}
      </div>
    </section>
  );
}
