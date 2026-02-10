import { UnisColors } from '@/constants/unis-theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface WaveBackgroundProps {
  variant?: 'top' | 'both';
  children: React.ReactNode;
}

export function WaveBackground({ variant = 'top', children }: WaveBackgroundProps) {
  return (
    <View style={styles.container}>
      {/* Décoration en haut — couche arrière */}
      <View style={styles.topWaveContainer}>
        <View style={[styles.waveLayer, styles.topWaveBack]} />
        <View style={[styles.waveLayer, styles.topWaveFront]} />
      </View>

      {/* Contenu */}
      <View style={styles.content}>{children}</View>

      {/* Décoration en bas */}
      {variant === 'both' && (
        <View style={styles.bottomWaveContainer}>
          <View style={[styles.waveLayer, styles.bottomWaveBack]} />
          <View style={[styles.waveLayer, styles.bottomWaveFront]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UnisColors.background,
    overflow: 'hidden',
  },
  topWaveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  waveLayer: {
    position: 'absolute',
    left: -20,
    right: -20,
  },
  topWaveBack: {
    top: -60,
    height: 220,
    backgroundColor: UnisColors.purple.light,
    opacity: 0.45,
    borderBottomLeftRadius: 900,
    borderBottomRightRadius: 300,
    transform: [{ rotate: '-3deg' }],
  },
  topWaveFront: {
    top: -80,
    height: 210,
    backgroundColor: UnisColors.purple.veryLight,
    opacity: 0.7,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 900,
    transform: [{ rotate: '2deg' }],
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  bottomWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    zIndex: 0,
  },
  bottomWaveBack: {
    bottom: -60,
    height: 180,
    backgroundColor: UnisColors.purple.light,
    opacity: 0.35,
    borderTopLeftRadius: 300,
    borderTopRightRadius: 900,
    transform: [{ rotate: '2deg' }],
  },
  bottomWaveFront: {
    bottom: -70,
    height: 170,
    backgroundColor: UnisColors.purple.veryLight,
    opacity: 0.5,
    borderTopLeftRadius: 900,
    borderTopRightRadius: 300,
    transform: [{ rotate: '-2deg' }],
  },
});
