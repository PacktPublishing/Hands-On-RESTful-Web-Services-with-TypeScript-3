import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import * as halson from 'halson'
import * as jwt from 'jsonwebtoken'
import { UserModel } from '../schemas/User'
import { formatOutput } from '../utility/orderApiUtility'

export let getUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }

    user = user.toJSON()
    user._id = user._id.toString()

    user = halson(user).addLink('self', `/users/${user._id}`)
    return formatOutput(res, user, 200, 'user')
  })
}

export let addUser = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new UserModel(req.body)

  newUser.password = bcrypt.hashSync(newUser.password, 10)

  newUser.save((error, user) => {
    if (error) {
      return res.status(500).send(error)
    }
    user = halson(user.toJSON()).addLink('self', `/users/${user._id}`)
    return formatOutput(res, user, 201, 'user')
  })
}

export let updateUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }

    user.username = req.body.username || user.username
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    user.phone = req.body.phone || user.phone
    user.userStatus = req.body.userStatus || user.userStatus

    user.save(error => {
      res.status(204).send()
    })
  })
}

export let removeUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }

    user.remove(error => {
      res.status(204).send()
    })
  })
}

export let login = (req: Request, res: Response, next: NextFunction) => {
  const username = req.query.username
  const password = req.query.password

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      return res.status(404).send()
    }

    const validate = bcrypt.compareSync(password, user.password.valueOf())

    if (validate) {
      const body = { _id: user._id, email: user.email }

      const token = jwt.sign({ user: body }, 'top_secret')

      return res.json({ token: token })
    } else {
      return res.status(401).send()
    }
  })
}
