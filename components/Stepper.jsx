'use client';

import React, { useState } from 'react';

const STEPS = [
  {
    step: '1',
    label: 'Today',
    small: 'Today',
    h3: 'Book Your 15-Min Setup Call',
    p: 'We create your own account, add your team\'s photos and set everything up in one call. 15 minutes, then you\'re done.',
    hasCta: true
  },
  {
    step: '2',
    label: 'Day 1',
    small: 'Day 1',
    h3: 'Review Requests Go Out Daily',
    p: 'Sent automatically in small batches, so reviews come in steadily, not all at once. Each one has your photo and your customer\'s name.',
    hasCta: true
  },
  {
    step: '3',
    label: 'Day 2+',
    small: 'Day 2+',
    h3: 'Reviews Start Coming In',
    p: 'Real Google reviews from customers you\'ve already served. They just needed to be asked.',
    hasCta: true
  },
  {
    step: '4',
    label: 'Always',
    small: 'Always',
    h3: 'You Rank Higher on Google Maps',
    p: 'More reviews, higher ranking, more customers finding you. It keeps compounding the longer you run it.',
    hasCta: true
  }
];

export default function Stepper({ onOpenBookingModal }) {
  const [activeStep, setActiveStep] = useState(0);

  const cur = STEPS[activeStep];

  return (
    <section className="steps" id="how">
      <div className="wrap">
        <h2 className="h-64">What Happens After You Sign Up</h2>
        <p className="steps-sub">You book the call. We do the rest.</p>

        <div className="stepper" role="tablist" style={{ '--i': activeStep }}>
          {STEPS.map((s, idx) => (
            <button
              key={idx}
              className={`step ${activeStep === idx ? 'on' : ''} ${activeStep > idx ? 'done' : ''}`}
              role="tab"
              aria-selected={activeStep === idx}
              onClick={() => setActiveStep(idx)}
            >
              <i>{s.step}</i>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        <div className="step-card">
          <div className="step-panel" role="tabpanel">
            <small>{cur.small}</small>
            <h3>{cur.h3}</h3>
            <p>{cur.p}</p>
            <button
              type="button"
              className="btn btn-white"
              onClick={() => onOpenBookingModal?.()}
            >
              Schedule a Call
            </button>
            <b className="ghost" aria-hidden="true">{cur.step}</b>
          </div>
        </div>
      </div>
    </section>
  );
}
