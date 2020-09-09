const app = require('../App')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('SignUp', () => {

    describe('/POST register', () => {
        it('Registration cant be done  without firstname field', (done) => {
            let data = {

                lastName: "Jain",
                email: "rahuljain@gmail.com",
                password: "rahul2501"

            }
            chai.request(app)
                .post('/signup')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        })
    })


    describe('/POST register', () => {
        it('Registration cant be done without valid email field', (done) => {
            let data = {
                firstName: "Rahul",
                lastName: "Jain",
                email: "rahul",
                password: "rahul2501"
            }
            chai.request(app)
                .post('/signup')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        });
    });


    describe('/POST register', () => {
        it('Registration cant be done without password field', (done) => {
            let data = {
                firstName: "Rahul",
                lastName: "Jain",
                email: "rahuljain@gmail.com"

            }
            chai.request(app)
                .post('/signup')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        });
    });


    describe('/POST register', () => {
        it.only('Registration cant be done without password length less than 6 field', (done) => {
            let data = {
                firstName: "Rahul",
                lastName: "Jain",
                email: "rahuljain@gmail.com",
                password: "125s3"
            }
            chai.request(app)
                .post('/signup')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    done();
                });
        });
    });

})