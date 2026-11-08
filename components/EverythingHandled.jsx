'use client';
import React from 'react';

export default function EverythingHandled({ onOpenBookingModal }) {
  return (
    <section className="guides sheet hand" id="guides">
      <div className="wrap">
        <h2 className="h-64">Everything We Handle for You</h2>
        <p className="hand-sub">Reviews are just the start. We run the entire review engine end to end.</p>

        <div className="hgrid">
          <article className="hcard">
            <div className="hpic">
              <span className="inc">Included</span>
              <img src="/img/feature-personal-review-requests.webp" alt="Personal review requests" loading="lazy" decoding="async" />
            </div>
            <h3>Personal review requests</h3>
            <p>Automatically sent for you, in your voice, with gentle reminders.</p>
          </article>

          <article className="hcard">
            <div className="hpic">
              <span className="inc soon">Coming Soon</span>
              <img src="/img/feature-automatic-review-replies.webp" alt="Automatic review replies" loading="lazy" decoding="async" />
            </div>
            <h3>Automatic review replies</h3>
            <p>Every review is answered for you automatically, in your own voice, learned from past replies.</p>
          </article>

          <article className="hcard">
            <div className="hpic">
              <span className="inc soon">Coming Soon</span>
              <div className="hmock">
                <div className="hkw hd"><span>Keyword</span><span>You</span><span>Competitor</span></div>
                <div className="hkw"><span>Local service near me</span><b>1st</b><i>4th</i></div>
                <div className="hkw"><span>Emergency service</span><b>1st</b><i>5th</i></div>
                <div className="hkw"><span>Top rated specialist</span><b>2nd</b><i>3rd</i></div>
                <small className="hsample">Sample live rank tracking</small>
              </div>
            </div>
            <h3>Track where you rank on Google</h3>
            <p>The searches you show up for, how many people search them, and where your competitors stand.</p>
          </article>

          <article className="hcard">
            <div className="hpic">
              <span className="inc">Included</span>
              <div className="hmock">
                <div className="hrow"><span>Booking & Scheduling</span><b>Active Sync</b></div>
                <div className="hrow"><span>POS & Payments</span><b>Active Sync</b></div>
                <div className="hrow"><span>Customer CRM</span><b>Active Sync</b></div>
              </div>
            </div>
            <h3>Connects with your CRM & tools</h3>
            <p>Connects smoothly to the tools you already use, no extra work.</p>
          </article>

          <article className="hcard">
            <div className="hpic">
              <span className="inc">Included</span>
              <img src="/img/feature-unlimited-staff-members.webp" alt="Unlimited staff members" loading="lazy" decoding="async" />
            </div>
            <h3>Unlimited staff members</h3>
            <p>Add your whole team with granular controls, at zero extra cost.</p>
          </article>

          <article className="hcard">
            <div className="hpic">
              <span className="inc">Included</span>
              <div className="hmock">
                <div className="hwho">
                  <i>CS</i>
                  <div><b>Client Success Lead</b><small>Dedicated support for your team</small></div>
                </div>
                <div className="hbtns"><span>Chat</span><span>Direct Call</span></div>
              </div>
            </div>
            <h3>Dedicated account manager & support</h3>
            <p>A real person to answer your questions whenever you have them.</p>
          </article>
        </div>

        <div className="sec-cta">
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => onOpenBookingModal?.()}
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
}
