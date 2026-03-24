import React, { createContext, useContext, useState } from 'react';

export type AvatarConfig = {
  skinColor: string;
  hairStyle: number;
  hairColor: string;
  eyeStyle: number;
  eyeColor: string;
  eyebrowStyle: number;
  noseStyle: number;
  mouthStyle: number;
  facialHairStyle: number;
  facialHairColor: string;
  accessoryStyle: number;
  clotheColor: string;
};

export const DEFAULT_AVATAR: AvatarConfig = {
  skinColor: '#E8B88A',
  hairStyle: 2,
  hairColor: '#C8832A',
  eyeStyle: 0,
  eyeColor: '#5C3A1E',
  eyebrowStyle: 0,
  noseStyle: 0,
  mouthStyle: 1,
  facialHairStyle: 0,
  facialHairColor: '#C8832A',
  accessoryStyle: 0,
  clotheColor: '#6B21A8',
};

type AvatarContextType = {
  avatarConfig: AvatarConfig;
  setAvatarConfig: (config: AvatarConfig) => void;
};

const AvatarContext = createContext<AvatarContextType>({
  avatarConfig: DEFAULT_AVATAR,
  setAvatarConfig: () => {},
});

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  return (
    <AvatarContext.Provider value={{ avatarConfig, setAvatarConfig }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  return useContext(AvatarContext);
}