'use client';
import React from 'react';

export default function BottomCta({ onOpenBookingModal }) {
  return (
    <section className="cta sheet" id="cta">
      <div className="wrap">
        <h2 className="h-48">Your Next 5-Star Review <br />Is One Message Away</h2>
        <p className="cta-sub">
          Turn everyday customer experiences into genuine Google review opportunities with personalized, automated requests.
        </p>
        <div className="cta-btns">
          <button
            type="button"
            className="btn btn-white"
            onClick={() => onOpenBookingModal?.()}
          >
            Schedule a Call
          </button>
          <a href="/#pricing" className="btn btn-glass">Our Pricing</a>
        </div>
      </div>

      <div className="cta-phone" aria-hidden="true">
        <div className="phone">
          <div className="screen">
            <div className="spb">
              <span className="spb-stars">★★★★★</span>
              <b>Make every customer <br />experience count</b>
              <span
                className="spb-btn"
                style={{ cursor: 'pointer' }}
                onClick={() => onOpenBookingModal?.()}
              >
                Get reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
