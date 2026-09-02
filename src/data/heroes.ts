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
import hero10 from '../assets/heroes/hero10.png'
import hero11 from '../assets/heroes/hero11.png'
import hero12 from '../assets/heroes/hero12.png'

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
  quote: string
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
    quote: '«Я вижу будущее, недолго вам осталось»',
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
    quote: '«Выживает тот, кто слышит мир вокруг себя»',
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
    quote: '«Потешные ублюдки, делают вид, что не являются злом»',
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
    quote: '«Я переживал более худшее»',
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
    quote: '«Привет, дурилы! Готовы к расправе?!»',
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
    quote: '«Польза, прочность, несущая смерть»',
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
    quote: '«Я пришла за теми, кто удумал истребить нас»',
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
    quote: '*Прерывистое, неровное дыхание*',
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
    quote: '«あなたは無力です» [Вы беспомощны] *Громкий смех*',
  },
  {
    id: 10,
    name: 'Георгий',
    health: 20,
    armor: 20,
    image: hero10,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 150,
    trash: 0,
    quote: '«Бог простит, я нет»',
  },
  {
    id: 11,
    name: 'Услада',
    health: 30,
    armor: 10,
    image: hero11,
    inventory: [
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.smoke_grenade,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 100,
    trash: 6,
    quote: '«Люд земной, я помогу чем смогу»',
  },
  {
    id: 12,
    name: 'Морок',
    health: 40,
    armor: 0,
    image: hero12,
    inventory: [
      InventoryNamespace.energy_bar,
      InventoryNamespace.preserves,
      InventoryNamespace.preserves,
      InventoryNamespace.fac,
      InventoryNamespace.stimulator,
      InventoryNamespace.stimulator,
      InventoryNamespace.bandage,
      InventoryNamespace.bandage,
    ],
    movement: 4,
    satiety: 4,
    cash: 200,
    trash: 0,
    quote: '«Ты мой друг, я твой друг»',
  },
]
