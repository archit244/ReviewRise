'use client';

import React, { useRef, useEffect } from 'react';

const STORIES = [
  { img: 'mickey-nails-pink-and-green-nail-art.webp', b: '#3', span: 'In the city on Google', p: 'Mickey Nails\n329+ new reviews in 8 months' },
  { img: 'massage-addict-storefront.webp', b: '6th → 1st', span: 'On Google', p: 'Massage Addict\n284 new reviews in 5 months', up: true },
  { img: 'commodore-of-fades-barbershop-interior.webp', isVid: true, small: 'Commodore of Fades Barbershop', b: '+35–40', span: 'extra walk-ins a month' },
  { img: 'dr-vencheti-dentist-with-patient.webp', isVid: true, lite: true, small: 'Dr. Vencheti', b: '+$40–50K', sm: true, span: 'extra a month' },
  { img: 'dr-safana-dentist-in-her-clinic.webp', b: '2x', span: 'New patients, organically', p: 'Dr. Safana\nDentist' },
  { img: 'absolute-moving-crew-with-truck.webp', b: 'Top 3', span: 'On Maps in every market', p: 'Absolute Moving\n350+ new reviews across 3 locations', up: true },
  { img: 'everyday-body-studio-interior.webp', b: '#1', span: 'For laser in their city', p: 'Everyday Body\n2–3 new reviews per day' },
  { img: 'integrative-medicine-front-desk.webp', b: '2x', span: 'New patient inquiries', p: 'Integrative Medicine\n24% more high-trust reviews in 2 months' },
  { img: 'cambria-cleaning-kitchen-cleaning.webp', b: '3x', span: 'New client inquiries', p: 'Cambria Cleaning\n#1 on local Maps, 25+ reviews a month' }
];

export default function StoriesMarquee({ onOpenBookingModal }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      isDown = true;
      el.classList.add('drag');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove('drag');
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove('drag');
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section className="stories sheet" id="results">
      <h2 className="h-48 wrap">Real Results From Real Local Businesses</h2>

      <div className="st-scroll" ref={scrollRef}>
        <div className="mq-track">
          {STORIES.concat(STORIES).map((s, idx) => (
            <div
              key={idx}
              className={`story ${s.up ? 'up' : ''} ${s.isVid ? 'vid' : ''} ${s.lite ? 'lite' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => onOpenBookingModal?.()}
            >
              <img src={`/img/${s.img}`} alt="" loading="lazy" decoding="async" />

              {s.isVid ? (
                <>
                  <div className="vid-head">
                    <small>{s.small}</small>
                    <b className={s.sm ? 'sm' : ''}>{s.b}</b>
                    <span>{s.span}</span>
                  </div>
                  <span className="vid-play" aria-hidden="true"></span>
                  <div className="vid-foot">Watch his story</div>
                </>
              ) : (
                <div className="story-txt">
                  <b>{s.b}</b>
                  <span>{s.span}</span>
                  {s.p && <p style={{ whiteSpace: 'pre-line' }}>{s.p}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap sec-cta">
        <button
          type="button"
          className="btn btn-blue"
          onClick={() => onOpenBookingModal?.()}
        >
          Schedule a Call
        </button>
      </div>
    </section>
  );
}
