const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('User validation tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('creation fails with 400 if password is less than 3 characters', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: '12' 
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.ok(result.body.error.includes('at least 3 characters long'))
  })
})

after(async () => {
  await mongoose.connection.close()
})