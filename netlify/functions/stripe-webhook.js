import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'RSI'
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const sig = event.headers['stripe-signature']
  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_TEST || process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return { statusCode: 400, body: `Webhook Error: ${err.message}` }
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object
    const customerEmail = session.customer_details?.email || session.customer_email

    if (!customerEmail) {
      console.error('No customer email found')
      return { statusCode: 400, body: 'No customer email' }
    }

    // Generate unique access code
    let code = generateCode()
    let exists = true
    while (exists) {
      const { data } = await supabase.from('access_codes').select('code').eq('code', code).single()
      if (!data) exists = false
      else code = generateCode()
    }

    // Insert into Supabase
    const { error: insertError } = await supabase.from('access_codes').insert({
      code,
      max_uses: 10000,
      current_uses: 0,
      is_active: true,
      email: customerEmail,
    })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return { statusCode: 500, body: 'Database error' }
    }

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Refined Service Institute <noreply@refinedserviceinstitute.com>',
      to: customerEmail,
      subject: 'Your RSI Access Code',
      html: `
        <h2 style="font-family: Georgia, serif; color: #B8960C;">RSI</h2>
        <p style="font-family: Georgia, serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #B8960C;">Refined Service Institute</p>
        <hr style="border-color: #B8960C; opacity: 0.5; margin: 16px 0;" />
        <h3 style="font-family: Georgia, serif;">Welcome to RSI</h3>
        <p>Thank you for subscribing to the Refined Service Institute. Your property access code is below.</p>
        <p style="font-size: 24px; font-family: Georgia, serif; color: #B8960C; letter-spacing: 0.1em;"><strong>${code}</strong></p>
        <p>Share this code with your staff when they sign up at <a href="https://refinedserviceinstitute.com/login">refinedserviceinstitute.com</a>.</p>
        <hr style="border-color: #333; margin: 24px 0;" />
        <p style="font-size: 11px; color: #666; font-style: italic; font-family: Georgia, serif;">Restoring the standard of service.</p>
      `
    })

    if (emailError) {
      console.error('Resend email error:', emailError)
      return { statusCode: 500, body: 'Email error' }
    }

    console.log(`Access code ${code} created and sent to ${customerEmail}`)
    return { statusCode: 200, body: JSON.stringify({ success: true, code }) }
  }

  if (stripeEvent.type === 'customer.subscription.deleted') {
    const subscription = stripeEvent.data.object
    const customerId = subscription.customer

    const { data: customer } = await stripe.customers.retrieve(customerId)
    const customerEmail = customer.email

    if (customerEmail) {
      await supabase
        .from('access_codes')
        .update({ is_active: false })
        .eq('email', customerEmail)
      console.log(`Access code deactivated for ${customerEmail}`)
    }
  }

  return { statusCode: 200, body: 'Event received' }
}
