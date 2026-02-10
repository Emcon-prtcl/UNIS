import { UnisColors } from '@/constants/unis-theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface NextButtonProps {
  label?: string;
  onPress: () => void;
}

export function NextButton({ label = 'Suivant', onPress }: NextButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: UnisColors.yellow.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    gap: 12,
    minWidth: 200,
    shadowColor: UnisColors.yellow.dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    color: UnisColors.purple.dark,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  arrow: {
    color: UnisColors.purple.dark,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
