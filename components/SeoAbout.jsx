'use client';
import React from 'react';

export default function SeoAbout() {
  return (
    <section className="seo sheet" id="about">
      <div className="wrap">
        <h2 className="h-64">More Google Reviews. <br />Higher Local Rankings. Zero Extra Work.</h2>
        <p className="seo-lead">
          ReviewRise turns your everyday customer visits into a continuous stream of authentic 5-star Google reviews. We set it up once and manage the entire system for you — sending personal SMS requests, responding to reviews in your voice, and monitoring your local Maps rank — so you win more customers on autopilot.
        </p>

        <div className="seo-grid">
          <div>
            <h3>Automated Personal Outreach</h3>
            <p className="rich">
              Every customer receives a friendly, personalized text message with a direct 1-tap link to your Google review page. Because requests are automated and sent at the exact right moment, happy customers actually take 30 seconds to leave a review. Requests go out in steady daily batches, ensuring consistent review velocity that keeps your profile active.
            </p>
          </div>
          <div>
            <h3>Fully Managed Hands-Off Engine</h3>
            <p className="rich">
              No long setup, no complex workflows to configure, and zero busywork for your staff. On a single 15-minute onboarding call, we connect ReviewRise to your CRM, POS, or booking system. Your dedicated account manager takes care of all setup, message personalization, and ongoing performance so you never have to think about it.
            </p>
          </div>
          <div>
            <h3>Climb to the Top of Google Maps</h3>
            <p className="rich">
              Google's search algorithm directly prioritizes businesses that receive frequent, recent, and highly-rated reviews. Over 70% of local search clicks go to the top three Google Maps spots. By consistently generating verified customer reviews, you outrank local competitors and become the #1 choice when nearby customers search.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
