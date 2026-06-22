import { InventoryNamespace } from '../models/inventory'
import hero1 from '../assets/heroes/hero1.png'
import hero2 from '../assets/heroes/hero2.png'
import hero3 from '../assets/heroes/hero3.png'
import hero4 from '../assets/heroes/hero4.png'
import hero5 from '../assets/heroes/hero5.png'
import hero6 from '../assets/heroes/hero6.png'
import hero7 from '../assets/heroes/hero7.png'
import hero8 from '../assets/heroes/hero8.png'
import hero9 from '../assets/heroes/hero9.png'

type HeroItem = {
  id: number
  name: string
  health: number
  armor: number
  movement: number
  satiety: number
  inventory: InventoryNamespace[]
  image: string
  cash: number
  trash: number
  access_anger?: boolean
  access_skulls?: boolean
}

export const heroesCollections: HeroItem[] = [
  {
    id: 1,
    name: 'Вещий',
    health: 20,
    armor: 10,
    image: hero1,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 50,
    trash: 1,
  },
  {
    id: 2,
    name: 'Тугр',
    health: 25,
    armor: 10,
    image: hero2,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
    ],
    movement: 5,
    satiety: 4,
    cash: 20,
    trash: 2,
  },
  {
    id: 3,
    name: 'Ловуша',
    health: 20,
    armor: 5,
    image: hero3,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.energy_bar,
      InventoryNamespace.smoke_grenade,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 100,
    trash: 0,
  },
  {
    id: 4,
    name: 'Техносолдат',
    health: 20,
    armor: 15,
    image: hero4,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.cryogen_grenade,
      InventoryNamespace.cryogen_grenade,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 200,
    trash: 4,
  },
  {
    id: 5,
    name: 'Беломория',
    health: 20,
    armor: 10,
    image: hero5,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 50,
    trash: 1,
  },

  {
    id: 6,
    name: 'Добротех',
    health: 20,
    armor: 20,
    image: hero6,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 0,
    trash: 6,
  },
  {
    id: 7,
    name: 'Девочка яга',
    health: 20,
    armor: 20,
    image: hero7,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
      InventoryNamespace.bandage,
    ],
    movement: 5,
    satiety: 4,
    cash: 100,
    trash: 2,
    access_skulls: true,
  },
  {
    id: 8,
    name: 'Богояр',
    health: 20,
    armor: 20,
    image: hero8,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
      InventoryNamespace.bandage,
    ],
    movement: 5,
    satiety: 4,
    cash: 150,
    trash: 0,
    access_anger: true,
  },
  {
    id: 9,
    name: 'Хидео',
    health: 30,
    armor: 0,
    image: hero9,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.stimulator,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 0,
    trash: 0,
  },
]
