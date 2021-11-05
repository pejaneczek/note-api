'use strict'

const app = require('../server');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Notes', () => {
    describe('Create', () => {
        it('should throw error 400 if note title is not passed', (done) => {
            chai.request(app)
                .post('/api/v1/notes')
                .send({ message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.code.should.be.eql(400);
                    res.body.message.should.be.eql('Title is required!');

                    done();
                });
        });

        it('should throw error if note message is not passed', (done) => {
            chai.request(app)
                .post('/api/v1/notes')
                .send({ title: 'test title' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.code.should.be.eql(400);
                    res.body.message.should.be.eql('Message is required!');

                    done();
                });
        });

        it('should properly create note', async () => {

        });
    });

    describe('List', () => {
        it('should return all notes', (done) => {
            const expectedData = {
                count: 2,
                results: [
                    { id: 0, title: 'Hello', message: 'World' },
                    { id: 1, title: 'Another', message: 'Note' }
                ]
            };

            chai.request(app)
                .get('/api/v1/notes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    // TODO

                    done();
                });
        });
    });

    describe('Update', () => {
        it('should throw error if note with passed id not exist', async () => {

        });

        it('should throw error if note title is not passed', (done) => {
            chai.request(app)
                .put('/api/v1/notes/1')
                .send({ message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.code.should.be.eql(400);
                    res.body.message.should.be.eql('Title is required!');

                    done();
                });
        });

        it('should throw error if note message is not passed', (done) => {
            chai.request(app)
                .put('/api/v1/notes/1')
                .send({ title: 'test title' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.code.should.be.eql(400);
                    res.body.message.should.be.eql('Message is required!');

                    done();
                });
        });

        it('should properly update note by id', async () => {

        });
    });

    describe('Delete', () => {
        it('should throw error if note with passed id not exist', async () => {

        });

        it('should properly delete note by id', async () => {

        });
    });
});