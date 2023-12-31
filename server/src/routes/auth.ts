import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req) => {
    const bodySchema = z.object({
      code: z.string(),
      origin: z.string(),
    })
    const { code, origin } = bodySchema.parse(req.body)

    const params = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
    }

    if (origin === 'mobile') {
      params.client_id = process.env.MOBILE_GITHUB_CLIENT_ID
      params.client_secret = process.env.MOBILE_GITHUB_CLIENT_SECRET
    }

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params,
        headers: { Accept: 'application/json' },
      },
    )

    const { access_token: token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: { githubId: userInfo.id },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          name: userInfo.name,
          login: userInfo.login,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const tokenGenerate = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return { token: tokenGenerate }
  })
}
