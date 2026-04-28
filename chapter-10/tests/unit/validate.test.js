const { z } = require('zod');
const { validate } = require('../../src/middlewares/validate');

const makeResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe('validate middleware', () => {
  test('passes sanitized data to the next middleware', () => {
    const schema = z.object({ title: z.string().min(1) });
    const req = { body: { title: 'Hello' } };
    const res = makeResponse();
    const next = jest.fn();

    validate(schema)(req, res, next);

    expect(req.body).toEqual({ title: 'Hello' });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('returns 400 when request body is invalid', () => {
    const schema = z.object({ title: z.string().min(1) });
    const req = { body: { title: '' } };
    const res = makeResponse();
    const next = jest.fn();

    validate(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String),
      errors: expect.any(Object),
    }));
    expect(next).not.toHaveBeenCalled();
  });
});

