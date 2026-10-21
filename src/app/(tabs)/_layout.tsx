import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from '@/context/session';
import { colors, fontFamily } from '@/theme';

function icon(name: string) {
  return (props: { color: string; size: number }) =>
    <MaterialCommunityIcons name={name as any} size={props.size} color={props.color} />;
}
// Cast helper to the tab icon signature Expo Router expects.
const tabIcon = icon as unknown as (name: string) => (p: any) => React.ReactNode;

export default function TabsLayout() {
  const { role, ready } = useSession();
  if (ready && !role) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 86,
          paddingTop: 8,
          paddingBottom: 30,
        },
        tabBarLabelStyle: { fontFamily: fontFamily.semibold, fontSize: 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: tabIcon('home-variant') }} />
      <Tabs.Screen name="toilets" options={{ title: 'Toilets', tabBarIcon: tabIcon('toilet') }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alerts', tabBarIcon: tabIcon('bell') }} />
      <Tabs.Screen name="cleaning" options={{ title: 'Cleaning', tabBarIcon: tabIcon('broom') }} />
      <Tabs.Screen name="menu" options={{ title: 'Menu', tabBarIcon: tabIcon('menu') }} />
    </Tabs>
  );
}
