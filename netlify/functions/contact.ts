import type { Handler, HandlerResponse } from '@netlify/functions';
import nodemailer from 'nodemailer';

// Rate limiting storage

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 3; 
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Suspicious content patterns
const SPAM_PATTERNS = [
  /viagra/gi,
  /cialis/gi,
  /casino/gi,
  /lottery/gi,
  /cryptocurrency/gi,
  /bitcoin/gi,
  /<script/gi,
  /javascript:/gi,
  /onclick/gi,
];

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // Add timeout and security options
  pool: true,
  maxConnections: 1,
  rateDelta: 20000,
  rateLimit: 5,
});

transporter.verify((error) => {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter ready');
  }
});

// Helper: Sanitize input
const sanitizeInput = (input: string, maxLength: number): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, maxLength);
};

// Helper: Check for spam patterns
const containsSpam = (text: string): boolean => {
  return SPAM_PATTERNS.some(pattern => pattern.test(text));
};

// Helper: Rate limiting check
const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }
  record.count++;
  return true;
};

// Helper: Clean up old rate limit entries (garbage collection)
const cleanupRateLimits = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
};

export const handler: Handler = async (event): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  // Get client identifier
  const clientIP = 
    event.headers['x-forwarded-for']?.split(',')[0] ||
    event.headers['x-nf-client-connection-ip'] ||
    'unknown';

  // Rate limiting check
  cleanupRateLimits(); // Clean old entries first
  if (!checkRateLimit(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return {
      statusCode: 429,
      body: JSON.stringify({ 
        error: 'Too many requests. Please try again later.' 
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Retry-After': '3600' // 1 hour
      }
    };
  }

  // Parse request body
  let data: { 
    name?: string; 
    email?: string; 
    message?: string; 
    botField?: string;
    timestamp?: number;
    userAgent?: string;
  };

  try {
    data = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON payload' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  const { name, email, message, botField, timestamp, userAgent } = data;
  if (botField) {
    console.warn('Honeypot triggered', { clientIP, userAgent });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  if (timestamp) {
    const submissionAge = Date.now() - timestamp;
    
    if (submissionAge > 60 * 60 * 1000) {
      console.warn('Stale submission detected', { clientIP, submissionAge });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request expired' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    
    const isProduction = process.env.CONTEXT === 'production'
    const minTime = isProduction ? 2000 : 0
    
    if (submissionAge < minTime) {
      console.warn('Too-fast submission detected', { clientIP, submissionAge });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please take a moment to fill out the form' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
  }
  const sanitizedName = sanitizeInput(name, 100);
  const sanitizedEmail = sanitizeInput(email, 255);
  const sanitizedMessage = sanitizeInput(message, 5000);

  if (sanitizedName.length < 2 || sanitizedName.length > 100) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name must be 2-100 characters' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Message must be 10-5000 characters' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  if (!EMAIL_REGEX.test(sanitizedEmail)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid email format' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  const fullText = `${sanitizedName} ${sanitizedEmail} ${sanitizedMessage}`;
  if (containsSpam(fullText)) {
    console.warn('Spam pattern detected', { clientIP, sanitizedEmail });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  if (!/[a-zA-Z]/.test(sanitizedName)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name must contain letters' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  const urlMatches = sanitizedMessage.match(/(https?:\/\/|www\.)/gi);
  if (urlMatches && urlMatches.length > 2) {
    console.warn('Too many URLs detected', { clientIP, urlCount: urlMatches.length });
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Message contains too many links' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    const htmlMessage = `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; border: 3px solid #FF0000; padding: 20px; background: #000; color: #fff;">
        <h2 style="color: #FF0000; text-transform: uppercase; letter-spacing: 2px;">New Portfolio Contact</h2>
        
        <div style="border: 2px solid #fff; padding: 15px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong style="color: #FF0000;">Name:</strong> ${sanitizedName}</p>
          <p style="margin: 5px 0;"><strong style="color: #FF0000;">Email:</strong> ${sanitizedEmail}</p>
        </div>
        
        <div style="border: 2px solid #fff; padding: 15px; margin: 20px 0;">
          <p style="margin: 5px 0; color: #FF0000; font-weight: bold;">MESSAGE:</p>
          <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedMessage}</p>
        </div>
        
        <div style="border-top: 2px solid #fff; padding-top: 15px; margin-top: 20px; font-size: 12px; opacity: 0.7;">
          <p style="margin: 5px 0;">Submitted: ${new Date().toISOString()}</p>
          <p style="margin: 5px 0;">IP: ${clientIP}</p>
          <p style="margin: 5px 0;">User Agent: ${userAgent || 'Unknown'}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`, 
      replyTo: sanitizedEmail, // Set user's email as reply-to
      to: process.env.MAIL_USER,
      subject: `[PORTFOLIO] Message from ${sanitizedName}`,
      text: `
      Name: ${sanitizedName}
      Email: ${sanitizedEmail}

      Message:
      ${sanitizedMessage}

      ---
      Submitted: ${new Date().toISOString()}
      IP: ${clientIP}
            `,
            html: htmlMessage,
          });

      console.log('Email sent successfully', { 
        from: sanitizedEmail, 
        clientIP,
        timestamp: new Date().toISOString()
      });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };

  } catch (err) {
    console.error('Email send error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send message. Please try again later.' 
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};