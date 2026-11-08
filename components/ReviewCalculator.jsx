'use client';
import React, { useState } from 'react';

export default function ReviewCalculator() {
  const [pastCustomers, setPastCustomers] = useState('1200');
  const [newCustomers, setNewCustomers] = useState('80');

  const pastNum = parseInt(pastCustomers.replace(/,/g, ''), 10) || 0;
  const newNum = parseInt(newCustomers.replace(/,/g, ''), 10) || 0;

  // Realistic review conversion rates
  // ~10% conversion from re-engaging past customer database
  const pastReviews = pastNum > 0 ? Math.round(pastNum * 0.10) : 0;
  // ~20% conversion from fresh automated review requests to new customers
  const newReviews = newNum > 0 ? Math.round(newNum * 0.20) : 0;

  const handlePastChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setPastCustomers(val);
  };

  const handleNewChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setNewCustomers(val);
  };

  const formatWithCommas = (num) => {
    if (!num) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <section className="calc-sheet sheet" id="calculator">
      <div className="wrap">
        <div className="calc-head">
          <h2 className="calc-title">How Many Reviews Could Your Business Generate?</h2>
          <p className="calc-sub">Two numbers. That&apos;s all it takes.</p>
        </div>

        {/* Inputs Row */}
        <div className="calc-grid">
          <div className="calc-card input-card">
            <label htmlFor="past-cust" className="calc-label">TOTAL PAST CUSTOMERS</label>
            <div className="calc-input-wrap">
              <input
                id="past-cust"
                type="text"
                inputMode="numeric"
                className="calc-input"
                placeholder="e.g. 1,200"
                value={formatWithCommas(pastCustomers)}
                onChange={handlePastChange}
              />
            </div>
          </div>

          <div className="calc-card input-card">
            <label htmlFor="new-cust" className="calc-label">NEW CUSTOMERS A MONTH</label>
            <div className="calc-input-wrap">
              <input
                id="new-cust"
                type="text"
                inputMode="numeric"
                className="calc-input"
                placeholder="e.g. 80"
                value={formatWithCommas(newCustomers)}
                onChange={handleNewChange}
              />
            </div>
          </div>
        </div>

        {/* Outputs Row */}
        <div className="calc-grid results-grid">
          <div className="calc-card output-card">
            <span className="calc-label output-label">FROM PAST CUSTOMERS</span>
            <div className={`calc-val ${pastReviews === 0 ? 'zero' : ''}`}>
              {pastReviews.toLocaleString()}
            </div>
            <p className="calc-note">
              {pastReviews === 0
                ? 'Enter your past customers above.'
                : `~${pastReviews.toLocaleString()} reviews reactivated from your customer list.`}
            </p>
          </div>

          <div className="calc-card output-card">
            <span className="calc-label output-label">EVERY MONTH FROM NEW CUSTOMERS</span>
            <div className={`calc-val ${newReviews === 0 ? 'zero' : ''}`}>
              {newReviews.toLocaleString()}
            </div>
            <p className="calc-note">
              {newReviews === 0
                ? 'Enter your monthly new customers above.'
                : `~${newReviews.toLocaleString()} fresh 5-star reviews every single month.`}
            </p>
          </div>
        </div>

        <p className="calc-disclaimer">
          Based on average results. Results vary. Nothing guaranteed.
        </p>
      </div>
    </section>
  );
}

