import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn'

const Profile: React.FC = () => (
  <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
    <View>
      <Text>Profile</Text>
    </View>
  </SafeAreaView>
)

Profile.displayName = 'Profile'

export default Profile
