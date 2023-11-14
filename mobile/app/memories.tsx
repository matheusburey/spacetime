import { View, Text, TouchableOpacity, Switch, Image } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'
import SpacetimeLogo from '../src/assets/spacetime-logo.svg'
import { Link, router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import { api } from '../src/lib/api'

interface Memory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const [memories, setMemories] = useState<Memory[]>([])

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  const loadMemories = async () => {
    const token = await SecureStore.getItemAsync('token')
    const res = await api.get('/memories', {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(res.data)
    setMemories(res.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <SpacetimeLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View className="space-y-4" key={memory.id}>
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </Text>
            </View>

            <View className="space-y-4">
              <Image
                source={{ uri: memory.coverUrl }}
                alt=""
                className="aspect-video w-full rounded-lg"
              />
              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>
              <Link
                href={`/memories/${memory.id}`}
                className="font-body text-sm text-gray-200"
                asChild
              >
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text>ler mais</Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
