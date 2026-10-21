import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from '@/context/session';
import { LangProvider } from '@/context/lang';
import { colors, paperTheme } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={paperTheme}
        settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
      >
       <LangProvider>
        <SessionProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(cleaner)" />
            <Stack.Screen name="(facility)" />
            <Stack.Screen name="(block)" />
            <Stack.Screen name="toilet/[id]" />
            <Stack.Screen name="alert/[id]" />
            <Stack.Screen name="cleaner-job/[id]" />
            <Stack.Screen name="facility-toilet/[id]" />
            <Stack.Screen name="facility-alert/[id]" />
            <Stack.Screen name="block-building/[id]" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="cleaner-alert" options={{ presentation: 'fullScreenModal' }} />
            <Stack.Screen name="switch-role" options={{ presentation: 'modal' }} />
          </Stack>
        </SessionProvider>
       </LangProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
