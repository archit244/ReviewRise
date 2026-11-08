'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const TEXTS = [
  {
    sender: 'Apex Roofing',
    to: 'Ethan',
    photo: 'review-request-sign-ethan-roofing-crew.webp',
    domain: 'review.apexroofing.com',
    msg: [
      "Hey Ethan! It's the crew from Apex Roofing & Exteriors. Hope you love how the new roof turned out!",
      "Would you mind leaving us a quick Google review? It honestly makes our day. Thank you Ethan!"
    ]
  },
  {
    sender: 'Glow Med Spa',
    to: 'Charlotte',
    photo: 'review-request-sign-charlotte-med-spa.webp',
    domain: 'review.glowmedspa.com',
    msg: [
      "Hii Charlotte ✨ it's Elena from Glow Med Spa. Hope you loved your facial today!",
      "If you have a quick sec, we'd love it if you could leave us a quick Google review ⭐️ Thank you Charlotte!"
    ]
  },
  {
    sender: 'Summit Climate',
    to: 'Michael',
    photo: 'review-request-sign-michael-summit-climate-hvac.webp',
    domain: 'review.summitclimate.com',
    msg: [
      "Hey Michael! It's Jake & Ryan from Summit Climate Solutions. Hope the new heating setup is running great!",
      "Would you mind leaving us a quick Google review? It really helps our local team. Thanks Michael!"
    ]
  },
  {
    sender: 'Lakeside Dental',
    to: 'Benjamin',
    photo: 'review-request-sign-benjamin-dental-clinic.webp',
    domain: 'review.lakesidedental.com',
    msg: [
      "Hi Benjamin, it's Dr. Rachel from Lakeside Dental. Hope your visit went smoothly today!",
      "Would you mind taking 30 seconds to leave us a quick Google review? Thank you Benjamin!"
    ]
  },
  {
    sender: 'Precision Plumbing',
    to: 'Daniel',
    photo: 'review-request-sign-daniel-precision-plumbing.webp',
    domain: 'review.precisionplumbing.com',
    msg: [
      "Hey Daniel! It's Marco & Jake from Precision Plumbing. Hope everything is running great with the new plumbing!",
      "Would you mind leaving us a quick Google review? It helps our small business a ton. Thanks Daniel!"
    ]
  }
];

export default function Hero({ onOpenBookingModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const touchStartX = useRef(null);
  const autoPlayTimer = useRef(null);

  const t = TEXTS[currentIndex];

  const flip = useCallback((direction) => {
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    setIsSwapping(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + direction + TEXTS.length) % TEXTS.length);
      setIsSwapping(false);
    }, 260);
  }, []);

  useEffect(() => {
    autoPlayTimer.current = setTimeout(() => {
      flip(1);
    }, 5500);

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [currentIndex, flip]);

  return (
    <section className="hero">
      {/* 5-Star Rating Badge */}
      <div className="rating">
        <span>5.0</span>
        <span className="stars" aria-label="5 stars">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
        </span>
        <span className="ong">on
          <i className="gi" role="img" aria-label="Google">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </i>
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="h-80 wrap">
        Your Next 5-Star Review Is <br />
        One Message Away
      </h1>
      <p className="sub strong">
        Turn everyday customer experiences into genuine Google review opportunities <br className="d-pc" />
        with personalized, automated requests. Not another tool to manage. <br className="d-pc" />
        We set it up in 15 minutes and it runs on its own.
      </p>

      {/* Hero CTA Buttons */}
      <div className="hero-btns">
        <button
          type="button"
          className="btn btn-blue hero-btn-call"
          onClick={() => onOpenBookingModal?.('Hero Schedule Call')}
        >
          Schedule a Call
          <svg className="arrow-up" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 12.5v-11M2.5 6 7 1.5 11.5 6"/>
          </svg>
        </button>
        <a href="#pricing" className="btn hero-btn-pricing">
          Our Pricing
        </a>
      </div>

      {/* Stage: Blue 3-Column Showcase matching Reference Design with dynamic message switching */}
      <div className="stage wrap">
        <div className="stage-card">
          {/* Left Column: Heading & Hand-drawn swoop */}
          <div className="stage-left">
            <h2>
              A Personal<br />
              Ask for<br />
              Every Customer.
            </h2>
            <svg className="stage-swoop" viewBox="0 0 150 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 14C50 4 105 6 146 18" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Center Column: iPhone Mockup with Floating Nav & Sparkles */}
          <div className="stage-center">
            <div className="stage-phone-box">
              <button
                type="button"
                className="pnav prev"
                aria-label="Previous review example"
                onClick={(e) => { e.stopPropagation(); flip(-1); }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              <button
                type="button"
                className="pnav next"
                aria-label="Next review example"
                onClick={(e) => { e.stopPropagation(); flip(1); }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>

              <div className="phone-sparkle" aria-hidden="true">
                <svg viewBox="0 0 70 85" width="44" height="53" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round">
                  <line x1="14" y1="46" x2="24" y2="20" />
                  <line x1="32" y1="58" x2="56" y2="38" />
                  <line x1="42" y1="80" x2="66" y2="80" />
                </svg>
              </div>

              <div
                className="phone"
                role="button"
                tabIndex={0}
                aria-label="Interactive customer message preview. Click or swipe to see next example."
                title="Click to view next review message"
                onClick={() => flip(1)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    flip(1);
                  }
                }}
                onPointerDown={(e) => { touchStartX.current = e.clientX; }}
                onPointerUp={(e) => {
                  if (touchStartX.current === null) return;
                  const dx = e.clientX - touchStartX.current;
                  touchStartX.current = null;
                  if (Math.abs(dx) > 40) flip(dx < 0 ? 1 : -1);
                }}
              >
                <div className="screen">
                  <div className="sbar">
                    <span>9:41</span>
                    <i className="island" aria-hidden="true"></i>
                    <svg viewBox="0 0 70 14" fill="#000" aria-hidden="true">
                      <rect x="0" y="9" width="3.4" height="5" rx="1"/>
                      <rect x="5" y="6.5" width="3.4" height="7.5" rx="1"/>
                      <rect x="10" y="3.5" width="3.4" height="10.5" rx="1"/>
                      <rect x="15" y="0.5" width="3.4" height="13.5" rx="1"/>
                      <path d="M33 2.7a11 11 0 0 0-8 3.4l1.7 1.7a8.6 8.6 0 0 1 12.6 0L41 6.1a11 11 0 0 0-8-3.4zm0 4.6a6.4 6.4 0 0 0-4.7 2L30 11a4 4 0 0 1 6 0l1.7-1.7a6.4 6.4 0 0 0-4.7-2z"/>
                      <circle cx="33" cy="12.2" r="1.6"/>
                      <rect x="46" y="1" width="21" height="12" rx="3.6"/>
                      <rect x="68" y="5" width="1.6" height="4" rx=".8"/>
                    </svg>
                  </div>

                  <div className={`pscroll ${isSwapping ? 'swap' : ''}`} id="pscroll">
                    <div className="chat-h">
                      <span className="chat-back" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                      </span>
                      <i id="chAv">{t.sender.charAt(0)}</i>
                      <div className="chat-meta">
                        <b id="chName">{t.sender}</b>
                        <small>Text message</small>
                      </div>
                      <span className="chat-more" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                      </span>
                    </div>

                    <div className="bub photo">
                      <img
                        id="chPhoto"
                        src={`/img/${t.photo}`}
                        alt={`Photo sent by ${t.sender}`}
                        decoding="async"
                      />
                    </div>

                    <div className="bub msg" id="chMsg">
                      {t.msg.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>

                    <div className="bub link">
                      <div className="link-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                      <div className="link-meta">
                        <b>Review us on Google</b>
                        <small id="chDomain">{t.domain}</small>
                      </div>
                    </div>

                    <small className="deliv">Delivered</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Feature Badges matching Reference Design */}
          <div className="stage-right">
            <div className="stage-badge">
              <div className="stage-badge-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <span>Personalized <br />Messages</span>
            </div>

            <div className="stage-badge">
              <div className="stage-badge-icon">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <span>Direct Google <br />Review Link</span>
            </div>

            <div className="stage-badge">
              <div className="stage-badge-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#2563eb">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <span>Sent Automatically <br />After Each Job</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}