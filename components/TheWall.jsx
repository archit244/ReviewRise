'use client';
import React from 'react';

const WALL_ITEMS = [
  { img: 'review-request-sign-kevin-dental-clinic.webp', biz: 'Sunshine Dental' },
  { img: 'review-request-sign-saja-massage-addict-team.webp', biz: 'Massage Addict' },
  { img: 'review-request-sign-david-burlington-lakeshore-veterinary-hospital.webp', biz: 'Burlington Vet' },
  { img: 'review-request-sign-mandy-barbershop.webp', biz: "Saja's Barbershop" },
  { img: 'review-request-sign-andrea-clinic-team.webp', biz: 'Not Just Hair' },
  { img: 'review-request-sign-ananya-navis-hair-beauty-salon.webp', biz: "Navi's Hair Salon" },
  { img: 'review-request-sign-david-family-care-clinic.webp', biz: 'Appleview Chiropractic' },
  { img: 'review-request-sign-andrea-barbershop-team.webp', biz: 'Commodores of Fades' },
  { img: 'review-request-sign-chris-new-york-new-york-salon-team.webp', biz: 'New York New York' },
  { img: 'review-request-sign-claire-everyday-body.webp', biz: 'Everyday Body' },
  { img: 'review-request-sign-jacob-cafe-team.webp', biz: 'Cornerstone Café' },
  { img: 'review-request-sign-andrea-vr-vibe-team.webp', biz: 'VR Vibe' },
];

export default function TheWall({ onOpenBookingModal }) {
  return (
    <section className="wall sheet" id="wall">
      <div className="wrap">
        <small className="eyebrow">Everyone else sends a generic text. <span>We send this.</span></small>
        <h2 className="h-64">600+ Businesses Are Getting Found First. You're Next.</h2>

        <div className="wall-grid">
          {WALL_ITEMS.map((item, idx) => (
            <figure className="wt" key={idx}>
              <img
                src={`/img/${item.img}`}
                alt={`${item.biz} customer sign`}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <b>{item.biz}</b>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="wall-cta">
          <button
            type="button"
            className="btn btn-white"
            onClick={() => onOpenBookingModal?.()}
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
}
