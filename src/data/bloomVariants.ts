export interface BloomVariant {
  id: string
  petalBase: string
  petalShadow: string
  petalHighlight: string
  centerOuter: string
  centerInner: string
  stem: string
  leafBase: string
  leafShadow: string
  outline: string
}

const bloomColorways: Omit<BloomVariant, 'id'>[] = [
  {
    petalBase: '#F6D94A',
    petalShadow: '#E5BE2A',
    petalHighlight: '#FFF3B1',
    centerOuter: '#F3B21A',
    centerInner: '#FFD84A',
    stem: '#6F9A63',
    leafBase: '#5D8956',
    leafShadow: '#4C7445',
    outline: '#3E5138',
  },
  {
    petalBase: '#FFBBD0',
    petalShadow: '#F69AB9',
    petalHighlight: '#FFE2EC',
    centerOuter: '#F3AA2B',
    centerInner: '#FFD96B',
    stem: '#6E9762',
    leafBase: '#608A56',
    leafShadow: '#4C7344',
    outline: '#3E5138',
  },
  {
    petalBase: '#BEE0FF',
    petalShadow: '#91C2EE',
    petalHighlight: '#E6F4FF',
    centerOuter: '#EEA826',
    centerInner: '#FFD56E',
    stem: '#709A64',
    leafBase: '#5C8653',
    leafShadow: '#4A7043',
    outline: '#3E5138',
  },
  {
    petalBase: '#D8C6F4',
    petalShadow: '#BEA6E4',
    petalHighlight: '#EEE4FF',
    centerOuter: '#F0AB25',
    centerInner: '#FFD96D',
    stem: '#709862',
    leafBase: '#5E8755',
    leafShadow: '#4A7042',
    outline: '#3E5138',
  },
]

export function createRandomBloomVariant(): BloomVariant {
  const colorway = bloomColorways[Math.floor(Math.random() * bloomColorways.length)]
  return {
    id: `bloom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...colorway,
  }
}
