import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Party } from '.'

const app = () => express(apiRoot, routes)

let userSession, party

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  party = await Party.create({})
})

test('POST /parties 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ list: 'test', count: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.list).toEqual('test')
  expect(body.count).toEqual('test')
})

test('GET /parties 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /parties 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /parties/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${party.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(party.id)
})

test('GET /parties/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /parties/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${party.id}`)
    .send({ list: 'test', count: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(party.id)
  expect(body.list).toEqual('test')
  expect(body.count).toEqual('test')
})

test('PUT /parties/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ list: 'test', count: 'test' })
  expect(status).toBe(404)
})

test('DELETE /parties/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${party.id}`)
  expect(status).toBe(204)
})

test('DELETE /parties/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
