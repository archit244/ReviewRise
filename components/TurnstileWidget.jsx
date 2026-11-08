'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

/**
 * Cloudflare Turnstile Client Widget
 * Renders the official Managed Turnstile challenge.
 */
const TurnstileWidget = forwardRef(function TurnstileWidget(
  {
    siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    action = 'booking_submission',
    theme = 'light',
    onVerify,
    onError,
    onExpire
  },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const activeSiteKey = siteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAF4_v12kpf1bmTJ2';

  const callbacksRef = useRef({ onVerify, onError, onExpire });
  useEffect(() => {
    callbacksRef.current = { onVerify, onError, onExpire };
  }, [onVerify, onError, onExpire]);

  // Expose imperative handle for manual reset and removal
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && typeof window !== 'undefined' && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          setErrorMessage('');
        } catch (e) {
          console.warn('[Turnstile reset error]', e);
        }
      }
    },
    remove: () => {
      if (widgetIdRef.current !== null && typeof window !== 'undefined' && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    }
  }));

  // 1. Ensure Cloudflare Turnstile script is loaded
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.turnstile) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const checkInterval = setInterval(() => {
      if (window.turnstile) {
        setIsLoaded(true);
        clearInterval(checkInterval);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
      if (!window.turnstile) {
        console.warn('[Turnstile] Script load timed out.');
      }
    }, 8000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  // 2. Render widget when container and turnstile script are ready
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !activeSiteKey || typeof window === 'undefined' || !window.turnstile) {
      return;
    }

    // Clean up previous widget if already rendered
    if (widgetIdRef.current !== null) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch (e) {}
      widgetIdRef.current = null;
    }

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: activeSiteKey,
        action: action,
        theme: theme,
        retry: 'auto',
        'refresh-expired': 'auto',
        callback: (token) => {
          setErrorMessage('');
          callbacksRef.current.onVerify?.(token);
        },
        'error-callback': (code) => {
          console.warn('[Turnstile error-callback]', code);
          setErrorMessage('Verification challenge could not be completed. Please try again.');
          callbacksRef.current.onError?.(code);
        },
        'expired-callback': () => {
          setErrorMessage('Verification expired. Please verify again.');
          callbacksRef.current.onExpire?.();
          if (widgetIdRef.current !== null && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        }
      });

      widgetIdRef.current = widgetId;
    } catch (err) {
      console.error('[Turnstile render error]', err);
      setErrorMessage('Security challenge initialization failed. Please reload.');
      callbacksRef.current.onError?.(err);
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [isLoaded, activeSiteKey, action, theme]);

  return (
    <div className="m-turnstile-wrapper">
      <div
        ref={containerRef}
        className="m-turnstile-widget"
        style={{ minHeight: '65px', display: 'flex', justifyContent: 'center' }}
      />
      {errorMessage && (
        <div className="m-turnstile-error-text" style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem', textAlign: 'center' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
});

export default TurnstileWidget;
