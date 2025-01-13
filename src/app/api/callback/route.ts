// In-memory store for callback results
const callbackResults = new Map<string, any>();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const state = url.searchParams.get('state');

  if (!state) {
    return new Response('State parameter is required', { status: 400 });
  }

  if (!callbackResults.has(state)) {
    return new Response('Result not found for the provided state', { status: 404 });
  }

  const result = callbackResults.get(state);
  return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
  try {
    const textBody = await request.text(); // Read raw text body
    const formData = new URLSearchParams(textBody); // Decode form-urlencoded

    // Extract the `state` parameter
    const state = formData.get('state');
    if (!state) {
      return new Response('State parameter is required', { status: 400 });
    }

    // Convert the formData to a plain object
    const parsedData: Record<string, any> = {};
    for (const [key, value] of Array.from(formData.entries())) {
      if (key === 'vp_token' || key === 'presentation_submission') {
        try {
          // Attempt to parse JSON for complex fields
          parsedData[key] = JSON.parse(value);
        } catch {
          parsedData[key] = value; // Keep as string if not JSON
        }
      } else {
        parsedData[key] = value;
      }
    }

    // Store the result in the in-memory map
    callbackResults.set(state, parsedData);

    console.log(`Stored callback result for state: ${state}`, parsedData);

    return new Response('Callback result stored successfully', {
      headers: { 'content-type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
