import { Stack } from 'expo-router';

export default function AccompagnantLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="espace_proche4" />
      <Stack.Screen name="espace_proche5" />
      <Stack.Screen name="espace_proche6" />
      <Stack.Screen name="espace_proche7" />
      <Stack.Screen name="espace_proche8" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="edit-avatar" />
    </Stack>
  );
}