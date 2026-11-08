'use client';

import React, { useRef } from 'react';

const CASES = [
  {
    quote: 'How a 17-Location Clinic Reached the Top 3 on Google in 10 Locations and Got 34% More Calls in 60 Days',
    cite: 'Physiotherapy clinic group, 17 locations',
    stats: [
      { b: 'Top 3', span: 'On Google' },
      { b: '10 of 17', span: 'Locations in top 3' },
      { b: '+34%', span: 'More calls in 60 days' },
    ],
    img: 'physiotherapy-clinic-treatment-tables-rehab-equipment.webp',
  },
  {
    quote: 'How The Smiths Grew Monthly Revenue by $25K With a Top 3 Spot on Google Maps',
    cite: 'The Smiths, owners',
    stats: [
      { b: '+$25K', span: 'Monthly revenue' },
      { b: 'Top 3', span: 'Google Maps' },
      { b: '5.0 ★', span: 'Google rating' },
    ],
    img: 'the-smiths-owners-with-work-truck.webp',
  },
  {
    quote: 'How Commodore of Fades Added 35–40 Walk-Ins a Month',
    cite: 'Commodore of Fades Barbershop',
    stats: [
      { b: '+35–40', span: 'Walk-ins a month' },
      { b: '#1', span: 'In city on Google' },
      { b: '4.9 ★', span: 'Google rating' },
    ],
    img: 'commodore-of-fades-barbershop-interior.webp',
    hasPlay: true,
  },
  {
    quote: 'How Dr. Vencheti Grew Revenue by $40–50K a Month',
    cite: 'Dr. Vencheti, dentist',
    stats: [
      { b: '+$40–50K', span: 'Monthly revenue' },
      { b: 'Top 3', span: 'On Google' },
      { b: '4.9 ★', span: 'Google rating' },
    ],
    img: 'dr-vencheti-dentist-with-patient.webp',
    hasPlay: true,
  },
  {
    quote: 'Hired 2 New Injectors and Added an Extra $20K in Revenue From Being at the Top of Google',
    cite: 'Med spa',
    stats: [
      { b: '+$20K', span: 'Extra revenue' },
      { b: '2', span: 'New injectors hired' },
      { b: 'Top', span: 'Of Google' },
    ],
    img: 'med-spa-team-three-injectors.webp',
  }
];

export default function CaseStudySlider({ onOpenBookingModal }) {
  const railRef = useRef(null);

  const stepRail = (dir) => {
    if (!railRef.current) return;
    const card = railRef.current.querySelector('.tcard');
    const gap = 16;
    const w = card ? card.offsetWidth + gap : 400;
    railRef.current.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section className="testi sheet" id="stories">
      <div className="wrap testi-hd">
        <h2 className="h-48">Ready to Rank Higher <span>With Reviews?</span></h2>
        <div className="arrows">
          <button className="arrow" id="prev" aria-label="Previous" onClick={() => stepRail(-1)}>
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.5 7h-11M6 2.5 1.5 7 6 11.5"/></svg>
          </button>
          <button className="arrow" id="next" aria-label="Next" onClick={() => stepRail(1)}>
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1.5 7h11M8 2.5 12.5 7 8 11.5"/></svg>
          </button>
        </div>
      </div>

      <div className="rail" id="rail" ref={railRef}>
        {CASES.map((item, idx) => (
          <article className="tcard" key={idx}>
            <div className="tcard-l">
              <blockquote>{item.quote}</blockquote>
              <cite>{item.cite}</cite>
              <button
                type="button"
                className="btn btn-blue"
                onClick={() => onOpenBookingModal?.()}
              >
                Learn more
                <svg viewBox="0 0 8 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2 1.5 3.5 3.5L2 8.5"/></svg>
              </button>
              <div className="stats">
                {item.stats.map((st, i) => (
                  <div key={i}>
                    <b>{st.b}</b>
                    <span>{st.span}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`tvis ${item.hasPlay ? '' : 'pic'}`}>
              <img src={`/img/${item.img}`} alt="" loading="lazy" decoding="async" />
              {item.hasPlay && <button className="play" aria-label="See story" onClick={() => onOpenBookingModal?.()}></button>}
            </div>
          </article>
        ))}
      </div>

      <div className="wrap more-row">
        <button
          type="button"
          className="btn btn-black"
          onClick={() => onOpenBookingModal?.()}
        >
          View All Client Results
        </button>
      </div>
    </section>
  );
}
