'use client';
import React from 'react';

const PLANS = [
  {
    name: 'Starter',
    dotColor: '#2563eb',
    originalPrice: 39,
    price: 29,
    setupFee: '$30 one-time setup fee',
    customers: 'Up to 100 customers / month',
    desc: 'For smaller local businesses and growing customer lists',
  },
  {
    name: 'Growth',
    dotColor: '#2563eb',
    originalPrice: 59,
    price: 49,
    setupFee: '$30 one-time setup fee',
    customers: 'Up to 250 customers / month',
    desc: 'For established local businesses with steady daily appointments',
  },
  {
    name: 'Pro',
    dotColor: '#2563eb',
    originalPrice: 89,
    price: 79,
    setupFee: '$30 one-time setup fee',
    customers: 'Up to 500 customers / month',
    desc: 'For high-volume practices, multi-staff businesses & busy teams',
  },
];

const INCLUDED_FEATURES = [
  'Automated review requests via SMS & email',
  'Automated polite follow-up reminders',
  'Direct CRM, POS & customer list sync',
  'Personal photo signs & QR stand assets',
  'Dedicated account manager (call or text)',
  'Unlimited staff members & role controls',
];

export default function Pricing({ onOpenBookingModal }) {
  return (
    <section className="pricing-sheet sheet" id="pricing">
      <div className="wrap">
        <div className="pricing-title-wrap">
          <h2 className="h-64">Get Consistent Reviews. Get Found First.</h2>
        </div>

        {/* 3 Pricing Cards */}
        <div className="flam-pricing-grid">
          {PLANS.map((plan, idx) => (
            <article
              key={idx}
              className="flam-card"
            >
              <div className="flam-card-top">
                <div className="plan-name-row">
                  <span
                    className="plan-dot"
                    style={{ backgroundColor: plan.dotColor }}
                    aria-hidden="true"
                  />
                  <h3>{plan.name}</h3>
                  <span className="plan-offer-tag">Current Offer</span>
                </div>

                <div className="plan-price-row">
                  <span className="plan-orig">${plan.originalPrice}</span>
                  <b>${plan.price}</b>
                  <span>/ month</span>
                </div>

                <div className="plan-setup-fee">+ {plan.setupFee}</div>

                <p className="plan-cust">{plan.customers}</p>
                <p className="plan-desc">{plan.desc}</p>
              </div>

              <div className="flam-card-action">
                <button
                  type="button"
                  className="btn-blue-pill"
                  onClick={() => onOpenBookingModal?.(plan.name + ' Plan')}
                >
                  Schedule a Call
                </button>
                <span className="plan-note">Starts with a 15-minute setup call</span>
              </div>
            </article>
          ))}
        </div>

        {/* Every Plan Includes */}
        <div className="every-plan-box">
          <h3>Every Plan Includes</h3>
          <div className="every-plan-grid">
            {INCLUDED_FEATURES.map((feat, idx) => (
              <div key={idx} className="every-plan-item">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" fill="#dbeafe" />
                  <path d="M6 10l2.5 2.5L14 7.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
