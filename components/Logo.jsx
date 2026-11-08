'use client';
import React from 'react';

/**
 * ReviewRise Stylish Text Logo
 * Pure stylish typography, no symbols or icons, in black font.
 */
export default function Logo({ inverted = false, className = '' }) {
  const textColor = inverted ? '#ffffff' : '#000000';

  return (
    <span
      className={`logo-text-only ${inverted ? 'white' : ''} ${className}`}
      style={{
        fontFamily: "var(--head, 'Inter Tight', sans-serif)",
        color: textColor,
        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      Review<strong style={{ fontWeight: 900, letterSpacing: '-0.065em', color: textColor }}>Rise</strong>
    </span>
  );
}
