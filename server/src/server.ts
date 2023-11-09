import 'dotenv/config'

import { fastify } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import staticModule from '@fastify/static'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { aploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)
app.register(staticModule, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(cors, { origin: true })
app.register(jwt, { secret: 'spacetime' })

app.register(memoriesRoutes)
app.register(authRoutes)
app.register(aploadRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('server running')
})
