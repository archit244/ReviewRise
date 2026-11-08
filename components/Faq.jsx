'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    q: 'How does ReviewRise get me more Google reviews?',
    a: 'Most businesses only ask customers occasionally, and customers often forget. ReviewRise automatically sends a friendly, personalized text message with a direct link right after service. Because it is effortless for the customer and sent at peak satisfaction, review completion rates jump dramatically without you lifting a finger.'
  },
  {
    q: 'Is ReviewRise a software tool or a managed service?',
    a: 'It is the best of both worlds. You get enterprise-grade review automation and local ranking software, paired with a dedicated account manager who sets it up, manages it, and monitors your progress. There is zero learning curve and no software for you or your staff to manage.'
  },
  {
    q: 'Do Google reviews really improve my local Google Maps ranking?',
    a: 'Absolutely. Google’s official local search algorithm directly factors in review volume, average rating score, and how recently reviews were posted. Active, highly-rated profiles receive greater prominence, pushing your business into the top 3 Maps positions where majority of local searchers click and call.'
  },
  {
    q: 'How many reviews does my business need to rank #1?',
    a: 'It depends on your local market competitors, but consistency matters more than raw volume. Google favors profiles that receive a regular stream of fresh reviews over those with sporadic bursts. Our automated engine keeps new reviews coming in weekly so you steadily overtake competitors.'
  },
  {
    q: 'Is automating review requests allowed by Google?',
    a: 'Yes, 100%. Google encourages businesses to request authentic reviews from real customers. ReviewRise strictly adheres to Google’s Terms of Service: every real customer has the opportunity to review, with no fake reviews, no incentivized ratings, and no review gating.'
  },
  {
    q: 'How quickly will I start seeing new reviews?',
    a: 'Typically within 24 to 48 hours of your setup call. As soon as your first daily batch of personal requests goes out, customers begin clicking the link and publishing verified 5-star reviews directly onto your Google profile.'
  },
  {
    q: 'What happens during the 15-minute setup call?',
    a: 'We do all the heavy lifting together: we connect to your CRM or upload your recent customer list, customize your SMS templates and photo signs, and verify your Google Business Profile. By the time we hang up, your review engine is fully live and running.'
  },
  {
    q: 'Can I manage and view things myself if I want to?',
    a: 'Yes. You have full access to a real-time dashboard showing your review velocity, response stats, and Google Maps rankings whenever you want to check in. Or you can sit back and let our team handle everything completely hands-off.'
  },
  {
    q: 'How does ReviewRise protect against negative reviews?',
    a: 'By asking every customer automatically, you activate the silent majority of happy clients who would otherwise never leave a review. This steady influx of genuine 5-star reviews elevates your overall score and naturally protects your profile from occasional unfair feedback.'
  },
  {
    q: 'Will I have direct human support?',
    a: 'Yes. You get a dedicated account manager assigned to your business on day one. You can call, text, or email them directly whenever you have questions or want to update your messaging.'
  },
  {
    q: 'How much does ReviewRise cost?',
    a: 'We believe in straightforward, transparent pricing with no hidden fees and no long-term contracts. Every plan includes all features, custom integrations, and dedicated account support. We set it up in 15 minutes on a quick onboarding call and it runs on its own.'
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq home sheet" id="faq">
      <div className="wrap faq-in">
        <div>
          <h2 className="h-64">Questions, Answered.</h2>
          <p>Everything you need to know about getting consistent Google reviews and ranking #1.</p>
        </div>

        <div>
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <details
                key={idx}
                className={isOpen ? 'on' : ''}
                open={isOpen}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(idx);
                  }}
                >
                  {item.q}
                </summary>
                <div className="faq-a">
                  <div>
                    <p className="rich">{item.a}</p>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
