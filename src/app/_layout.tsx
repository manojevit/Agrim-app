import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from '@/context/session';
import { LangProvider } from '@/context/lang';
import { CleaningProvider } from '@/context/cleaning';
import { colors, paperTheme } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
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
            <CleaningProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="device/[id]" />
              <Stack.Screen name="alert/[id]" />
              <Stack.Screen name="add-device" />
              <Stack.Screen name="scan-qr" />
              <Stack.Screen name="search" />
              <Stack.Screen name="block-usage" />
              <Stack.Screen name="ai-credits" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="notifications" />
              <Stack.Screen name="edit-profile" />
              <Stack.Screen name="switch-role" options={{ presentation: 'modal' }} />
            </Stack>
            </CleaningProvider>
          </SessionProvider>
        </LangProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
