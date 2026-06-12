export enum ModificationNamespace {
  flask = 'flask',
  lockpick = 'lockpick',
  fishing_rod = 'fishing_rod',
  leg_exoskeleton = 'leg_exoskeleton',
  mechanical_arm = 'mechanical_arm',
  gryadets = 'gryadets',
  mechanical_heart = 'mechanical_heart',
  bayonet = 'bayonet',
  jetpack = 'jetpack',
  mortar = 'mortar',
  optical_eye = 'optical_eye',
  defender_helmet = 'defender_helmet',
  vorovayka_drone = 'vorovayka_drone',
  lucky_clover = 'lucky_clover',
}

export interface ModificationItem {
  name: ModificationNamespace
  title: string
  purchase_price: number | null
  sale_price: number | null
  upgrade_price: number | null
  type: 'fight' | 'survival' | 'unique' | 'bunker'
}
