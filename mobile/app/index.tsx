import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { styled } from 'nativewind'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { useEffect } from 'react'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import SpacetimeLogo from '../src/assets/spacetime-logo.svg'
import { api } from '../src/lib/api'
import { useRouter } from 'expo-router'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/a63f98e0847ecb7882c0',
}

export default function App() {
  const router = useRouter()
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

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

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="bg-gray-900 flex-1 realative px-8 py-4"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

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
      <StatusBar style="auto" translucent />
    </ImageBackground>
  )
}
