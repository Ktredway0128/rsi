const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const PDF_URL = 'https://refinedserviceinstitute.com/10-phrases-rsi.pdf'
const FROM = 'Kyle at RSI <noreply@refinedserviceinstitute.com>'
const REPLY_TO = 'hello@refinedserviceinstitute.com'

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let name, email
  try {
    ({ name, email } = JSON.parse(event.body))
  } catch {
    return { statusCode: 400, body: 'Invalid request' }
  }

  if (!name || !email) {
    return { statusCode: 400, body: 'Name and email required' }
  }

  const firstName = name.trim().split(' ')[0]

  try {
    // Email 1 — immediate: the guide
    await resend.emails.send({
      from: FROM,
      reply_to: REPLY_TO,
      to: email,
      subject: `Your RSI language guide is here, ${firstName}`,
      html: `
        <div style="background:#0A0A0A;color:#F5F2EC;font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:48px 40px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#B8960C;font-family:Arial,sans-serif;margin:0 0 24px;">Refined Service Institute</p>

          <h1 style="font-size:28px;font-weight:400;color:#F5F2EC;margin:0 0 24px;line-height:1.3;">
            Here's your language guide, ${firstName}.
          </h1>

          <div style="width:40px;height:1px;background:#B8960C;margin:0 0 24px;"></div>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            The PDF is ready. Ten phrases, ten replacements, and the reason behind each one. Print it, post it in the back, or share it with your team before the next shift.
          </p>

          <a href="${PDF_URL}" style="display:inline-block;background:#B8960C;color:#000000;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;padding:14px 32px;margin:8px 0 28px;">
            Download the Guide
          </a>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            If language is where service starts, training is where it's built. I'll follow up in a couple days with more on what RSI actually teaches, and how properties are using it.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 8px;">
            Talk soon,
          </p>
          <p style="font-size:15px;color:#F5F2EC;font-family:Arial,sans-serif;margin:0 0 40px;">
            Kyle Tredway<br>
            <span style="color:#6B6B6B;font-size:13px;">Founder, Refined Service Institute</span>
          </p>

          <div style="border-top:1px solid #1A1A1A;padding-top:24px;">
            <p style="font-size:11px;color:#444;font-family:Arial,sans-serif;margin:0;">
              Refined Service Institute &nbsp;·&nbsp; refinedserviceinstitute.com<br>
              <a href="mailto:hello@refinedserviceinstitute.com" style="color:#444;text-decoration:none;">hello@refinedserviceinstitute.com</a>
              &nbsp;·&nbsp;
              <a href="https://refinedserviceinstitute.com/unsubscribe" style="color:#444;text-decoration:none;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    })

    // Email 2 — scheduled 2 days later: what RSI teaches + calculator
    await resend.emails.send({
      from: FROM,
      reply_to: REPLY_TO,
      to: email,
      subject: `What RSI actually teaches (and what it costs you not to)`,
      scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      html: `
        <div style="background:#0A0A0A;color:#F5F2EC;font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:48px 40px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#B8960C;font-family:Arial,sans-serif;margin:0 0 24px;">Refined Service Institute</p>

          <h1 style="font-size:28px;font-weight:400;color:#F5F2EC;margin:0 0 24px;line-height:1.3;">
            What does undertrained staff actually cost you?
          </h1>

          <div style="width:40px;height:1px;background:#B8960C;margin:0 0 24px;"></div>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            RSI is a six-module online certification for front-of-house staff. Built from 20 years in fine dining, from casual upscale to Michelin-recognized properties.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            The six modules cover:
          </p>

          <div style="border-left:2px solid #B8960C;padding-left:20px;margin:0 0 24px;">
            <p style="font-size:14px;color:#9A9A9A;font-family:Arial,sans-serif;line-height:1.8;margin:0;">
              01 &nbsp; Foundation of Refined Service<br>
              02 &nbsp; Sequence &amp; Mechanics<br>
              03 &nbsp; Beverage Fundamentals<br>
              04 &nbsp; Pairing &amp; Suggestion<br>
              05 &nbsp; Tableside Beverage Service<br>
              06 &nbsp; The Guest Journey
            </p>
          </div>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            Servers complete it online in about three hours. Pass the 40-question exam and they earn a certificate, proof of completion for onboarding.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            For properties, the math is simple. Undertrained staff costs you in lost revenue, slow ramp-up, and high turnover. We built a calculator so you can see the actual number for your property.
          </p>

          <a href="https://refinedserviceinstitute.com/roi-calculator" style="display:inline-block;background:#B8960C;color:#000000;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;padding:14px 32px;margin:8px 0 28px;">
            Calculate Your ROI
          </a>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 8px;">
            Takes two minutes. The number might surprise you.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 8px;">
            Kyle
          </p>

          <div style="border-top:1px solid #1A1A1A;padding-top:24px;margin-top:40px;">
            <p style="font-size:11px;color:#444;font-family:Arial,sans-serif;margin:0;">
              Refined Service Institute &nbsp;·&nbsp; refinedserviceinstitute.com<br>
              <a href="mailto:hello@refinedserviceinstitute.com" style="color:#444;text-decoration:none;">hello@refinedserviceinstitute.com</a>
              &nbsp;·&nbsp;
              <a href="https://refinedserviceinstitute.com/unsubscribe" style="color:#444;text-decoration:none;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    })

    // Email 3 — scheduled 5 days later: the story + Michelin credibility
    await resend.emails.send({
      from: FROM,
      reply_to: REPLY_TO,
      to: email,
      subject: `Why I built RSI`,
      scheduled_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      html: `
        <div style="background:#0A0A0A;color:#F5F2EC;font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:48px 40px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#B8960C;font-family:Arial,sans-serif;margin:0 0 24px;">Refined Service Institute</p>

          <h1 style="font-size:28px;font-weight:400;color:#F5F2EC;margin:0 0 24px;line-height:1.3;">
            The standard exists. Most properties just aren't teaching it.
          </h1>

          <div style="width:40px;height:1px;background:#B8960C;margin:0 0 24px;"></div>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            I've spent 20 years in fine dining, from casual upscale to the highest levels of American fine dining. I'm a certified sommelier and currently on the floor at Cafe Monarch and Reserve in Scottsdale, a Michelin Guide recognized property.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            I built RSI because I kept seeing the same thing: servers who wanted to do the job well but had never been taught the fundamentals. Not restaurant-specific training, the actual foundation. Language, posture, sequencing, beverage knowledge, how to read a table.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            Every new hire a property onboards without that foundation costs time, revenue, and often, the hire itself.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 20px;">
            RSI gives servers that foundation before their first shift. Three hours online. A certificate they can carry. A team you don't have to rebuild from scratch every time someone new walks in.
          </p>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 24px;">
            If this sounds like something your property needs, I'd love to talk.
          </p>

          <a href="https://refinedserviceinstitute.com/pricing" style="display:inline-block;background:#B8960C;color:#000000;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;padding:14px 32px;margin:8px 0 28px;">
            See Pricing
          </a>

          <p style="font-size:15px;color:#9A9A9A;line-height:1.7;font-family:Arial,sans-serif;margin:0 0 8px;">
            Kyle Tredway<br>
            <span style="color:#6B6B6B;font-size:13px;">Founder, Refined Service Institute<br>Certified Sommelier</span>
          </p>

          <div style="border-top:1px solid #1A1A1A;padding-top:24px;margin-top:40px;">
            <p style="font-size:11px;color:#444;font-family:Arial,sans-serif;margin:0;">
              Refined Service Institute &nbsp;·&nbsp; refinedserviceinstitute.com<br>
              <a href="mailto:hello@refinedserviceinstitute.com" style="color:#444;text-decoration:none;">hello@refinedserviceinstitute.com</a>
              &nbsp;·&nbsp;
              <a href="https://refinedserviceinstitute.com/unsubscribe" style="color:#444;text-decoration:none;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    console.error('Resend error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    }
  }
}