import { Stack } from 'expo-router';

export default function SevrageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="espace" />
      <Stack.Screen name="login" />
      <Stack.Screen name="inscription" />
      <Stack.Screen name="partage" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="mon-statut" />
      <Stack.Screen name="mon-journal" />
      <Stack.Screen name="aujourdhui" />
      <Stack.Screen name="messagerie" />
      <Stack.Screen name="messagerie-compose" />
      <Stack.Screen name="sos" />
      <Stack.Screen name="reussites" />
      <Stack.Screen name="invitation" />
      <Stack.Screen name="difficulte" />
      <Stack.Screen name="humeur" />
      <Stack.Screen name="activite" />
      <Stack.Screen name="notes" />
      <Stack.Screen name="recapitulatif" />
    </Stack>
  );
}
