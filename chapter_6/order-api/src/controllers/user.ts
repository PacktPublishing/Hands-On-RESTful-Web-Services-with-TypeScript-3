import { NextFunction, Request, Response } from 'express'
import { default as User } from '../models/User'

let users: Array<User> = []

export let getUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username
  const user = users.find(obj => obj.username === username)
  const httpStatusCode = user ? 200 : 404
  return res.status(httpStatusCode).send(user)
}

export let addUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    // generic random value from 1 to 100 only for tests so far
    id: Math.floor(Math.random() * 100) + 1,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    userStatus: 1,
  }
  users.push(user)
  return res.status(201).send(user)
}

export let updateUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username
  const userIndex = users.findIndex(item => item.username === username)

  if (userIndex === -1) {
    return res.status(404).send()
  }

  const user = users[userIndex]
  user.username = req.body.username || user.username
  user.firstName = req.body.firstName || user.firstName
  user.lastName = req.body.lastName || user.lastName
  user.email = req.body.email || user.email
  user.password = req.body.password || user.password
  user.phone = req.body.phone || user.phone
  user.userStatus = req.body.userStatus || user.userStatus

  users[userIndex] = user
  return res.status(204).send()
}

export let removeUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username
  const userIndex = users.findIndex(item => item.username === username)

  if (userIndex === -1) {
    return res.status(404).send()
  }

  users = users.filter(item => item.username !== username)

  return res.status(204).send()
}
