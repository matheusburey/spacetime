import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="realative bg-gray-900 flex-1"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="auto" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
