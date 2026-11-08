import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { verifyTurnstileToken } from '../../../lib/turnstile';

// Maximum allowed payload size: 32 Kilobytes (DoS mitigation)
const MAX_BODY_BYTES = 32 * 1024;

/**
 * Resolves client IP address for Cloudflare Turnstile verification context.
 */
function getClientIp(request) {
  if (!request || !request.headers) return undefined;
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
  if (vercelForwardedFor) return vercelForwardedFor.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  return undefined;
}

export async function POST(request) {
  // 1. Guard against oversized request bodies
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Request payload exceeds the maximum permitted size (32KB).' },
      { status: 413 }
    );
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch (readErr) {
    console.error('[Booking API Read Error]', readErr);
    return NextResponse.json(
      { success: false, error: 'Unable to read request payload.' },
      { status: 400 }
    );
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Request payload exceeds the maximum permitted size (32KB).' },
      { status: 413 }
    );
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch (jsonErr) {
    return NextResponse.json(
      { success: false, error: 'Malformed JSON payload.' },
      { status: 400 }
    );
  }

  try {
    const {
      bizName,
      fullName,
      email,
      phone,
      customerSystem,
      photoReady,
      preferredContact,
      contactDetails,
      bookingDate,
      bookingTime,
      termsAccepted,
      turnstileToken
    } = body;

    // 2. Mandatory Cloudflare Turnstile Server-Side Verification (Fail-Closed)
    const clientIp = getClientIp(request);
    const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIp);

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: turnstileResult.error || 'Security verification failed. Please complete the challenge.'
        },
        { status: 403 }
      );
    }

    // 3. Input Type Guards and Character Length Limits
    // Business name: 100 characters
    // Full name: 100 characters
    // Email: 254 characters
    // Phone: 30 characters
    // Customer system: 100 characters
    // Contact details: 500 characters
    // Booking date: 50 characters
    // Booking time: 50 characters
    if (
      typeof bizName !== 'string' || bizName.trim().length === 0 || bizName.trim().length > 100 ||
      typeof fullName !== 'string' || fullName.trim().length === 0 || fullName.trim().length > 100 ||
      typeof email !== 'string' || email.trim().length === 0 || email.trim().length > 254 ||
      typeof phone !== 'string' || phone.trim().length === 0 || phone.trim().length > 30 ||
      (customerSystem !== undefined && (typeof customerSystem !== 'string' || customerSystem.trim().length > 100)) ||
      (contactDetails !== undefined && contactDetails !== null && (typeof contactDetails !== 'string' || contactDetails.trim().length > 500)) ||
      (bookingDate !== undefined && bookingDate !== null && (typeof bookingDate !== 'string' || bookingDate.trim().length > 50)) ||
      (bookingTime !== undefined && bookingTime !== null && (typeof bookingTime !== 'string' || bookingTime.trim().length > 50)) ||
      (photoReady !== undefined && photoReady !== null && (typeof photoReady !== 'string' || photoReady.trim().length > 50)) ||
      (preferredContact !== undefined && preferredContact !== null && (typeof preferredContact !== 'string' || preferredContact.trim().length > 50))
    ) {
      return NextResponse.json(
        { success: false, error: 'One or more input fields exceed the maximum allowed length or have invalid data types.' },
        { status: 400 }
      );
    }

    // Customer management system is mandatory
    const cleanCustomerSystem = (customerSystem || '').trim();
    if (!cleanCustomerSystem || cleanCustomerSystem.toLowerCase() === 'not specified') {
      return NextResponse.json(
        { success: false, error: 'Please specify your customer management system.' },
        { status: 400 }
      );
    }

    // Strict RFC email validation without consecutive dots
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (cleanEmail.includes('..') || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid work email address.' },
        { status: 400 }
      );
    }

    // Phone digits restriction (at least 10 valid digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number with at least 10 digits.' },
        { status: 400 }
      );
    }

    // Terms and conditions acceptance
    if (termsAccepted !== true) {
      return NextResponse.json(
        { success: false, error: 'You must accept the terms and privacy policy to continue.' },
        { status: 400 }
      );
    }

    const cleanBizName = bizName.trim();
    const cleanFullName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanPhotoReady = photoReady ? photoReady.trim() : "Yes, I'll have it ready";
    const cleanContactDetails = contactDetails ? contactDetails.trim() : '';

    const bookingDateStr = (bookingDate && bookingDate.trim())
      ? bookingDate.trim().slice(0, 50)
      : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const contactMethodStr = (preferredContact && preferredContact.trim())
      ? `Preferred: ${preferredContact.trim()}${cleanContactDetails ? ` (${cleanContactDetails})` : ''}`.slice(0, 50)
      : (bookingTime ? bookingTime.trim().slice(0, 50) : 'SMS');

    // 4. Persistence to Supabase
    if (!supabase) {
      console.warn('[ReviewRise Supabase] Running in demo mode without Supabase connection.');
      return NextResponse.json({
        success: true,
        demo: true,
        message: 'Booking saved in demo mode.'
      });
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          biz_name: cleanBizName,
          full_name: cleanFullName,
          email: cleanEmail,
          phone: cleanPhone,
          customer_system: cleanCustomerSystem,
          photo_ready: cleanPhotoReady,
          booking_date: bookingDateStr,
          booking_time: contactMethodStr,
          terms_accepted: true,
          status: 'confirmed'
        }
      ])
      .select('id');

    if (error) {
      // Detailed error logged securely on the server ONLY
      console.error('[ReviewRise Supabase Insert Error]', error);

      // Return safe generic message to client without exposing database or RLS details
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to process your booking request at this time. Please try again later.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bookingId: data?.[0]?.id || null
    });
  } catch (err) {
    // Detailed exception logged securely on the server ONLY
    console.error('[ReviewRise Booking Route Exception]', err);

    // Return generic user-facing error message with no stack traces or internal details
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}
