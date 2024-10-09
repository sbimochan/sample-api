import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import bookshelf from '../../src/db';

/**
 * Tests for '/api/users'.
 */
describe('Users Controller Test', () => {
  before(done => {
    bookshelf
      .knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
      .then(() => done())
      .catch(err => done(err));
  });


  it('should return list of users', done => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.lengthOf(0);

        done();
      });
  });

  it('should not create a new user if username is not provided', done => {
    const user = {
      noname: 'Jane Doe'
    };
    const expectedErrors = [
      { message: '"Username" is required', param: 'username' },
      { message: '"Email" is required', param: 'email' },
      { message: '"Password" is required', param: 'password' },
      { message: '"noname" is not allowed', param: 'noname' }
    ];

    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        const { code, message, details } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expectedErrors.forEach(expectedError => {
          const error = details.find(detail => detail.param === expectedError.param);

          expect(error).to.deep.equal(expectedError);
        });

        expect(details).to.have.lengthOf(expectedErrors.length);
        done();
      });
  });

  it('should create a new user with valid data', done => {
    const user = {
      username: 'jane_doe',
      fullName: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'mySecretPassword'
    };

    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(201);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('username');
        expect(data).to.have.property('full_name');
        expect(data).to.have.property('email');
        expect(data).to.have.property('password');
        expect(data).to.have.property('is_admin');
        expect(data).to.have.property('created_at');
        expect(data).to.have.property('updated_at');
        expect(data.username).to.be.equal(user.username);
        expect(data.is_admin).to.be.equal(false);

        done();
      });
  });

  it('should get information of user', done => {
    request(app)
      .get('/api/users/1')
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('username');
        expect(data).to.have.property('fullName');
        expect(data).to.have.property('email');
        expect(data).to.have.property('password');
        expect(data).to.have.property('isAdmin');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');

        done();
      });
  });

  it('should respond with not found error if random user id is provided', done => {
    request(app)
      .get('/api/users/1991')
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal('User not found');

        done();
      });
  });

  it('should update a user if user info provided', done => {
    const user = {
      username: 'edited_doe',
      fullName: 'Edited John',
      email: 'jane@doe.com',
      password: 'mySecretPassword'
    };

    request(app)
      .put('/api/users/1')
      .send(user)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('full_name');
        expect(data).to.have.property('updated_at');
        expect(data.full_name).to.be.equal(user.fullName);

        done();
      });
  });

  it('should not update a user if name is not provided', done => {
    const user = {
      noname: 'John Doe'
    };

    request(app)
      .put('/api/users/1')
      .send(user)
      .end((err, res) => {
        const { code, message, details } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'username');

        done();
      });
  });

  it('should delete a user if valid id is provided', done => {
    request(app)
      .delete('/api/users/1')
      .end((err, res) => {
        expect(res.status).to.be.equal(204);

        done();
      });
  });

  it('should respond with not found error if random user id is provided for deletion', done => {
    request(app)
      .delete('/api/users/1991')
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal('User not found');

        done();
      });
  });

  it('should respond with bad request for empty JSON in request body', done => {
    const user = {};

    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Empty JSON');

        done();
      });
  });
});
