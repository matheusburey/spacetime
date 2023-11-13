import { View, Text, TouchableOpacity, Switch, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import SpacetimeLogo from '../src/assets/spacetime-logo.svg'
import { Link, router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'

export default function NewMemories() {
  const { bottom, top } = useSafeAreaInsets()
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [preview, setPreview] = useState('')

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        selectionLimit: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateMemory = async () => {
    try {
      const token = await SecureStore.getItemAsync('token')
      let coverUrl = ''

      if (preview) {
        const uploadFormData = new FormData()

        uploadFormData.append('file', {
          uri: preview,
          name: 'image.jpg',
          type: 'image/jpeg',
        } as any)

        const uploadResponse = await api.post('/upload', uploadFormData)

        coverUrl = uploadResponse.data.fileUrl
      }

      await api.post(
        '/memories',
        {
          content,
          isPublic,
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.push('/memories')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <SpacetimeLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Feather name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-10">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372560' }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />
          <Text className="font-body text-base text-gray-200">
            Tonar memoria publica
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              alt=""
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Feather name="plus" size={16} color="#FFF" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar imagem ou video de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateMemory}
          className="items-center rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Salvar lembrança
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
