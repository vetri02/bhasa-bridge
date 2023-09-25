// src/pages/api/translate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { string } from 'prop-types';

// Main function to handle the API request and response
const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Extract the message from the request body
    const { message } = req.body;

    // Check if the message is a string
    if (typeof message !== 'string') {
      // If not, return an error
      res.status(400).json({ error: 'Invalid message' });
      return;
    }

    // Define the API route
    const translateApi = 'https://api-b2b.backenster.com/b1/api/v3/translate';

    // Function to call the API
    const translate = async (message: string) => {
      // Define the URL and options for the fetch request
      const url = translateApi;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: process.env.LINGVANEX_API_KEY || ''
        },
        // Define the body of the request
        body: JSON.stringify({
          platform: 'api',
          to: 'hi_IN',
          data: message,
          translateMode: 'html',
          enableTransliteration: true
        })
      };

      try {
        // Make the fetch request and parse the response
        const response = await fetch(url, options);
        const data = await response.json();
        // Return the result of the translation
        return data.result;
      } catch (error) {
        // Log any errors and rethrow them
        console.error('Failed to fetch from the API: ', error);
        throw error;
      }
    };

    // Call the translate function and send the result in the response
    const translatedText = await translate(message);
    res.status(200).json({ translatedText });
  }

  else {
    // If the request method is not POST, return an error
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handleRequest;