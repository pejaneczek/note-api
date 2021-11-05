'use strict'

const app = require('../server');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Ping', () => {
    it('should properly return pong response', (done) => {
        chai.request(app)
            .get('/api/v1/ping')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.pong.should.be.eql(true);

                done();
            });
    });
});
