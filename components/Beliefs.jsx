'use client';
import React from 'react';

export default function Beliefs() {
  return (
    <section className="beliefs sheet" id="beliefs">
      <div className="wrap beliefs-in">
        <div className="beliefs-l">
          <h2 className="h-64">What We Stand For.</h2>
          <div className="founder">
            <span className="ph t3"></span>
            <img
              className="sig"
              src="/img/andrea-signature.png"
              alt="Andrea's signature"
              width="360"
              height="190"
              loading="lazy"
            />
            <b>Andrea</b>
            <span>Co-Founder at ReviewRise</span>
          </div>
        </div>

        <div>
          <div className="belief">
            <h3>What we do works. We prove it every day.</h3>
            <div>
              <p>We walk into local businesses, give them 7 days free and post what happens. Real walk-ins, real reactions, real results.</p>
              <div className="bsoc">
                <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="#E4405F" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33 0 7.05.07 5.78.13 4.9.33 4.14.63a5.92 5.92 0 00-2.13 1.38A5.92 5.92 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.92 5.92 0 001.38 2.13 5.92 5.92 0 002.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.92 5.92 0 002.13-1.38 5.92 5.92 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.92 5.92 0 00-1.38-2.13A5.92 5.92 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.15A3.99 3.99 0 1115.99 12 3.99 3.99 0 0112 15.99zm6.41-11.85a1.44 1.44 0 11-1.44 1.44 1.44 1.44 0 011.44-1.44z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="belief">
            <h3>Less talk. More action.</h3>
            <div>
              <p>Anyone can promise you reviews. We start within 24 hours and you watch them come in.</p>
              <p>That's why your first 7 days are free. Judge us on what happens, not on what we say.</p>
            </div>
          </div>
          <div className="belief">
            <h3>We only win when you do.</h3>
            <div>
              <p>No contracts. Cancel anytime. The only way we keep you is by getting you found first.</p>
              <p>So that's the whole job, every single week.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
