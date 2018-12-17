'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../../src/app'

chai.use(chaiHttp)

const expect = chai.expect

describe('baseRoute', () => {
  it('should respond with HTTP 200 status', async () => {
    return chai
      .request(app)
      .get('/api')
      .then(res => {
        expect(res.status).to.be.equal(200)
      })
  })
  it('should respond with success message', async () => {
    return chai
      .request(app)
      .get('/api')
      .then(res => {
        expect(res.body.title).to.be.equal('Order API')
      })
  })
})
