'use client';

import React, { useState, useEffect, useRef } from 'react';

const TABS = [
  { label: 'More Customers' },
  { label: 'Higher on Maps' },
  { label: 'More Reviews' },
  { label: 'Zero Extra Work' }
];

export default function TabbedFeatures() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <section className="stack" id="features" ref={containerRef}>
      <div className="wrap">
        <h2 className="h-64">More Reviews. More Visibility. More Customers.</h2>

        <div className="tabs" role="tablist">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              className={`tab ${activeTab === idx ? 'on run' : ''}`}
              role="tab"
              aria-selected={activeTab === idx}
              onClick={() => setActiveTab(idx)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Panel 0: More Customers */}
        {activeTab === 0 && (
          <div className="tpanel" role="tabpanel">
            <div className="tcopy">
              <small>More Customers</small>
              <h3>More reviews. More calls. It's that simple.</h3>
              <div className="proof">
                <b>Consistent</b>
                <span>Inbound customer inquiries</span>
                <small>Built for local service businesses</small>
              </div>
            </div>
            <div className="tart c1" aria-hidden="true">
              <div className="mock">
                <div className="ptile pic">
                  <img src="/img/local-service-barbershop.webp" alt="Local Service Business" loading="lazy" />
                  <div>
                    <b>Steady Inbound Calls</b>
                    <span>Qualified local leads & bookings</span>
                    <small>Local Service Business</small>
                  </div>
                </div>
                <div className="ptile pic">
                  <img src="/img/local-specialist-clinic.webp" alt="Neighborhood Specialist" loading="lazy" />
                  <div>
                    <b>Top Local Choice</b>
                    <span>High-intent customers choosing you first</span>
                    <small>Neighborhood Specialist</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 1: Higher on Maps */}
        {activeTab === 1 && (
          <div className="tpanel" role="tabpanel">
            <div className="tcopy">
              <small>Higher on Maps</small>
              <h3>Sixth place doesn't get the call. First place does.</h3>
              <div className="proof">
                <b>#1</b>
                <span>Local Google Maps placement</span>
                <small>Show up at the top when locals search</small>
              </div>
            </div>
            <div className="tart c2" aria-hidden="true">
              <div className="mock">
                <div className="pcard">
                  <h4>Local Maps ranking</h4>
                  <div className="rk hi"><span className="pos">1st</span><div><b>Your Business</b><small>4.9 ★ (Top Ranked)</small></div></div>
                  <div className="rk"><span className="pos">2nd</span><div><b>Local Competitor</b></div></div>
                  <div className="rk"><span className="pos">3rd</span><div><b>Other Provider</b></div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 2: More Reviews */}
        {activeTab === 2 && (
          <div className="tpanel" role="tabpanel">
            <div className="tcopy">
              <small>More Reviews</small>
              <h3>Reviews every single week. Not whenever someone remembers.</h3>
              <div className="proof">
                <b>Consistent</b>
                <span>Weekly review momentum</span>
                <small>Steady feedback without manual follow-up</small>
              </div>
            </div>
            <div className="tart c3" aria-hidden="true">
              <div className="mock">
                <div className="note"><b>New 5-Star Google Review</b><small>Verified Customer &bull; Just now</small></div>
                <div className="note"><b>New 5-Star Google Review</b><small>Verified Customer &bull; 2 hours ago</small></div>
                <div className="note"><b>New 5-Star Google Review</b><small>Verified Customer &bull; 2 hours ago</small></div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 3: Zero Extra Work */}
        {activeTab === 3 && (
          <div className="tpanel" role="tabpanel">
            <div className="tcopy">
              <small>Zero Extra Work</small>
              <h3>We set it up with you once. Then it runs.</h3>
              <div className="proof">
                <b>Hands-off</b>
                <span>Automated customer outreach</span>
                <small>Quick 15-minute setup call. Fully managed support.</small>
              </div>
            </div>
            <div className="tart c4" aria-hidden="true">
              <div className="mock">
                <div className="note"><b>1. We connect to your tools</b><small>Or simply sync your customer list</small></div>
                <div className="note"><b>2. Requests go out automatically</b><small>In steady daily batches with direct link</small></div>
                <div className="note"><b>3. Reviews land on your profile</b><small>With polite follow-ups handled for you</small></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
