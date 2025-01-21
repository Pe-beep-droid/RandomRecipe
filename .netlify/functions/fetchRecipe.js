// netlify/functions/fetchRecipe.js
const fetch = require('node-fetch'); // Netlify supports fetch for serverless functions

exports.handler = async (event, context) => {
  const apiKey = process.env.API_KEY; // Get API Key from environment variables set in Netlify
  const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipe = data.recipes[0];

    return {
      statusCode: 200,
      body: JSON.stringify(recipe) // Return recipe details to the frontend
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to fetch recipe' })
    };
  }
};

