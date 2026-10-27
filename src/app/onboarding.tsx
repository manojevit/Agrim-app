import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { colors, radius, spacing } from '@/theme';

const SLIDES = [
  { icon: 'radar', title: 'ob.1.title', body: 'ob.1.body' },
  { icon: 'bell-ring', title: 'ob.2.title', body: 'ob.2.body' },
  { icon: 'broom', title: 'ob.3.title', body: 'ob.3.body' },
];

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const { t, lang, setLang } = useLang();
  const { width: W } = useWindowDimensions();
  const ref = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const last = index === SLIDES.length - 1;

  const finish = () => {
    AsyncStorage.setItem('agrim.onboarded', '1');
    router.replace('/login');
  };
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / W));
  };
  const next = () => {
    if (last) finish();
    else ref.current?.scrollTo({ x: W * (index + 1), animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Top bar: language + skip */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.langToggle}>
          <Pressable onPress={() => setLang('en')} style={[styles.lang, lang === 'en' && styles.langOn]}>
            <Txt variant="tiny" color={lang === 'en' ? '#FFFFFF' : colors.textMuted}>English</Txt>
          </Pressable>
          <Pressable onPress={() => setLang('hi')} style={[styles.lang, lang === 'hi' && styles.langOn]}>
            <Txt variant="tiny" color={lang === 'hi' ? '#FFFFFF' : colors.textMuted}>हिन्दी</Txt>
          </Pressable>
        </View>
        {!last && (
          <Pressable onPress={finish} hitSlop={10}>
            <Txt variant="label" color={colors.textMuted}>{t('ob.skip')}</Txt>
          </Pressable>
        )}
      </View>

      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={{ flex: 1 }}
      >
        {SLIDES.map((s, i) => (
          <View key={i} style={[styles.slide, { width: W }]}>
            <View style={styles.slideInner}>
              <View style={styles.art}>
                <View style={styles.ringOuter} />
                <View style={styles.ringInner} />
                <View style={styles.iconTile}>
                  <MaterialCommunityIcons name={s.icon as any} size={64} color="#FFFFFF" />
                </View>
              </View>
              <Txt variant="h1" style={{ textAlign: 'center', marginTop: spacing.xxxl }}>{t(s.title)}</Txt>
              <Txt variant="body" color={colors.textMuted} style={{ textAlign: 'center', marginTop: spacing.md, lineHeight: 22 }}>{t(s.body)}</Txt>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer: dots + button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.brandRow}>
          <Logo size={26} />
          <Txt variant="label" color={colors.textMuted}>Agrim Suchak</Txt>
        </View>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotOn]} />
          ))}
        </View>
        <Button mode="contained" onPress={next} contentStyle={{ height: 54 }} style={{ borderRadius: radius.md }} labelStyle={styles.btnLabel} icon={last ? 'arrow-right' : undefined}>
          {last ? t('ob.getStarted') : t('ob.next')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  langToggle: { flexDirection: 'row', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, padding: 3 },
  lang: { paddingHorizontal: spacing.md, paddingVertical: 5, borderRadius: radius.pill },
  langOn: { backgroundColor: colors.primary },
  slide: { paddingHorizontal: spacing.xxl, alignItems: 'center', justifyContent: 'center', flex: 1 },
  slideInner: { width: '100%', maxWidth: 460, alignItems: 'center' },
  art: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center' },
  ringOuter: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: colors.primaryTint },
  ringInner: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: colors.primarySoft },
  iconTile: { width: 110, height: 110, borderRadius: 34, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, gap: spacing.lg, width: '100%', maxWidth: 520, alignSelf: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.borderStrong },
  dotOn: { width: 22, backgroundColor: colors.primary },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 16 },
});
