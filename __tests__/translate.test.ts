import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks, { MockResponse } from 'node-mocks-http';

import translate from '../src/pages/api/translate'; // Import the API route directly

describe('Translate API', () => {
  it('should return 405 for non-POST methods', async () => {
    const req = {
      method: 'GET',
      body: {},
    } as NextApiRequest;
    const res: MockResponse<any> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await translate(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });

  it('should return 400 for POST requests without a message', async () => {
    const req = {
      method: 'POST',
      body: {},
    } as NextApiRequest;
    const res: MockResponse<any> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await translate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid message' });
  });

  it('should return 200 for valid POST requests', async () => {
    const req: NextApiRequest = {
      method: 'POST',
      body: { message: 'Hello' },
    } as NextApiRequest;
    const res: MockResponse<any> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await translate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
