/**
 * Cloudflare Turnstile Server-Side Verification Utility
 * Reference: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verifies a Cloudflare Turnstile response token with Cloudflare's Siteverify API.
 * 
 * @param {string} token - The turnstile verification token from the client.
 * @param {string} [remoteIp] - Optional client IP address.
 * @returns {Promise<{ success: boolean, error?: string, errorCodes?: string[], hostname?: string, challengeTs?: string }>}
 */
export async function verifyTurnstileToken(token, remoteIp) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // 1. Fail closed if secret key is missing
  if (!secretKey || typeof secretKey !== 'string' || !secretKey.trim()) {
    console.error('[Turnstile Security Alert] TURNSTILE_SECRET_KEY is not configured in the server environment.');
    return {
      success: false,
      error: 'Security verification service is not properly configured. Please contact support.'
    };
  }

  // 2. Reject missing, empty, or non-string tokens immediately
  if (!token || typeof token !== 'string' || !token.trim()) {
    return {
      success: false,
      error: 'Missing security verification token. Please complete the verification challenge.'
    };
  }

  const trimmedToken = token.trim();

  // Basic sanity check on token length
  if (trimmedToken.length < 10 || trimmedToken.length > 4096) {
    return {
      success: false,
      error: 'Invalid security verification token format.'
    };
  }

  try {
    // 3. Submit verification request with a 10-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const formData = new URLSearchParams();
    formData.append('secret', secretKey.trim());
    formData.append('response', trimmedToken);
    if (remoteIp && typeof remoteIp === 'string' && remoteIp.trim()) {
      formData.append('remoteip', remoteIp.trim());
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData.toString(),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[Turnstile API Error] Cloudflare Siteverify returned HTTP ${response.status}`);
      return {
        success: false,
        error: 'Security verification service is temporarily unavailable. Please try again.'
      };
    }

    const data = await response.json();

    // 4. Validate Cloudflare outcome
    if (data && data.success === true) {
      return {
        success: true,
        hostname: data.hostname,
        challengeTs: data.challenge_ts,
        action: data.action
      };
    }

    // 5. Handle failed validation safely
    const errorCodes = Array.isArray(data['error-codes']) ? data['error-codes'] : [];
    console.warn('[Turnstile Verification Failed]', {
      errorCodes,
      hostname: data.hostname || 'unknown'
    });

    let friendlyMessage = 'Security verification failed. Please try again.';
    if (errorCodes.includes('timeout-or-duplicate')) {
      friendlyMessage = 'Security verification expired or was already used. Please complete the challenge again.';
    } else if (errorCodes.includes('invalid-input-response')) {
      friendlyMessage = 'Invalid security verification response. Please complete the challenge again.';
    }

    return {
      success: false,
      error: friendlyMessage,
      errorCodes
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[Turnstile Timeout] Siteverify request timed out after 10s.');
      return {
        success: false,
        error: 'Security verification timed out. Please check your connection and try again.'
      };
    }

    console.error('[Turnstile Unexpected Error]', err.message || err);
    return {
      success: false,
      error: 'Security verification could not be completed. Please try again.'
    };
  }
}

