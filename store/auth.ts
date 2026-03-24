export interface AuthTokens {
  jwt: string;
  refreshToken: string;
}

export const authStore: AuthTokens = {
  jwt: '',
  refreshToken: '',
};

export function setAuthTokens(jwt: string, refreshToken: string) {
  authStore.jwt = jwt;
  authStore.refreshToken = refreshToken;
}

export function clearAuthTokens() {
  authStore.jwt = '';
  authStore.refreshToken = '';
}

export function getAuthToken(): string | null {
  return authStore.jwt && authStore.jwt.trim().length > 0 ? authStore.jwt : null;
}