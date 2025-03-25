
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Define the price ID in one place for easy updating
const SUBSCRIPTION_PRICE_ID = 'price_1QmYX6K7m2MDc0OMpfusoM5H';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

  // Check for required environment variables
  if (!supabaseUrl || !supabaseAnonKey || !stripeSecretKey) {
    console.error('Missing required environment variables');
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }

  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Validate authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError) throw authError;
    
    const user = data.user;
    const email = user?.email;

    if (!email) {
      throw new Error('No email found for user');
    }

    console.log(`Creating checkout session for user: ${email}`);

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    let customer_id = undefined;
    
    if (customers.data.length > 0) {
      customer_id = customers.data[0].id;
      console.log(`Found existing customer: ${customer_id}`);
      
      // Check for active subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customer_id,
        status: 'active',
        limit: 1
      });

      if (subscriptions.data.length > 0) {
        console.log(`Customer already has an active subscription`);
        return new Response(
          JSON.stringify({ error: "You already have an active subscription" }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }
    } else {
      console.log(`No existing customer found for email: ${email}`);
    }

    // Get the origin for success/cancel URLs
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    
    console.log(`Creating payment session...`);
    const session = await stripe.checkout.sessions.create({
      customer: customer_id,
      customer_email: customer_id ? undefined : email,
      line_items: [
        {
          price: SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/dashboard?payment=success`,
      cancel_url: `${origin}/dashboard?payment=cancelled`,
    });

    console.log(`Payment session created: ${session.id}`);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.status || 500,
      }
    )
  }
})
