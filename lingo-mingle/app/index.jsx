import { View, Text } from 'react-native'
import React from 'react'

import { useSegments } from 'expo-router'

const MainPage = () => {
    const seg = useSegments()

    console.log("SONO QUI ", seg);
  return (
    <View>
      <Text>MainPage</Text>
    </View>
  )
}

export default MainPage