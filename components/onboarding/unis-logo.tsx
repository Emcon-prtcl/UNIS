import { UnisColors } from '@/constants/unis-theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface UnisLogoProps {
  size?: number;
}

export function UnisLogo({ size = 90 }: UnisLogoProps) {
  const borderRadius = size * 0.22;
  const fontSize = size * 0.5;

  return (
    <View
      style={[
        styles.logoContainer,
        {
          width: size,
          height: size,
          borderRadius,
        },
      ]}
    >
      <Text style={[styles.logoText, { fontSize }]}>U</Text>
      <View style={[styles.dot, { width: size * 0.12, height: size * 0.12, borderRadius: size * 0.06 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: UnisColors.purple.dark,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoText: {
    color: UnisColors.yellow.medium,
    fontWeight: '700',
  },
  dot: {
    position: 'absolute',
    top: '22%',
    right: '22%',
    backgroundColor: UnisColors.yellow.medium,
  },
});
