import React from 'react'
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { tailwind } from 'lib/styles'

interface PrimaryButtonProps {
  readonly style?: StyleProp<ViewStyle>
  readonly disable?: boolean
  onPress(): void
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  style,
  children,
  disable,
  onPress,
}) => (
  <TouchableOpacity
    onPress={() => onPress()}
    style={[
      tailwind(
        `flex items-center justify-center py-3 rounded-lg ${
          disable ? 'bg-gray-500' : ' bg-primary-500'
        }`,
      ),
      style,
    ]}
  >
    {children}
  </TouchableOpacity>
)

PrimaryButton.displayName = 'PrimaryButton'

export default PrimaryButton
