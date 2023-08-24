import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import { Blob } from 'node-fetch';

// Convert blob to stream
const blobToStream = async (blob: Blob): Promise<Readable> => {
    const readable = new Readable();
    readable._read = () => {}; // _read is required but you can noop it
    const buffer = Buffer.from(await blob.arrayBuffer());
    readable.push(buffer);
    readable.push(null);
    return readable;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Handle the POST request
    const { text } = req.body;

    if (typeof text !== 'string') {
        res.status(400).json({ error: 'Invalid message' });
        return;
      }

    const textToSpeech = async (text: string) => {
    const url = 'https://api.elevenlabs.io/v1/text-to-speech/' + process.env.ELEVEN_LABS_VOICE_ID + '/stream';
    const options = {
        method: 'POST',
        headers: {
          'accept': 'audio/mpeg',
          'xi-api-key': process.env.ELEVEN_LABS_API_KEY || '',
          'Content-Type': 'application/json'
        },
        // Request body
        body: JSON.stringify({
          "text": text,
          "model_id": "eleven_multilingual_v2",
          "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
          }
        })
      };
      try {
        // Fetching response from API
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parsing response data
        const data = await response.blob();
        return data;
  
  
      } catch (error) {
        if (error instanceof Error) {
          console.log('There was a problem with the fetch operation: ' + error.message);
        }
      }

    }

    const textToSpeechBlob = await textToSpeech(text);
    if (!textToSpeechBlob) {
        res.status(500).json({ error: 'Failed to convert text to speech' });
        return;
      }

      
      const stream = await blobToStream(textToSpeechBlob);
    res.status(200);
      res.setHeader('Content-Type', 'audio/mpeg');
      stream.pipe(res);
   
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
