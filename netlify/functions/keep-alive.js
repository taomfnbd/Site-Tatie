exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Configuration Supabase manquante",
      }),
    };
  }

  const baseUrl = supabaseUrl.replace(/\/$/, "");
  const url = `${baseUrl}/rest/v1/pages?select=id&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Supabase keep-alive failed",
          details: errorText,
        }),
      };
    }

    const rows = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        rows: Array.isArray(rows) ? rows.length : 0,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Unexpected keep-alive error",
      }),
    };
  }
};
