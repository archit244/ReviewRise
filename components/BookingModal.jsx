'use client';

import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import TurnstileWidget from './TurnstileWidget';

export default function BookingModal({ isOpen, onClose, initialBizName = '' }) {
  // Steps:
  // 1: Contact Details
  // 2: What system do you use to manage your customers?
  // 3: Can you have this photo ready for your setup call?
  // 4: Preferred Contact Method (SMS, Email, WhatsApp, Other) + Terms Checklist
  // 5: Confirmation (You're All Set!)
  const [step, setStep] = useState(1);
  const otherInputRef = useRef(null);
  const turnstileRef = useRef(null);

  const [turnstileToken, setTurnstileToken] = useState('');

  const [formData, setFormData] = useState({
    bizName: '',
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    customerSystem: '',
    photoReady: 'ready', // 'ready' | 'no'
    preferredContact: 'SMS', // 'SMS' | 'Email' | 'WhatsApp' | 'Other'
    contactDetails: '',
    termsAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initialBizName) {
      setFormData(prev => ({ ...prev, bizName: initialBizName }));
    }
  }, [initialBizName]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setFormError('');
    setTurnstileToken('');
    if (turnstileRef.current) turnstileRef.current.reset();
    onClose();
  };

  // Validate Email
  const validateEmail = (email) => {
    const trimmed = (email || '').trim();
    if (!trimmed) return 'Please enter your work email.';
    if (trimmed.length < 5 || trimmed.length > 254) {
      return 'Please enter a valid email address.';
    }
    if (trimmed.includes('..')) {
      return 'Please enter a valid email address without consecutive dots.';
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address (e.g. name@company.com).';
    }
    return '';
  };

  // Validate Phone Number
  const validatePhone = (phone, countryCode) => {
    const raw = (phone || '').trim();
    if (!raw) return 'Please enter your phone number.';

    const digits = raw.replace(/\D/g, '');

    if (countryCode === '+1') {
      const usDigits = (digits.length === 11 && digits.startsWith('1')) ? digits.slice(1) : digits;
      if (usDigits.length !== 10) {
        return 'Please enter a valid 10-digit US phone number (e.g. 555-012-3456).';
      }
      if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(usDigits)) {
        return 'Please enter a valid US phone number with a valid area code.';
      }
      if (/^(\d)\1{9}$/.test(usDigits)) {
        return 'Please enter a valid phone number, not repeated digits.';
      }
    } else if (countryCode === '+91') {
      const inDigits = (digits.length === 11 && digits.startsWith('0')) ? digits.slice(1) : digits;
      if (inDigits.length !== 10) {
        return 'Please enter a valid 10-digit Indian mobile number.';
      }
      if (!/^[6-9]\d{9}$/.test(inDigits)) {
        return 'Indian mobile numbers must start with 6, 7, 8, or 9 (e.g. 98765 43210).';
      }
      if (/^(\d)\1{9}$/.test(inDigits)) {
        return 'Please enter a valid mobile number, not repeated digits.';
      }
    } else {
      if (digits.length < 7 || digits.length > 15) {
        return 'Please enter a valid phone number.';
      }
    }

    return '';
  };

  // Step 1: Contact Details
  const handleStep1Submit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.bizName.trim()) {
      setFormError('Please enter your business name.');
      return;
    }
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const emailErr = validateEmail(formData.email);
    if (emailErr) {
      setFormError(emailErr);
      return;
    }

    const phoneErr = validatePhone(formData.phone, formData.countryCode);
    if (phoneErr) {
      setFormError(phoneErr);
      return;
    }

    setStep(2);
  };

  // Step 2: Customer Management System (REQUIRED)
  const handleStep2Submit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.customerSystem.trim()) {
      setFormError('Please enter the system you use to manage your customers.');
      return;
    }

    setStep(3);
  };

  // Step 3: Photo Preparation
  const handleStep3Submit = () => {
    setFormError('');
    setStep(4);
  };

  // Final Submission to API / Supabase
  const handleConfirmCall = async () => {
    // Immediate lock against repeated clicks or duplicate triggers
    if (isSubmitting) return;

    setFormError('');

    if (!formData.termsAccepted) {
      setFormError('Please accept the Privacy Policy & Terms checklist to proceed.');
      return;
    }

    if (!turnstileToken) {
      setFormError('Please complete the security verification challenge.');
      return;
    }

    if (formData.preferredContact === 'Other' && !formData.contactDetails.trim()) {
      setFormError('Please specify your preferred contact method in the "Other" field.');
      return;
    }

    // Set submitting synchronously before any asynchronous fetch operations
    setIsSubmitting(true);

    const fullPhone = formData.phone.startsWith('+')
      ? formData.phone.trim()
      : `${formData.countryCode} ${formData.phone.trim()}`;

    const contactStr = `Preferred Contact: ${formData.preferredContact}${formData.contactDetails ? ` (${formData.contactDetails.trim()})` : ''}`;

    const payload = {
      bizName: formData.bizName,
      fullName: formData.fullName,
      email: formData.email,
      phone: fullPhone,
      customerSystem: formData.customerSystem || 'Not specified',
      photoReady: formData.photoReady === 'ready' ? "Yes, I'll have it ready" : "No",
      preferredContact: formData.preferredContact,
      contactDetails: formData.contactDetails.trim(),
      bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      bookingTime: contactStr,
      termsAccepted: true,
      turnstileToken: turnstileToken
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok && !result.success) {
        if (turnstileRef.current) turnstileRef.current.reset();
        setTurnstileToken('');
        throw new Error(result.error || 'Failed to confirm booking.');
      }

      setStep(5);
    } catch (err) {
      console.error('[Booking error]', err);
      if (turnstileRef.current) turnstileRef.current.reset();
      setTurnstileToken('');
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to determine active phase label in the stepper
  const getPhase = () => {
    if (step === 1) return 1;
    if (step === 2 || step === 3) return 2;
    if (step === 4) return 3;
    return 4;
  };

  const activePhase = getPhase();

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="modal-card"
        style={{
          background: '#ffffff',
          borderRadius: '1.75rem',
          boxShadow: '0 2rem 5rem rgba(0, 0, 0, 0.35)',
          maxWidth: '32rem',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <button
            className="modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            &times;
          </button>

          {/* Centered Brand Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.65rem' }}>
            <Logo />
          </div>

          {/* Stepper Phase Tracker: Contact -> Quick Q's -> Book Call */}
          <div className="m-stepper-track" aria-label="Booking steps">
            <div className={`m-stepper-item ${activePhase >= 1 ? 'active' : ''} ${activePhase > 1 ? 'completed' : ''}`}>
              <span className="m-stepper-dot"></span>
              <span className="m-stepper-title">Contact</span>
            </div>
            <div className={`m-stepper-line ${activePhase >= 2 ? 'filled' : ''}`}></div>
            <div className={`m-stepper-item ${activePhase >= 2 ? 'active' : ''} ${activePhase > 2 ? 'completed' : ''}`}>
              <span className="m-stepper-dot"></span>
              <span className="m-stepper-title">Quick Q&apos;s</span>
            </div>
            <div className={`m-stepper-line ${activePhase >= 3 ? 'filled' : ''}`}></div>
            <div className={`m-stepper-item ${activePhase >= 3 ? 'active' : ''} ${activePhase > 3 ? 'completed' : ''}`}>
              <span className="m-stepper-dot"></span>
              <span className="m-stepper-title">Book Call</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body" style={{ overflowY: 'auto' }}>
          {formError && (
            <div className="m-alert-error" role="alert">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{formError}</span>
            </div>
          )}

          {/* STEP 1: Contact Details */}
          {step === 1 && (
            <div className="m-step-view">
              <h3>Book Your 15-Minute Setup Call</h3>
              <p className="m-sub">See real review results before you pay a dime.</p>

              <form onSubmit={handleStep1Submit}>
                <div className="m-form-group">
                  <label htmlFor="mBizName">Business Name</label>
                  <input
                    type="text"
                    id="mBizName"
                    placeholder="e.g. Acme Dental"
                    value={formData.bizName}
                    onChange={(e) => setFormData({ ...formData, bizName: e.target.value })}
                    required
                  />
                </div>
                <div className="m-form-group">
                  <label htmlFor="mFullName">Your Name</label>
                  <input
                    type="text"
                    id="mFullName"
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="m-form-group">
                  <label htmlFor="mEmail">Work Email</label>
                  <input
                    type="email"
                    id="mEmail"
                    placeholder="sarah@acmedental.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="m-form-group">
                  <label htmlFor="mPhone">Phone Number</label>
                  <div className="m-phone-input-group">
                    <div className="m-country-select-wrap">
                      <select
                        id="mCountryCode"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        aria-label="Country calling code"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+91">🇮🇳 +91</option>
                      </select>
                      <svg className="m-country-chevron" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="mPhone"
                      placeholder={formData.countryCode === '+91' ? '98765 43210' : '(555) 000-0000'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-black m-continue-btn"
                >
                  Continue &rsaquo;
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Quick Q 1 (Customer Management System) */}
          {step === 2 && (
            <div className="m-step-view">
              <button
                type="button"
                className="m-back-btn"
                onClick={() => { setFormError(''); setStep(1); }}
              >
                &lsaquo; Back
              </button>

              <h3 className="m-question-title">
                What system do you use to manage your customers?
              </h3>

              <form onSubmit={handleStep2Submit}>
                <div className="m-form-group" style={{ marginTop: '1.25rem' }}>
                  <input
                    type="text"
                    id="mCustomerSystem"
                    className="m-large-input"
                    placeholder="CRM, booking system, or spreadsheet"
                    value={formData.customerSystem}
                    onChange={(e) => setFormData({ ...formData, customerSystem: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-black m-continue-btn"
                  style={{ marginTop: '1.5rem' }}
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: Quick Q 2 (Photo Preparation) */}
          {step === 3 && (
            <div className="m-step-view">
              <button
                type="button"
                className="m-back-btn"
                onClick={() => { setFormError(''); setStep(2); }}
              >
                &lsaquo; Back
              </button>

              <h3 className="m-question-title">
                Can you have this photo ready for your setup call?
              </h3>

              {/* Photo Showcase Cards: Replaced Saja image with image copy.png */}
              <div className="m-photo-grid">
                <div className="m-photo-card">
                  <img
                    src="/img/image-copy.png"
                    alt="Crew holding personalized review sign"
                    loading="lazy"
                  />
                </div>
                <div className="m-photo-card">
                  <img
                    src="/img/review-request-sign-charlotte-med-spa.webp"
                    alt="Clinic team holding personalized review board"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Green / Helpful Info Banner */}
              <div className="m-photo-banner">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.75 12h-1.5v-1.5h1.5V14zm0-3h-1.5V6h1.5v5z" fill="currentColor" />
                </svg>
                <span>Takes 30 seconds - just snap a picture on your phone holding a blank piece of paper or board</span>
              </div>

              {/* Two Option Selection Cards: "Yes, I'll have it ready" and "No" */}
              <div className="m-choice-grid">
                <button
                  type="button"
                  className={`m-choice-card ${formData.photoReady === 'ready' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, photoReady: 'ready' })}
                >
                  <span className="m-choice-title">Yes, I&apos;ll have it ready</span>
                  <span className="m-choice-radio">
                    {formData.photoReady === 'ready' && <span className="m-choice-radio-inner" />}
                  </span>
                </button>

                <button
                  type="button"
                  className={`m-choice-card ${formData.photoReady === 'no' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, photoReady: 'no' })}
                >
                  <span className="m-choice-title">No</span>
                  <span className="m-choice-radio">
                    {formData.photoReady === 'no' && <span className="m-choice-radio-inner" />}
                  </span>
                </button>
              </div>

              <button
                type="button"
                className="btn btn-black m-continue-btn"
                style={{ marginTop: '1.25rem' }}
                onClick={handleStep3Submit}
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 4: Preferred Contact Method (SMS, Email, WhatsApp, Other) + Terms Checklist */}
          {step === 4 && (
            <div className="m-step-view">
              <button
                type="button"
                className="m-back-btn"
                onClick={() => {
                  setFormError('');
                  setTurnstileToken('');
                  if (turnstileRef.current) turnstileRef.current.reset();
                  setStep(3);
                }}
              >
                &lsaquo; Back
              </button>

              <h3>What is your preferred contact method?</h3>
              <p className="m-sub">Choose how you&apos;d like us to reach out, then confirm your details.</p>

              {/* 4 Contact Choices: SMS, Email, WhatsApp, Other (Each on a separate line, NO emojis) */}
              <div className="m-contact-methods-list">
                {/* 1. SMS */}
                <div
                  className={`m-contact-method-card ${formData.preferredContact === 'SMS' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'SMS' }))}
                  role="button"
                  tabIndex={0}
                >
                  <div className="m-contact-method-radio">
                    {formData.preferredContact === 'SMS' && <div className="m-contact-method-radio-dot" />}
                  </div>
                  <span className="m-contact-method-title">SMS</span>
                </div>

                {/* 2. Email */}
                <div
                  className={`m-contact-method-card ${formData.preferredContact === 'Email' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'Email' }))}
                  role="button"
                  tabIndex={0}
                >
                  <div className="m-contact-method-radio">
                    {formData.preferredContact === 'Email' && <div className="m-contact-method-radio-dot" />}
                  </div>
                  <span className="m-contact-method-title">Email</span>
                </div>

                {/* 3. WhatsApp */}
                <div
                  className={`m-contact-method-card ${formData.preferredContact === 'WhatsApp' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'WhatsApp' }))}
                  role="button"
                  tabIndex={0}
                >
                  <div className="m-contact-method-radio">
                    {formData.preferredContact === 'WhatsApp' && <div className="m-contact-method-radio-dot" />}
                  </div>
                  <span className="m-contact-method-title">WhatsApp</span>
                </div>

                {/* 4. Other: Checklist & Input box both, with 'Other' as placeholder only */}
                <div
                  className={`m-contact-method-card ${formData.preferredContact === 'Other' ? 'selected' : ''}`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, preferredContact: 'Other' }));
                    if (otherInputRef.current) otherInputRef.current.focus();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="m-contact-method-radio">
                    {formData.preferredContact === 'Other' && <div className="m-contact-method-radio-dot" />}
                  </div>
                  <input
                    ref={otherInputRef}
                    type="text"
                    className="m-contact-other-input"
                    placeholder="Other"
                    value={formData.contactDetails}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        preferredContact: 'Other',
                        contactDetails: e.target.value
                      }));
                    }}
                    onFocus={() => {
                      setFormData(prev => ({ ...prev, preferredContact: 'Other' }));
                    }}
                  />
                </div>
              </div>

              {/* Turnstile Security Challenge */}
              <div
                className="m-turnstile-container-row"
                style={{
                  margin: '1rem 0 0.5rem 0',
                  display: 'flex',
                  justifyContent: 'center',
                  minHeight: '65px'
                }}
              >
                <TurnstileWidget
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAF4_v12kpf1bmTJ2'}
                  onVerify={(token) => {
                    setTurnstileToken(token);
                    setFormError('');
                  }}
                  onError={() => {
                    setTurnstileToken('');
                    setFormError('Security verification failed. Please try again.');
                  }}
                  onExpire={() => {
                    setTurnstileToken('');
                  }}
                />
              </div>

              {/* Terms Checklist: clean, not inside a box, links black */}
              <div className="m-terms-box">
                <label className="m-checkbox-label">
                  <input
                    type="checkbox"
                    id="mTermsCheck"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  />
                  <span className="m-checkbox-custom">
                    {formData.termsAccepted && (
                      <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                        <path d="M3 8.5l3.5 3.5 6.5-7" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="m-checkbox-text">
                    I accept the{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      Terms of Service
                    </a>
                    , and consent to receiving review setup details via email &amp; SMS.
                  </span>
                </label>
              </div>

              {/* Final Confirm Button (Black) */}
              <button
                type="button"
                className="btn btn-black m-submit-btn"
                disabled={isSubmitting || !turnstileToken}
                onClick={handleConfirmCall}
              >
                {isSubmitting ? 'Confirming setup call...' : 'Confirm 15-Minute Setup Call'}
              </button>
            </div>
          )}

          {/* STEP 5: Success State */}
          {step === 5 && (
            <div className="m-step-view">
              <div className="m-success">
                <div className="m-success-check">&#10003;</div>
                <h3>You&apos;re All Set!</h3>
                <p className="m-sub">
                  Your 15-minute setup request has been confirmed. We will reach out to you via {formData.preferredContact}.
                </p>

                <button
                  type="button"
                  className="btn btn-black"
                  style={{ width: '100%', height: '3.2rem', marginTop: '1.5rem', borderRadius: '0.875rem' }}
                  onClick={handleClose}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
