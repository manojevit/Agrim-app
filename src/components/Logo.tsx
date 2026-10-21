import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { colors, radius } from '@/theme';

/** App mark — a rounded brand tile. */
export function Logo({ size = 60 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialCommunityIcons name="radar" size={size * 0.52} color={colors.textInverse} />
    </View>
  );
}
