import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from '@/context/session';
import { useLang } from '@/context/lang';
import { colors, fontFamily } from '@/theme';

function icon(name: string) {
  return (props: { color: string; size: number }) =>
    <MaterialCommunityIcons name={name as any} size={props.size - 1} color={props.color} />;
}
const tabIcon = icon as unknown as (name: string) => (p: any) => React.ReactNode;

export default function TabsLayout() {
  const { role, ready } = useSession();
  const { t } = useLang();
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
          height: 84,
          paddingTop: 8,
          paddingBottom: 28,
        },
        tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('tab.home'), tabBarIcon: tabIcon('home-variant') }} />
      <Tabs.Screen name="devices" options={{ title: t('tab.devices'), tabBarIcon: tabIcon('cellphone-cog') }} />
      <Tabs.Screen name="alerts" options={{ title: t('tab.alerts'), tabBarIcon: tabIcon('bell-outline') }} />
      <Tabs.Screen name="map" options={{ title: t('tab.map'), tabBarIcon: tabIcon('map-outline') }} />
      <Tabs.Screen name="menu" options={{ title: t('tab.menu'), tabBarIcon: tabIcon('menu') }} />
    </Tabs>
  );
}
