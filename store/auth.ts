import { API_URL } from '@/constants/config';

export interface AuthTokens {
  jwt: string;
  refreshToken: string;
  prenom?: string;
  nom?: string;
  dateInscription?: string;
}

export const authStore: AuthTokens = {
  jwt: '',
  refreshToken: '',
  prenom: '',
  nom: '',
  dateInscription: '',
};

export function setAuthTokens(jwt: string, refreshToken: string, prenom?: string, nom?: string) {
  authStore.jwt = jwt;
  authStore.refreshToken = refreshToken;
  authStore.prenom = prenom || '';
  authStore.nom = nom || '';
}

export function setAuthUser(prenom?: string, nom?: string, dateInscription?: string) {
  authStore.prenom = prenom || '';
  authStore.nom = nom || '';
  authStore.dateInscription = dateInscription || '';
}

export function clearAuthTokens() {
  authStore.jwt = '';
  authStore.refreshToken = '';
  authStore.prenom = '';
  authStore.nom = '';
  authStore.dateInscription = '';
}

export function getAuthToken(): string | null {
  return authStore.jwt && authStore.jwt.trim().length > 0 ? authStore.jwt : null;
}

export function getUserName(): string {
  const prenom = authStore.prenom?.trim() || '';
  const nom = authStore.nom?.trim() || '';
  
  if (prenom && nom) {
    return prenom;
  }
  if (prenom) {
    return prenom;
  }
  if (nom) {
    return nom;
  }
  return 'Utilisateur';
}

export async function refreshUserFromMe(): Promise<void> {
  const token = getAuthToken();
  if (!token) {
    console.warn("no token");
    return;
  }
  console.log("refreshing user data with token:", token);

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn("Failed to fetch user data");
      return;
    }

    let data: any = null;
    try {
      data = await response.json();
      console.log("user data from /auth/me:", data);
    } catch {
      console.warn("Failed to parse user data");
      data = null;
    }

    const prenom = data?.malade?.utilisateur?.prenom ;

    const nom = data?.malade?.utilisateur?.nom;

    const dateInscription = data?.malade?.date_inscription;

    setAuthUser(prenom, nom, dateInscription);
  } catch {
      console.warn("Failed to refresh user data");
    return;
  }
}

export function getDaysSinceInscription(): number {
  if (!authStore.dateInscription) {
    return 0;
  }

  try {
    const inscriptionDate = new Date(authStore.dateInscription);
    const today = new Date();
    
    // Reset both dates to midnight to get whole days
    inscriptionDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const timeDiff = today.getTime() - inscriptionDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return Math.max(0, daysDiff);
  } catch {
    return 0;
  }
}