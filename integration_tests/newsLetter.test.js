import request from 'supertest';
import NewsLetter from '../src/models/newsLetterModel';
import app from '../src/app';
import {
  mockData,
  mockResponseData
} from './newsLetterServiceData';

describe('API TESTS - Save subscribed email address newsletter - /api/newsletter', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Save email address', done => {

    NewsLetter.findOne = jest.fn().mockReturnValue(null);
    jest.spyOn(NewsLetter.prototype, 'save').mockReturnValueOnce(mockResponseData);
    request(app)
      .post('/api/newsletter')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        ...mockData
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).toEqual(mockResponseData._id);
        expect(res.body.email).toEqual(mockResponseData.email);
        return done();
      });
  });
});
