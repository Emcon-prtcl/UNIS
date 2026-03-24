import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, G } from 'react-native-svg';
import { AvatarConfig } from '@/constants/Avatarcontent';

const STROKE = '#1a1a1a';
const SW = 1.5;
const SW2 = 1.2;

function darken(hex: string, amount = 25): string {
  if (!hex || typeof hex !== 'string') return '#000000';
  const h = hex.startsWith('#') ? hex : '#' + hex;
  const n = parseInt(h.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function lighten(hex: string, amount = 25): string {
  if (!hex || typeof hex !== 'string') return '#ffffff';
  const h = hex.startsWith('#') ? hex : '#' + hex;
  const n = parseInt(h.slice(1), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/**
 * The coordinate system is 100×100 units.
 *
 * Layout (from top):
 *   - Bun / hat extension: y ≈ 2–18
 *   - Hair cap top: y ≈ 15–32
 *   - Head ellipse: cx=50 cy=55 rx=27 ry=28
 *   - Eyes: y ≈ 55
 *   - Nose: y ≈ 62–67
 *   - Mouth: y ≈ 72–78
 *   - Neck: y ≈ 78–88
 *   - Collar / clothes: y ≈ 88–100
 *
 * Hair is drawn in two phases so it never bleeds onto the face:
 *   PHASE A (before head) – back panels (side hair that hangs behind the ears)
 *   PHASE B (after head)  – front cap (sits on top of the head, above y≈32)
 *
 * The hair cap path always stays ABOVE the ear ellipses so it never
 * covers the face or ears.
 */

// ─── Shared head base ────────────────────────────────────────────────────────
// Extracted as a helper so each "variant" renders only the face parts it needs.

interface FaceProps {
  skinColor: string;
  skinDark: string;
  eyeStyle: number;
  eyeColor: string;
  eyebrowStyle: number;
  hairColor: string;
  noseStyle: number;
  mouthStyle: number;
  facialHairStyle: number;
  facialHairColor: string;
  accessoryStyle: number;
  clotheColor: string;
}

// ─── Hair cap path (top of head, sits above y≈32) ────────────────────────────
// This single path works for all hairstyles that need a top cap.
// It hugs the crown and does NOT extend past the ear level.
const HAIR_CAP = 'M24 44 Q50 14 76 44 Q72 21 50 19 Q28 21 24 44Z';

// ─── Hair back panels (rendered BEFORE the head) ─────────────────────────────

function HairBackPanels({ style, color }: { style: number; color: string }) {
  switch (style) {
    case 2: // Mi-long – panels end around y=78
      return (
        <G>
          <Path d="M24 44 Q17 58 18 78 Q22 64 24 50Z" fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          <Path d="M76 44 Q83 58 82 78 Q78 64 76 50Z" fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
        </G>
      );
    case 3: // Long – panels end around y=92
      return (
        <G>
          <Path d="M24 44 Q15 62 16 92 Q21 70 24 52Z" fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          <Path d="M76 44 Q85 62 84 92 Q79 70 76 52Z" fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
        </G>
      );
    case 6: // Tresses – braided panels
      return (
        <G>
          <Path d="M24 44 Q16 60 17 84 Q21 66 24 50Z" fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          <Path d="M76 44 Q84 60 83 84 Q79 66 76 50Z" fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
        </G>
      );
    default:
      return null;
  }
}

// ─── Hair front cap (rendered AFTER the head, stays above face) ──────────────

function HairFrontCap({ style, color }: { style: number; color: string }) {
  const lt = lighten(color, 30);
  const dk = darken(color, 20);

  switch (style) {
    case 0: return null; // Chauve

    case 1: // Court
      return (
        <G>
          <Path d={HAIR_CAP} fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          <Path d="M32 22 Q50 17 68 22 Q58 19 50 18 Q42 19 32 22Z" fill={lt} opacity={0.45} />
        </G>
      );

    case 2: // Mi-long – front cap only; back panels drawn in HairBackPanels
      return (
        <G>
          <Path d={HAIR_CAP} fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          <Path d="M32 22 Q50 17 68 22 Q58 19 50 18 Q42 19 32 22Z" fill={lt} opacity={0.4} />
          {/* subtle strand lines on the back panels */}
          <Path d="M20 60 Q18 70 19 78" stroke={dk} strokeWidth={1} fill="none" opacity={0.3} />
          <Path d="M80 60 Q82 70 81 78" stroke={dk} strokeWidth={1} fill="none" opacity={0.3} />
        </G>
      );

    case 3: // Long
      return (
        <G>
          <Path d={HAIR_CAP} fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          <Path d="M32 22 Q50 17 68 22 Q58 19 50 18 Q42 19 32 22Z" fill={lt} opacity={0.4} />
          <Path d="M18 68 Q16 78 17 88" stroke={dk} strokeWidth={1.2} fill="none" opacity={0.35} />
          <Path d="M22 66 Q20 76 21 86" stroke={dk} strokeWidth={0.8} fill="none" opacity={0.2} />
          <Path d="M82 68 Q84 78 83 88" stroke={dk} strokeWidth={1.2} fill="none" opacity={0.35} />
          <Path d="M78 66 Q80 76 79 86" stroke={dk} strokeWidth={0.8} fill="none" opacity={0.2} />
        </G>
      );

    case 4: // Chignon
      return (
        <G>
          <Path d={HAIR_CAP} fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          {/* bun sits above the cap */}
          <Ellipse cx={50} cy={13} rx={10} ry={8} fill={color} stroke={STROKE} strokeWidth={SW} />
          <Ellipse cx={50} cy={10} rx={5} ry={4} fill={lt} opacity={0.35} />
          {/* hair tie */}
          <Ellipse cx={50} cy={20} rx={7} ry={3} fill={dk} stroke={STROKE} strokeWidth={SW2} />
        </G>
      );

    case 5: // Afro – the afro sits behind AND beside the head, no cap needed on top
      return null; // Afro is rendered differently (see Hair component)

    case 6: // Tresses – cap + braid texture on back panels
      return (
        <G>
          <Path d={HAIR_CAP} fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          <Path d="M32 22 Q50 17 68 22 Q58 19 50 18 Q42 19 32 22Z" fill={lt} opacity={0.4} />
          {/* braid segment marks on the back panels */}
          <Path d="M19 54 Q22 58 19 62" stroke={dk} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.5} />
          <Path d="M19 62 Q22 66 19 70" stroke={dk} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.5} />
          <Path d="M19 70 Q22 74 19 78" stroke={dk} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.5} />
          <Path d="M81 54 Q78 58 81 62" stroke={dk} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.5} />
          <Path d="M81 62 Q78 66 81 70" stroke={dk} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.5} />
          <Path d="M81 70 Q78 74 81 78" stroke={dk} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.5} />
        </G>
      );

    case 7: // Bouclé
      return (
        <G>
          {/* base cap */}
          <Path d="M24 44 Q50 16 76 44 Q72 22 50 20 Q28 22 24 44Z" fill={color} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
          {/* curl balls along the hairline – carefully placed ABOVE y=44 */}
          <Circle cx={26} cy={40} r={7} fill={color} stroke={STROKE} strokeWidth={SW2} />
          <Circle cx={36} cy={31} r={8} fill={color} stroke={STROKE} strokeWidth={SW2} />
          <Circle cx={50} cy={27} r={8} fill={color} stroke={STROKE} strokeWidth={SW2} />
          <Circle cx={64} cy={31} r={8} fill={color} stroke={STROKE} strokeWidth={SW2} />
          <Circle cx={74} cy={40} r={7} fill={color} stroke={STROKE} strokeWidth={SW2} />
          {/* highlights */}
          <Circle cx={34} cy={28} r={2.5} fill={lt} opacity={0.4} />
          <Circle cx={50} cy={24} r={3} fill={lt} opacity={0.4} />
          <Circle cx={66} cy={28} r={2.5} fill={lt} opacity={0.4} />
        </G>
      );

    default:
      return null;
  }
}

// ─── Afro is special: drawn around the head, split before/after ──────────────

function AfroBehind({ color }: { color: string }) {
  return (
    <G>
      <Ellipse cx={50} cy={44} rx={34} ry={30} fill={color} stroke={STROKE} strokeWidth={SW} />
      <Ellipse cx={18} cy={46} rx={11} ry={12} fill={color} stroke={STROKE} strokeWidth={SW2} />
      <Ellipse cx={82} cy={46} rx={11} ry={12} fill={color} stroke={STROKE} strokeWidth={SW2} />
    </G>
  );
}

function AfroFront({ color }: { color: string }) {
  const lt = lighten(color, 28);
  return (
    <G>
      {/* subtle highlight patches */}
      <Ellipse cx={34} cy={38} rx={7} ry={8} fill={lt} opacity={0.18} />
      <Ellipse cx={50} cy={26} rx={12} ry={9} fill={lt} opacity={0.18} />
      <Ellipse cx={66} cy={38} rx={7} ry={8} fill={lt} opacity={0.18} />
    </G>
  );
}

// ─── Eyebrows ─────────────────────────────────────────────────────────────────

function Eyebrows({ style, hairColor }: { style: number; hairColor: string }) {
  const c = darken(hairColor, 55);
  switch (style) {
    case 0: // Naturel
      return (
        <G>
          <Path d="M33 51 Q40 47 46 50" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
          <Path d="M54 50 Q60 47 67 51" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
        </G>
      );
    case 1: // Arqué
      return (
        <G>
          <Path d="M33 53 Q39 46 46 50" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
          <Path d="M54 50 Q61 46 67 53" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
        </G>
      );
    case 2: // Froncé (inner brows lower)
      return (
        <G>
          <Path d="M33 50 Q39 53 46 50" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
          <Path d="M54 50 Q61 53 67 50" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
        </G>
      );
    case 3: // Épais
      return (
        <G>
          <Path d="M32 51 Q40 47 47 50" stroke={c} strokeWidth={3} fill="none" strokeLinecap="round" />
          <Path d="M53 50 Q60 47 68 51" stroke={c} strokeWidth={3} fill="none" strokeLinecap="round" />
        </G>
      );
    default:
      return null;
  }
}

// ─── Eyes ─────────────────────────────────────────────────────────────────────

function Eyes({ style, eyeColor }: { style: number; eyeColor: string }) {
  const safe = eyeColor || '#5C3A1E';
  const dk = darken(safe, 35);

  switch (style) {
    case 0: // Normal
      return (
        <G>
          <Ellipse cx={39} cy={56} rx={6} ry={6} fill="white" stroke={STROKE} strokeWidth={SW2} />
          <Ellipse cx={39} cy={56} rx={3.5} ry={3.5} fill={safe} />
          <Ellipse cx={39} cy={56} rx={2} ry={2} fill={dk} />
          <Circle cx={41} cy={54} r={1.5} fill="white" />
          <Ellipse cx={61} cy={56} rx={6} ry={6} fill="white" stroke={STROKE} strokeWidth={SW2} />
          <Ellipse cx={61} cy={56} rx={3.5} ry={3.5} fill={safe} />
          <Ellipse cx={61} cy={56} rx={2} ry={2} fill={dk} />
          <Circle cx={63} cy={54} r={1.5} fill="white" />
        </G>
      );
    case 1: // Heureux / plissé
      return (
        <G>
          <Path d="M33 56 Q39 50 45 56" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
          <Path d="M55 56 Q61 50 67 56" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
        </G>
      );
    case 2: // Triste
      return (
        <G>
          <Ellipse cx={39} cy={57} rx={6} ry={6} fill="white" stroke={STROKE} strokeWidth={SW2} />
          <Ellipse cx={39} cy={58} rx={3.5} ry={3.5} fill={safe} />
          <Ellipse cx={39} cy={58} rx={2} ry={2} fill={dk} />
          <Circle cx={41} cy={55} r={1.5} fill="white" />
          <Ellipse cx={61} cy={57} rx={6} ry={6} fill="white" stroke={STROKE} strokeWidth={SW2} />
          <Ellipse cx={61} cy={58} rx={3.5} ry={3.5} fill={safe} />
          <Ellipse cx={61} cy={58} rx={2} ry={2} fill={dk} />
          <Circle cx={63} cy={55} r={1.5} fill="white" />
        </G>
      );
    case 3: // Clin d'oeil
      return (
        <G>
          {/* left eye normal */}
          <Ellipse cx={39} cy={56} rx={6} ry={6} fill="white" stroke={STROKE} strokeWidth={SW2} />
          <Ellipse cx={39} cy={56} rx={3.5} ry={3.5} fill={safe} />
          <Ellipse cx={39} cy={56} rx={2} ry={2} fill={dk} />
          <Circle cx={41} cy={54} r={1.5} fill="white" />
          {/* right eye – wink */}
          <Path d="M55 56 Q61 50 67 56" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
          <Path d="M57 54 L56 51" stroke={STROKE} strokeWidth={0.8} strokeLinecap="round" />
          <Path d="M61 53 L61 50" stroke={STROKE} strokeWidth={0.8} strokeLinecap="round" />
          <Path d="M65 54 L66 51" stroke={STROKE} strokeWidth={0.8} strokeLinecap="round" />
        </G>
      );
    default:
      return null;
  }
}

// ─── Nose ─────────────────────────────────────────────────────────────────────

function Nose({ style, skinColor }: { style: number; skinColor: string }) {
  const s = darken(skinColor, 28);
  switch (style) {
    case 0:
      return <Path d="M48 63 Q50 67 52 63" stroke={s} strokeWidth={1.5} fill="none" strokeLinecap="round" />;
    case 1:
      return (
        <G>
          <Path d="M47 60 Q50 68 53 60" stroke={s} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <Path d="M44 66 Q50 69 56 66" stroke={s} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        </G>
      );
    case 2:
      return (
        <G>
          <Path d="M45 58 Q50 70 55 58" stroke={s} strokeWidth={2} fill="none" strokeLinecap="round" />
          <Ellipse cx={45} cy={67} rx={3.5} ry={2.5} fill={s} opacity={0.45} />
          <Ellipse cx={55} cy={67} rx={3.5} ry={2.5} fill={s} opacity={0.45} />
        </G>
      );
    default:
      return null;
  }
}

// ─── Mouth ────────────────────────────────────────────────────────────────────

function Mouth({ style }: { style: number }) {
  switch (style) {
    case 0: // Sourire doux
      return <Path d="M42 74 Q50 82 58 74" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />;
    case 1: // Grand sourire avec dents
      return (
        <G>
          <Path d="M38 72 Q50 87 62 72 Q56 84 50 86 Q44 84 38 72Z" fill={STROKE} />
          <Path d="M40 75 Q50 85 60 75 Q55 83 50 84 Q45 83 40 75Z" fill="white" />
          <Path d="M38 72 Q50 79 62 72" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
          <Path d="M50 79 L50 85" stroke={STROKE} strokeWidth={1} opacity={0.25} />
        </G>
      );
    case 2: // Sourire léger
      return <Path d="M44 74 Q50 80 56 74" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />;
    case 3: // Neutre
      return <Path d="M44 76 Q50 78 56 76" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />;
    case 4: // Triste
      return <Path d="M42 78 Q50 72 58 78" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />;
    default:
      return null;
  }
}

// ─── Facial Hair ──────────────────────────────────────────────────────────────

function FacialHair({ style, color }: { style: number; color: string }) {
  const dk = darken(color, 20);
  switch (style) {
    case 0: return null;
    case 1: // Barbe courte
      return (
        <G>
          <Path
            d="M33 76 Q50 90 67 76 Q60 85 50 87 Q40 85 33 76Z"
            fill={color} stroke={STROKE} strokeWidth={SW2} strokeLinejoin="round" opacity={0.9}
          />
          <Path d="M36 79 Q50 87 64 79" stroke={dk} strokeWidth={0.8} fill="none" opacity={0.35} />
        </G>
      );
    case 2: // Barbe complète
      return (
        <G>
          <Path
            d="M28 72 Q50 96 72 72 Q64 88 50 92 Q36 88 28 72Z"
            fill={color} stroke={STROKE} strokeWidth={SW2} strokeLinejoin="round"
          />
          {/* moustache wings */}
          <Path d="M34 70 Q40 66 46 70" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
          <Path d="M54 70 Q60 66 66 70" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
          <Path d="M32 75 Q50 88 68 75" stroke={dk} strokeWidth={0.8} fill="none" opacity={0.3} />
        </G>
      );
    case 3: // Moustache fine
      return (
        <Path
          d="M42 70 Q47 76 50 73 Q53 76 58 70 Q53 75 50 73 Q47 75 42 70Z"
          fill={color} stroke={STROKE} strokeWidth={SW2} strokeLinejoin="round"
        />
      );
    case 4: // Moustache épaisse
      return (
        <Path
          d="M38 69 Q46 78 50 74 Q54 78 62 69 Q54 76 50 73 Q46 76 38 69Z"
          fill={color} stroke={STROKE} strokeWidth={SW2} strokeLinejoin="round"
        />
      );
    default:
      return null;
  }
}

// ─── Accessory ────────────────────────────────────────────────────────────────

function Accessory({ style }: { style: number }) {
  switch (style) {
    case 0: return null;
    case 1: // Lunettes rondes
      return (
        <G>
          <Circle cx={39} cy={56} r={8} fill="white" fillOpacity={0.12} stroke={STROKE} strokeWidth={SW} />
          <Circle cx={61} cy={56} r={8} fill="white" fillOpacity={0.12} stroke={STROKE} strokeWidth={SW} />
          <Path d="M47 56 Q50 55 53 56" stroke={STROKE} strokeWidth={1.2} fill="none" />
          <Path d="M14 56 L31 56" stroke={STROKE} strokeWidth={1.2} />
          <Path d="M69 56 L86 56" stroke={STROKE} strokeWidth={1.2} />
        </G>
      );
    case 2: // Lunettes carrées
      return (
        <G>
          <Rect x={30} y={50} width={20} height={14} rx={3} fill="white" fillOpacity={0.12} stroke={STROKE} strokeWidth={SW} />
          <Rect x={50} y={50} width={20} height={14} rx={3} fill="white" fillOpacity={0.12} stroke={STROKE} strokeWidth={SW} />
          <Path d="M50 57 Q50 56 50 57" stroke={STROKE} strokeWidth={1.2} fill="none" />
          <Path d="M14 57 L30 57" stroke={STROKE} strokeWidth={1.2} />
          <Path d="M70 57 L86 57" stroke={STROKE} strokeWidth={1.2} />
        </G>
      );
    case 3: // Lunettes de soleil
      return (
        <G>
          <Rect x={28} y={50} width={24} height={14} rx={7} fill="#111" fillOpacity={0.92} stroke={STROKE} strokeWidth={SW} />
          <Rect x={48} y={50} width={24} height={14} rx={7} fill="#111" fillOpacity={0.92} stroke={STROKE} strokeWidth={SW} />
          <Path d="M31 53 Q40 51 49 53" stroke="#555" strokeWidth={1} fill="none" opacity={0.45} />
          <Path d="M51 53 Q60 51 69 53" stroke="#555" strokeWidth={1} fill="none" opacity={0.45} />
          <Path d="M52 57 Q50 57 48 57" stroke={STROKE} strokeWidth={1.2} fill="none" />
          <Path d="M13 57 L28 57" stroke={STROKE} strokeWidth={1.2} />
          <Path d="M72 57 L87 57" stroke={STROKE} strokeWidth={1.2} />
        </G>
      );
    case 4: // Chapeau – drawn as accessory (replaces hair cap visually)
      return (
        <G>
          {/* brim */}
          <Rect x={18} y={40} width={64} height={7} rx={3.5} fill="#1a1a1a" stroke="#333" strokeWidth={1} />
          {/* body */}
          <Rect x={28} y={12} width={44} height={30} rx={5} fill="#1a1a1a" stroke="#333" strokeWidth={1} />
          {/* band */}
          <Rect x={28} y={34} width={44} height={6} rx={2} fill="#333" />
          {/* shine */}
          <Path d="M31 16 Q50 13 69 16" stroke="#444" strokeWidth={1.2} fill="none" opacity={0.45} />
        </G>
      );
    default:
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AvatarSvg({ config, size = 160 }: { config: AvatarConfig; size?: number }) {
  const {
    skinColor = '#F5C9A0',
    hairStyle = 1,
    hairColor = '#C8832A',
    eyeStyle = 0,
    eyeColor = '#5C3A1E',
    eyebrowStyle = 0,
    noseStyle = 0,
    mouthStyle = 0,
    facialHairStyle = 0,
    facialHairColor = '#C8832A',
    accessoryStyle = 0,
    clotheColor = '#6B21A8',
  } = config;

  const skinDark = darken(skinColor, 18);
  const skinLight = lighten(skinColor, 14);

  const isAfro = hairStyle === 5;
  const hasHat = accessoryStyle === 4;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Background circle */}
      <Circle cx={50} cy={50} r={50} fill="#F0E6D3" />

      {/* Clothes / collar */}
      <Path
        d="M10 100 Q18 80 50 77 Q82 80 90 100Z"
        fill={clotheColor} stroke={STROKE} strokeWidth={SW}
      />

      {/* Neck */}
      <Rect x={43} y={78} width={14} height={12} rx={5}
        fill={skinColor} stroke={STROKE} strokeWidth={SW} />

      {/* ── PHASE A: hair that goes BEHIND the head ────────────────────── */}
      {!isAfro && <HairBackPanels style={hairStyle} color={hairColor} />}
      {isAfro && <AfroBehind color={hairColor} />}

      {/* ── Head ──────────────────────────────────────────────────────────── */}
      <Ellipse cx={50} cy={55} rx={27} ry={28}
        fill={skinColor} stroke={STROKE} strokeWidth={SW} />

      {/* Cheek shadows */}
      <Path d="M24 62 Q26 72 30 79" fill={skinDark} opacity={0.1} />
      <Path d="M76 62 Q74 72 70 79" fill={skinDark} opacity={0.1} />

      {/* Forehead highlight */}
      <Ellipse cx={42} cy={44} rx={10} ry={6} fill={skinLight} opacity={0.2} />

      {/* Ears */}
      <Ellipse cx={23} cy={58} rx={5} ry={6}
        fill={skinColor} stroke={STROKE} strokeWidth={SW} />
      <Ellipse cx={23} cy={58} rx={2.5} ry={3.5} fill={skinDark} opacity={0.12} />
      <Ellipse cx={77} cy={58} rx={5} ry={6}
        fill={skinColor} stroke={STROKE} strokeWidth={SW} />
      <Ellipse cx={77} cy={58} rx={2.5} ry={3.5} fill={skinDark} opacity={0.12} />

      {/* ── PHASE B: hair that sits ON TOP of the head ─────────────────── */}
      {!isAfro && !hasHat && <HairFrontCap style={hairStyle} color={hairColor} />}
      {isAfro && <AfroFront color={hairColor} />}

      {/* Hat (replaces hair cap, drawn after head so it sits on top) */}
      {hasHat && (
        <G>
          {/* Show a hint of hair under the brim if hairStyle != 0 */}
          {hairStyle !== 0 && (
            <Path d="M27 42 Q50 22 73 42 Q68 26 50 24 Q32 26 27 42Z" fill={hairColor} />
          )}
          <Accessory style={4} />
        </G>
      )}

      {/* ── Face elements ─────────────────────────────────────────────────── */}

      <Eyebrows style={eyebrowStyle} hairColor={hairColor} />
      <Eyes style={eyeStyle} eyeColor={eyeColor} />
      <Nose style={noseStyle} skinColor={skinColor} />

      {/* Cheek blush */}
      <Ellipse cx={32} cy={65} rx={7} ry={4.5} fill="#E87070" opacity={0.2} />
      <Ellipse cx={68} cy={65} rx={7} ry={4.5} fill="#E87070" opacity={0.2} />

      <Mouth style={mouthStyle} />
      <FacialHair style={facialHairStyle} color={facialHairColor} />

      {/* Glasses (only non-hat accessories drawn here) */}
      {accessoryStyle !== 4 && <Accessory style={accessoryStyle} />}
    </Svg>
  );
}