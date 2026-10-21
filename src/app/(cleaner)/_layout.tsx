import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { colors, fontFamily } from '@/theme';

function tabIcon(name: string) {
  const fn = (props: { color: string; size: number }) => (
    <MaterialCommunityIcons name={name as any} size={props.size} color={props.color} />
  );
  return fn as unknown as (p: any) => React.ReactNode;
}

export default function CleanerLayout() {
  const { role, ready } = useSession();
  const { t } = useLang();
  if (ready && !role) return <Redirect href="/login" />;
  if (ready && role && role.id !== 'cleaner') return <Redirect href="/(tabs)" />;

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
      <Tabs.Screen name="index" options={{ title: t('tab.myJobs'), tabBarIcon: tabIcon('clipboard-check-outline') }} />
      <Tabs.Screen name="history" options={{ title: t('tab.done'), tabBarIcon: tabIcon('check-all') }} />
      <Tabs.Screen name="me" options={{ title: t('tab.me'), tabBarIcon: tabIcon('account') }} />
    </Tabs>
  );
}
