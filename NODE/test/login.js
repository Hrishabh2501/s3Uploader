const app = require('../App')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('SignIn', () => {

    describe('/POST login', () => {
        it('it should not Login a user without email field', (done) => {
            let data = {
                password: "cs301114"

            }
            chai.request(app)
                .post('/signin')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        })
    })


    describe('/POST login', () => {
        it('it should not Login a user without valid email field', (done) => {
            let data = {
                email: "abc",
                password: "123334"
            }
            chai.request(app)
                .post('/signin')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        });
    });


    describe('/POST login', () => {
        it('it should not Login a user without password field', (done) => {
            let data = {
                email: "hrishabhjain67@gmail.com",

            }
            chai.request(app)
                .post('/signin')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        });
    });


    describe('/POST login', () => {
        it('it should not Login a user without password length less than 6 field', (done) => {
            let data = {
                email: "pk1234556@g.com",
                password: "122"
            }
            chai.request(app)
                .post('/signin')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        });
    });


    describe('/POST login', () => {
        it('it should not Login a user with wrong password', (done) => {
            let data = {
                email: "hrishabhjain67@gmail.com",
                password: "12345678",

            }
            chai.request(app)
                .post('/signin')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('PASSWORD INCORRECT')
                    done();
                });
        });
    });

})
