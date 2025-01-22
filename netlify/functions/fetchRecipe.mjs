const fetch = require('node-fetch'); // Netlify supports fetch for serverless functions

exports.handler = async (event, context) => {
  /*const apiKey = process.env.API_KEY;*/
  const apiKey = 'b8c2fd349b4046c59542458ddaeda934'
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API Key not configured' })
    };
  }

  const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      headers: { 'Cache-Control': 'no-cache' }
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
      body: JSON.stringify(recipe) // Return recipe details to the frontend
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
