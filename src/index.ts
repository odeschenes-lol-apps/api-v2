import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const prismaInstance = new PrismaClient()
const app = express()

const secret = process.env.TOKEN_SECRET || 'secret'

app.get('/', async (req, res) => {
  console.log('hello')

  const user = await prismaInstance.user.create({
    data: {
      email: Math.random() + '@test.com'
    }
  })

  const token = await prismaInstance.token.create({
    data: {
      userId: user.id,
      token: jwt.sign({userId: user.id, email: user.email}, secret, {expiresIn: '1h'})
    }
  })

  const verify = jwt.verify(token.token, secret)

  res.send({user, token, verify})
})

const server = app.listen(3000)