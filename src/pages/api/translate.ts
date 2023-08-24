// src/pages/api/translate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { string } from 'prop-types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (typeof message !== 'string') {
      res.status(400).json({ error: 'Invalid message' });
      return;
    }

    // API routes
    const translateApi = 'https://api-b2b.backenster.com/b1/api/v3/translate';

    // API call
    const translate = async (message: string) => {
      const url = translateApi;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: process.env.LINGVANEX_API_KEY || ''
        },
        body: JSON.stringify({
          platform: 'api',
          to: 'hi_IN',
          data: message,
          translateMode: 'html',
          enableTransliteration: true
        })
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.result;
      } catch (error) {
        console.error('Failed to fetch from the API: ', error);
        throw error;
      }
    };

    const translatedText = await translate(message);
    res.status(200).json({ translatedText });
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}