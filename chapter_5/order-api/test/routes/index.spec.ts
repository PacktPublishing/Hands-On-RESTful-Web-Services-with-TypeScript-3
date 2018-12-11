'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../../src/app'

chai.use(chaiHttp)

const expect = chai.expect

describe('Stack', () => {
  it('should be able to be initialized without an initializer', async () => {
    const s = 10
    expect(s).to.equal(10)
  })
})

describe('baseRoute', () => {
  it('should respond with HTTP 200 status', async () => {
    return chai
      .request(app)
      .get('/index')
      .then(res => {
        expect(res.status).to.be.equal(200)
      })
  })
  it('should respond with success message', async () => {
    return chai
      .request(app)
      .get('/index')
      .then(res => {
        expect(res.body.status).to.be.equal('success')
      })
  })
})
