'use strict'

const app = require('../server');

const chai = require('chai');
const should = chai.should(); // jshint ignore:line
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Notes', () => {
    // before(() => {
    //     // TODO: clear DB
    // });

    // after(() => {
    //     // TODO: clear DB
    // });

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

        it('should throw error with unsapported format', (done) => {
            chai.request(app)
                .post('/api/v1/notes?format=text/html')
                .send({ title: 'test title', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.code.should.be.eql(400);
                    res.body.message.should.be.eql('Unsapported format');

                    done();
                });
        });

        it('should return created note in jsonp format', (done) => {
            const givenData = { title: 'test title', message: 'test message' };
            chai.request(app)
                .post('/api/v1/notes?format=jsonp')
                .send({ title: 'test title', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.title.should.be.eql(givenData.title);
                    res.body.message.should.be.eql(givenData.message);

                    done();
                });
        });

        it('should properly create note', (done) => {
            const givenData = { title: 'test title', message: 'test message' };
            chai.request(app)
                .post('/api/v1/notes')
                .send({ title: 'test title', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.title.should.be.eql(givenData.title);
                    res.body.message.should.be.eql(givenData.message);

                    done();
                });
        });
    });

    describe('List', () => {
        it('should throw error with unsapported format', (done) => {
            chai.request(app)
                .get('/api/v1/notes?format=text/html')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.code.should.be.eql(400);
                    res.body.message.should.be.eql('Unsapported format');

                    done();
                });
        });

        it('should return created note in jsonp format', (done) => {
            chai.request(app)
                .get('/api/v1/notes?format=jsonp')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    // TODO

                    done();
                });
        });

        it('should return notes with specific page', (done) => {
            const givenData = { title: 'test title', message: 'test message' };
            chai.request(app)
                .post('/api/v1/notes')
                .send({ title: 'test title', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.title.should.be.eql(givenData.title);
                    res.body.message.should.be.eql(givenData.message);
                    chai.request(app)
                        .get('/api/v1/notes?page=2&size=2')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.count.should.be.eql(2);
                            res.body.currentPage.should.be.eql(2);

                            // res.body.totalPages.should.to.exists; // TODO

                            done();
                        });
                });

        });

        it('should return all notes', (done) => {
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
        it('should throw error with unsapported format', (done) => {
            chai.request(app)
                .post('/api/v1/notes')
                .send({ title: 'test title', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(app)
                        .put(`/api/v1/notes/${res.body.id}?format=text/html`)
                        .send({ title: 'updated title', message: 'updated message' })
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.code.should.be.eql(400);
                            res.body.message.should.be.eql('Unsapported format');

                            done();
                        });
                });
        });

        it('should return updated note in jsonp format', (done) => {
            const givenData = { title: 'updated title', message: 'updated message' };
            chai.request(app)
                .post('/api/v1/notes')
                .send({ title: 'note to update', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(app)
                        .put(`/api/v1/notes/${res.body.id}/?format=jsonp`)
                        .send({ title: 'updated title', message: 'updated message' })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.title.should.be.eql(givenData.title);
                            res.body.message.should.be.eql(givenData.message);

                            done()
                        });
                });
        });

        it('should throw error if note with passed id not exist', (done) => {
            chai.request(app)
                .put('/api/v1/notes/1234')
                .send({ title: 'test title', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.code.should.be.eql(404);
                    res.body.message.should.be.eql('Element does not exist');

                    done();
                });
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

        it('should properly update note by id', (done) => {
            const givenData = { title: 'updated title', message: 'updated message' };
            chai.request(app)
                .post('/api/v1/notes')
                .send({ title: 'note to update', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(app)
                        .put(`/api/v1/notes/${res.body.id}`)
                        .send({ title: 'updated title', message: 'updated message' })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.title.should.be.eql(givenData.title);
                            res.body.message.should.be.eql(givenData.message);

                            done()
                        });
                });
        });
    });

    describe('Delete', () => {
        it('should throw error if note with passed id not exist', (done) => {
            chai.request(app)
                .del(`/api/v1/notes/xyz`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.code.should.be.eql(404);
                    res.body.message.should.be.eql('Element does not exist')

                    done()
                });
        });

        it('should properly delete note by id', (done) => {
            chai.request(app)
                .post('/api/v1/notes')
                .send({ title: 'test title', message: 'test message' })
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(app)
                        .del(`/api/v1/notes/${res.body.id}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.success.should.be.eql(true);

                            done()
                        });
                });
        });
    });
});