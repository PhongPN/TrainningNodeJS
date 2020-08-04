process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../model/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;
let token = '';

chai.use(chaiHttp);

describe('Users', () => {

    it("Token", function (done) {
        chai
            .request(app)
            .post("/login")
            .send({ username: "admin", password: "12345678" })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("token");
                token = res.body.token;
                console.log("Token: " + token)
                done();
            });
    })

    /*beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });

    });*/


    describe('/GET user', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/user')
                .set('authorization', 'Bearer: ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.gt(0);
                    expect(res.body[0]).to.have.property("Fullname");
                    expect(res.body[0]).to.have.property("role");
                    done();
                });
        });
    });

    
    describe('/POST user', () => {
        it('it should POST a user ', (done) => {
            let user = {
                id: 2,
                username: "PhongPN",
                password: "123456",
                userfirstname: "Phong",
                userlastname: "Pham",
                userprename: "Ngoc",
                role: "sub-admin"
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.have.property('id')
                    expect(res.body).to.have.property('username');
                    expect(res.body).to.have.property('password');
                    expect(res.body).to.have.property('userfirstname');
                    expect(res.body).to.have.property('userlastname');
                    expect(res.body).to.have.property('userprename');
                    done();
                });
        });
    });

    /*
    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            chai.request(app)
                .get('/user/' + 2)
                .set('authorization','Bearer: '+token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property("username");
                    expect(res.body).to.have.property("role");
                    done();
                });

        });
    });
    */
    
    describe('/PUT/:id user', () => {
        it('it should UPDATE a user given the id', (done) => {
            chai.request(app)
                .put('/user/' + 2)
                .set('authorization', 'Bearer: ' + token)
                .send({
                    username: "PhongTTH",
                    password: "123456",
                    userfirstname: "Hang",
                    userlastname: "Pham",
                    userprename: "Ngoc",
                    role: "sub-admin",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    done();
                });
        });
    });
    /*
    describe('/DELETE/:id user', () => {
        it('it should DELETE a user given the id', (done) => {
            chai.request(app)
                .delete('/user/' + 2)
                .set('authorization', 'Bearer: ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });*/
});