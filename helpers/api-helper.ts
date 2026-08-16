import { type APIRequestContext } from '@playwright/test'
import { Login } from '../dto/login-dto'
import { OrderDto } from '../dto/order-dto'
import { StatusCodes } from 'http-status-codes'
import { expect } from '@playwright/test'
import { BE_URL } from '../config/env-data'

export async function fetchJwt(request: APIRequestContext, login: Login): Promise<string> {
  const authResponse = await request.post(BE_URL + '/login/student', {
    data: login,
  })
  if (authResponse.status() !== StatusCodes.OK) {
    throw new Error(`Authorization failed. Status: ${authResponse.status()}`)
  }
  return await authResponse.text()
}

export async function createOrder(request: APIRequestContext, jwt: string): Promise<number> {
  const response = await request.post(BE_URL + '/orders', {
    data: {
      status: 'OPEN',
      courierId: 0,
      customerName: 'vladimir',
      customerPhone: '55445566',
      comment: 'hello',
      id: 0,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  return responseBody.id
}

export async function createOrderWithRandomData(
  request: APIRequestContext,
  jwt: string,
): Promise<number> {
  const orderDTO = new OrderDto(
    'OPEN',
    Math.floor(Math.random() * 100),
    'John Doe',
    '+123456789',
    'Urgent order',
    Math.floor(Math.random() * 100),
  )
  const response = await request.post(BE_URL + '/orders', {
    data: orderDTO,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  return responseBody.id
}
