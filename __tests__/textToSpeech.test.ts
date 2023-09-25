import textToSpeech from '../src/pages/api/textToSpeech';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, MockResponse } from 'node-mocks-http';


describe('POST /api/textToSpeech', () => {
  it('should return 400 if text is not a string', async () => {
    const { req, res }: { req: NextApiRequest, res: MockResponse<any> } = createMocks({
      method: 'POST',
      body: { text: 123 },
    });

    await textToSpeech(req, res);

    expect(res.statusCode).toEqual(400);
    if (res._getData()) {
      expect(JSON.parse(res._getData())).toHaveProperty('error', 'Invalid message');
    } else {
      throw new Error('Response body is undefined');
    }
  });

  it('should return 200 and audio/mpeg content type if text to speech conversion is successful', async () => {


    // Mock the textToSpeech function to return a stream
    jest.mock('../src/pages/api/textToSpeech', () => {
      const { Readable } = require('stream');
      const mockStream = new Readable();
      mockStream.push('mock data');
      mockStream.push(null);
      return {
        default: jest.fn().mockImplementation(() => mockStream),
      };
    });

    const { req, res }: { req: NextApiRequest, res: NextApiResponse } = createMocks({
      method: 'POST',
      body: { text: 'Hello' },
    });

    await textToSpeech(req, res);

    expect(res.statusCode).toEqual(200);
    expect(res.getHeaders()['content-type']).toEqual('audio/mpeg');
  });

});

