import { UnisColors } from '@/constants/unis-theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ChoiceButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  onPress: () => void;
}

export function ChoiceButton({ label, variant, onPress }: ChoiceButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'primary' ? styles.primary : styles.secondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, variant === 'primary' ? styles.primaryLabel : styles.secondaryLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    minWidth: 260,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  primary: {
    backgroundColor: UnisColors.yellow.light,
    borderWidth: 2,
    borderColor: UnisColors.yellow.medium,
    shadowColor: UnisColors.yellow.dark,
  },
  secondary: {
    backgroundColor: UnisColors.purple.light,
    borderWidth: 2,
    borderColor: UnisColors.purple.medium,
    shadowColor: UnisColors.purple.dark,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  primaryLabel: {
    color: UnisColors.purple.dark,
  },
  secondaryLabel: {
    color: UnisColors.purple.dark,
  },
});
