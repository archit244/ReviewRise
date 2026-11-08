'use client';
import React from 'react';

const REVIEWS_ROW_A = [
  { img: 'review-proof-dentist.webp', quote: '“We went from 2 reviews a month to 20+ on autopilot. Best investment we made.”' },
  { img: 'review-proof-salon.webp', quote: '“Being top three on Google Maps changed everything for our client bookings.”' },
  { img: 'review-proof-contractor.webp', quote: '“We finish a job, the follow-up sends automatically, and reviews just roll in.”' },
  { img: 'review-proof-medspa.webp', quote: '“The steady stream of 5-star reviews outperformed all our paid ad campaigns.”' },
  { img: 'review-proof-plumbing.webp', quote: '“Our phone calls doubled in sixty days. We\'re now the first ones people call.”' },
  { img: 'review-proof-hvac.webp', quote: '“Setup took under 15 minutes. It runs completely hands-off every single week.”' },
];

const REVIEWS_ROW_B = [
  { img: 'review-proof-barber.webp', quote: '“Went from buried on page two to ranking #1 in our area. The walk-ins speak for themselves.”' },
  { img: 'review-proof-clinic.webp', quote: '“Consistent reviews every week without having to awkwardly ask clients in person.”' },
  { img: 'review-proof-auto.webp', quote: '“Customers think we typed every message by hand. The response rate is unreal.”' },
  { img: 'review-proof-physio.webp', quote: '“Over 150 new Google reviews in six months. Our local search traffic is way up.”' },
  { img: 'review-proof-cleaning.webp', quote: '“Zero extra work for our staff. It runs in the background and keeps us at 5.0 stars.”' },
];

function StarsSvg() {
  return (
    <span className="stars" aria-hidden="true">
      <svg viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
      <svg viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
      <svg viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
      <svg viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
      <svg viewBox="0 0 20 20"><path d="m10 1.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L4.7 18l1.1-6L1.4 7.8l6-.8z"/></svg>
    </span>
  );
}

export default function ReviewsProof() {
  return (
    <section className="reviews sheet" id="results">
      <h2 className="h-80">
        <span>More Reviews.</span> <span>More Customers.</span>
      </h2>

      <div className="rating">
        <span>5.0</span>
        <StarsSvg />
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

      {/* Row A */}
      <div className="mq-track row-a" style={{ '--dur': '82.8s' }}>
        {REVIEWS_ROW_A.concat(REVIEWS_ROW_A).map((rv, idx) => (
          <article className="rv" key={idx}>
            <div>
              <span className="vf" aria-hidden="true">
                <img src={`/img/${rv.img}`} alt="" loading="lazy" />
              </span>
              <StarsSvg />
              <p>{rv.quote}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Row B */}
      <div className="mq-track row-b rev" style={{ '--dur': '69s' }}>
        {REVIEWS_ROW_B.concat(REVIEWS_ROW_B).map((rv, idx) => (
          <article className="rv" key={idx}>
            <div>
              <span className="vf" aria-hidden="true">
                <img src={`/img/${rv.img}`} alt="" loading="lazy" />
              </span>
              <StarsSvg />
              <p>{rv.quote}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
