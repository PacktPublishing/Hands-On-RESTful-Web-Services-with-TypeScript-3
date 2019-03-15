'use strict'
import * as bcrypt from 'bcrypt'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../../src/app'
import { UserModel } from '../../src/schemas/User'
import { OrderAPILogger } from '../../src/utility/logger'

chai.use(chaiHttp)

const expect = chai.expect

describe('userRoute', async () => {
  const user = {
    _id: null,
    username: 'John',
    firstName: 'John',
    lastName: 'Doe',
    email: 'John@myemail.com',
    password: 'password',
    phone: '5555555',
    userStatus: 1,
  }

  let token

  before((done) => {
    expect(UserModel.modelName).to.be.equal('User')

    UserModel.db.db.dropCollection('users', async (err, result) => {
      
      const newUser = new UserModel(user)
      newUser.password = bcrypt.hashSync(newUser.password, 10)
      
      OrderAPILogger.logger.info(
        'calling save to create a default user for loging'
      )

      newUser.save(async (error, userCreated) => {
        user._id = userCreated._id
        done()
      })
    })
  })

  it('should be able to login', () => {     
    return chai
      .request(app)
      .get(`/users/login?username=${user.username}&password=${user.password}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        token = res.body.token
      })
  })

  it('should respond with HTTP 404 status because there is no user', () => {
    return chai
      .request(app)
      .get(`/users/NO_USER`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should create a new user and retrieve it back', () => {
    user.email = 'unique_email@email.com'
    return chai
      .request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body.username).to.be.equal(user.username)
      })
  })
  it('should return the user created on the step before', () => {
    return chai
      .request(app)
      .get(`/users/${user.username}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
      })
  })
  it('should updated the user John', () => {
    user.username = 'John_Updated'
    user.firstName = 'John Updated'
    user.lastName = 'Doe Updated'
    user.email = 'John@myemail_updated.com'
    user.password = 'password Updated'
    user.phone = '3333333'
    user.userStatus = 12

    return chai
      .request(app)
      .patch(`/users/John`)
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return the user updated on the step before', () => {
    return chai
      .request(app)
      .get(`/users/${user.username}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
        expect(res.body.firstName).to.be.equal(user.firstName)
        expect(res.body.lastName).to.be.equal(user.lastName)
        expect(res.body.email).to.be.equal(user.email)
        expect(res.body.password).to.be.equal(user.password)
        expect(res.body.phone).to.be.equal(user.phone)
        expect(res.body.userStatus).to.be.equal(user.userStatus)
      })
  })
  it('should return 404 because the user does not exist', () => {
    user.firstName = 'Mary Jane'

    return chai
      .request(app)
      .patch(`/users/Mary`)
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should remove an existent user', () => {
    return chai
      .request(app)
      .del(`/users/${user.username}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return 404 when it is trying to remove an user because the user does not exist', () => {
    return chai
      .request(app)
      .del(`/users/Mary`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
})
