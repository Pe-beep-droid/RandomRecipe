exports.handler = async (event, context) => {
  const { default: fetch } = await import('node-fetch'); // Dynamic import of node-fetch

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API Key not configured' }),
    };
  }

  const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      headers: { 'Cache-Control': 'no-cache' },
    });

    if (!response.ok) {
      throw new Error(`Error fetching recipe: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.recipes || data.recipes.length === 0) {
      throw new Error('No recipes found');
    }

    const recipe = data.recipes[0];

    return {
      statusCode: 200,
      body: JSON.stringify(recipe), // Return recipe details to the frontend
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
