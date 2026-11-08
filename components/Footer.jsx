'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sheet ft-small" id="contact">
      <div className="wrap ft-small-wrap">
        <div className="ft-small-bottom">
          <span className="ft-small-copy">
            &copy; {currentYear} ReviewRise Inc. All rights reserved.
          </span>
          <div className="ft-small-legal">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/compliance">Review Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
