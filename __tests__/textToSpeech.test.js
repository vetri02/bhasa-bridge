import { createMocks } from 'node-mocks-http';
import nock from 'nock';
import fs from 'fs';

import textToSpeech from '../src/pages/api/textToSpeech';

describe('POST /api/textToSpeech', () => {
  it('should return 400 if text is not a string', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { text: 123 },
    });

    await textToSpeech(req, res);

    expect(res._getStatusCode()).toEqual(400);
    expect(JSON.parse(res._getData())).toHaveProperty('error', 'Invalid message');
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

    const { req, res } = createMocks({
      method: 'POST',
      body: { text: 'Hello' },
    });

    await textToSpeech(req, res);

    expect(res._getStatusCode()).toEqual(200);
    expect(res._getHeaders()['content-type']).toEqual('audio/mpeg');
  });

});