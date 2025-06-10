
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the Authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Return the API keys (these are set as environment variables in Supabase)
    const secrets = {
      OPENAI_API_KEY: Deno.env.get('OPENAI_API_KEY'),
      TMDB_API_KEY: Deno.env.get('TMDB_API_KEY'),
      TMDB_READ_ACCESS_TOKEN: Deno.env.get('TMDB_READ_ACCESS_TOKEN'),
      OPENAI_BASE_URL: Deno.env.get('OPENAI_BASE_URL')
    }

    return new Response(
      JSON.stringify(secrets),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
