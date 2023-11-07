import { Text, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { useEffect } from 'react'

import SpacetimeLogo from '../src/assets/spacetime-logo.svg'
import { api } from '../src/lib/api'
import { useRouter } from 'expo-router'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/a63f98e0847ecb7882c0',
}

export default function App() {
  const router = useRouter()

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'a63f98e0847ecb7882c0',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({ scheme: 'spacetime' }),
    },
    discovery,
  )

  useEffect(() => {
    console.log(makeRedirectUri({ scheme: 'spacetime' }))
    if (response?.type === 'success') {
      const { code } = response.params
      api
        .post('/register', {
          code,
        })
        .then((response) => {
          const { token } = response.data
          SecureStore.setItemAsync('token', token)
          router.push('/memories')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <SpacetimeLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => signInWithGithub()}
          className="rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com ♥ pelo Rocketseat
      </Text>
    </View>
  )
}
