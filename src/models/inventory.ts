export const InventoryNamespace = {
  preserves: 'preserves',
  fac: 'fac',
  stimulator: 'stimulator',
  smoke_grenade: 'smoke_grenade',
  lollipop: 'lollipop',
  bandage: 'bandage',
  energy_bar: 'energy_bar',
  armor_plate: 'armor_plate',
  incendiary_grenade: 'incendiary_grenade',
  frag_grenade: 'frag_grenade',
  cryogen_grenade: 'cryogen_grenade',
  portal_grenade: 'portal_grenade',
  common_fish: 'common_fish',
  rare_fish: 'rare_fish',
  legendary_fish: 'legendary_fish',
} as const

export type InventoryNamespace =
  (typeof InventoryNamespace)[keyof typeof InventoryNamespace]

export type InventoryType = 'food' | 'medicine' | 'grenade' | 'fish'

export interface InventoryItem {
  name: InventoryNamespace
  type: InventoryType
  title: string
  purchase_price: number | null
  sale_price: number | null
  heal?: number
  food?: number
}
