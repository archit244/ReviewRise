'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SayNote() {
  const pRef = useRef(null);
  const [upTo, setUpTo] = useState(0);

  const strongWords = ["Consistent", "reviews", "put", "you", "at", "the", "top", "of", "Google."];
  const bodyWords = ["You", "can", "go", "from", "invisible", "on", "Google", "to", "showing", "up", "higher"];
  const emWords = ["in", "just", "a", "few", "weeks."];
  const totalWords = [...strongWords, ...bodyWords, ...emWords];

  useEffect(() => {
    const handleScroll = () => {
      if (!pRef.current) return;
      const r = pRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.9 - r.top) / (vh * 0.45 + r.height * 0.3);
      const calculated = Math.round(Math.max(0, Math.min(1, p)) * totalWords.length);
      setUpTo(calculated);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalWords.length]);

  const strongCount = strongWords.length;
  const bodyCount = bodyWords.length;

  return (
    <section className="say dim">
      <p className="wrap" ref={pRef}>
        <strong>
          {strongWords.map((w, idx) => (
            <span key={`s-${idx}`} className={`w ${idx < upTo ? 'on' : ''}`}>
              {w}{' '}
            </span>
          ))}
        </strong>
        {bodyWords.map((w, idx) => (
          <span key={`b-${idx}`} className={`w ${(idx + strongCount) < upTo ? 'on' : ''}`}>
            {w}{' '}
          </span>
        ))}
        <em>
          {emWords.map((w, idx) => (
            <span key={`e-${idx}`} className={`w ${(idx + strongCount + bodyCount) < upTo ? 'on' : ''}`}>
              {w}{' '}
            </span>
          ))}
        </em>
      </p>
    </section>
  );
}
