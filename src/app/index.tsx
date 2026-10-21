import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSession } from '@/context/session';
import { homeRouteFor } from '@/data/roles';
import { colors } from '@/theme';

/** Decide where to send the user: onboarding (first run), login, or the app. */
export default function Index() {
  const { role, ready } = useSession();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('agrim.onboarded').then((v) => setOnboarded(v === '1'));
  }, []);

  if (!ready || onboarded === null) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }
  if (role) return <Redirect href={homeRouteFor(role.id)} />;
  if (!onboarded) return <Redirect href="/onboarding" />;
  return <Redirect href="/login" />;
}
