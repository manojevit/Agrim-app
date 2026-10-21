import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useSession } from '@/context/session';
import { homeRouteFor } from '@/data/roles';
import { colors } from '@/theme';

/** Decide where to send the user: role picker (login) or the app. */
export default function Index() {
  const { role, ready } = useSession();

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }
  return <Redirect href={role ? homeRouteFor(role.id) : '/login'} />;
}
