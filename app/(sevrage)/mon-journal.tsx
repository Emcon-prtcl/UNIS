import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

// Configure French locale
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ],
  monthNamesShort: [
    'Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin',
    'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.',
  ],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export default function MonJournalScreen() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Mon Journal</Text>

          {/* Calendar */}
          <View style={styles.calendarCard}>
            <Calendar
              firstDay={1}
              onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
              markedDates={{
                [today]: {
                  selected: true,
                  selectedColor: UnisColors.purple.dark,
                  selectedTextColor: UnisColors.white,
                },
                ...(selectedDate !== today
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: UnisColors.purple.light,
                        selectedTextColor: UnisColors.white,
                      },
                    }
                  : {}),
              }}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                monthTextColor: UnisColors.purple.dark,
                textMonthFontSize: 20,
                textMonthFontWeight: '800' as const,
                textMonthFontFamily: 'TitleWrap',
                dayTextColor: UnisColors.purple.dark,
                textDayFontSize: 15,
                textDayFontFamily: 'Inter',
                textDayHeaderFontSize: 14,
                textDayHeaderFontFamily: 'Inter',
                textDayHeaderFontWeight: '700' as const,
                textSectionTitleColor: UnisColors.purple.dark,
                todayTextColor: UnisColors.white,
                todayBackgroundColor: UnisColors.purple.dark,
                arrowColor: UnisColors.purple.dark,
                textDisabledColor: UnisColors.purple.light,
                textInactiveColor: UnisColors.purple.light,
              }}
              style={{ borderRadius: 16 }}
            />
          </View>

          {/* Aujourd'hui button */}
          <Pressable style={styles.todayButton} onPress={() => router.push('/(sevrage)/aujourdhui')}>
            <Image
              source={require('../../assets/images/papier_stylo.png')}
              style={styles.todayIcon}
              resizeMode="contain"
            />
            <Text style={styles.todayButtonText}>Aujourd'hui</Text>
          </Pressable>

          {/* Motivation card */}
          <View style={styles.motivationCard}>
            <View style={styles.motivationHeader}>
              <Text style={styles.motivationTitle}>Motivation</Text>
              <View style={styles.motivationLine} />
            </View>
            <Text style={styles.motivationQuote}>
              «&nbsp;Le football c'est comme les échecs mais sans les dés.&nbsp;»
            </Text>
            <Text style={styles.motivationAuthor}>~ Martin Luther King</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UnisColors.offWhite,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  backButton: {
    marginTop: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
    marginLeft: 16,
    padding: 6,
    borderRadius: 20,
  },
  backArrow: {
    fontSize: 28,
    color: UnisColors.purple.dark,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 20,
  },

  /* Calendar */
  calendarCard: {
    backgroundColor: UnisColors.white,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: UnisColors.yellow.medium,
    padding: 16,
    marginBottom: 24,
  },
  /* Aujourd'hui button */
  todayButton: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 20,
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  todayIcon: {
    width: 28,
    height: 28,
  },
  todayButtonText: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },

  /* Motivation */
  motivationCard: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 20,
    padding: 24,
  },
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  motivationTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.white,
  },
  motivationLine: {
    flex: 1,
    height: 3,
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 2,
  },
  motivationQuote: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontWeight: '700',
    color: UnisColors.white,
    lineHeight: 22,
    marginBottom: 8,
  },
  motivationAuthor: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.white,
    fontWeight: '600',
  },
});
