import { getAuthToken } from '@/store/auth';
import { Redirect } from 'expo-router';

export default function Index() {
  const token = getAuthToken();
  return token ? (
    <Redirect href="/(sevrage)/(tabs)/accueil" />
  ) : (
    <Redirect href="/onboarding/welcome" />
  );
}
