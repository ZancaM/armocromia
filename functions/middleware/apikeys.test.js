const API = require('./apikeys');
const key = require('./superKey.json')

describe('Authorization middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = {}
    mockRequest.header = jest.fn(text => 'test')
    mockResponse = {
      json: jest.fn()
    };
  });


  test('with key', async () => {
    mockRequest = {
      ...mockRequest,
      headers: {
        'x-api-key': key.key
      }
    }
    API.validateKey(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});
