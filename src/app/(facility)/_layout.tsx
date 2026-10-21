import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from '@/context/session';
import { homeRouteFor } from '@/data/roles';
import { colors, fontFamily } from '@/theme';

function tabIcon(name: string) {
  const fn = (props: { color: string; size: number }) => (
    <MaterialCommunityIcons name={name as any} size={props.size} color={props.color} />
  );
  return fn as unknown as (p: any) => React.ReactNode;
}

export default function FacilityLayout() {
  const { role, ready } = useSession();
  if (ready && !role) return <Redirect href="/login" />;
  if (ready && role && role.id !== 'facility') return <Redirect href={homeRouteFor(role.id)} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 86, paddingTop: 8, paddingBottom: 30 },
        tabBarLabelStyle: { fontFamily: fontFamily.semibold, fontSize: 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: tabIcon('home-variant') }} />
      <Tabs.Screen name="toilets" options={{ title: 'Toilets', tabBarIcon: tabIcon('toilet') }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alerts', tabBarIcon: tabIcon('bell') }} />
      <Tabs.Screen name="me" options={{ title: 'Me', tabBarIcon: tabIcon('account') }} />
    </Tabs>
  );
}
