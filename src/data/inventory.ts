import type { InventoryItem } from '../models/inventory'
import { InventoryNamespace } from '../models/inventory'
import PreservesIcon from '../assets/inventory/preserves.svg?react'
import StimulatorIcon from '../assets/inventory/stimulator.svg?react'
import FacIcon from '../assets/inventory/fac.svg?react'
import SmokeGrenadeIcon from '../assets/inventory/smoke_grenade.svg?react'
import LollipopIcon from '../assets/inventory/lollipop.svg?react'
import BandageIcon from '../assets/inventory/bandage.svg?react'
import ArmorPlateIcon from '../assets/inventory/armor_plate.svg?react'
import EnergyBarIcon from '../assets/inventory/energy_bar.svg?react'
import IncendiaryGrenadeIcon from '../assets/inventory/incendiary_grenade.svg?react'
import FragGrenadeIcon from '../assets/inventory/frag_grenade.svg?react'
import CryogenGrenadeIcon from '../assets/inventory/cryogen_grenade.svg?react'
import PortalGrenadeIcon from '../assets/inventory/portal_grenade.svg?react'
import CommonFishIcon from '../assets/inventory/common_fish.svg?react'
import RareFishIcon from '../assets/inventory/rare_fish.svg?react'
import LegendaryFishIcon from '../assets/inventory/legendary_fish.svg?react'

export const inventoryItemIcons: Record<
  InventoryNamespace,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  [InventoryNamespace.preserves]: PreservesIcon,
  [InventoryNamespace.fac]: FacIcon,
  [InventoryNamespace.stimulator]: StimulatorIcon,
  [InventoryNamespace.smoke_grenade]: SmokeGrenadeIcon,
  [InventoryNamespace.lollipop]: LollipopIcon,
  [InventoryNamespace.bandage]: BandageIcon,
  [InventoryNamespace.energy_bar]: EnergyBarIcon,
  [InventoryNamespace.armor_plate]: ArmorPlateIcon,
  [InventoryNamespace.incendiary_grenade]: IncendiaryGrenadeIcon,
  [InventoryNamespace.frag_grenade]: FragGrenadeIcon,
  [InventoryNamespace.cryogen_grenade]: CryogenGrenadeIcon,
  [InventoryNamespace.portal_grenade]: PortalGrenadeIcon,
  common_fish: CommonFishIcon,
  rare_fish: RareFishIcon,
  legendary_fish: LegendaryFishIcon,
}

export const inventoryTypeLabels: Record<string, string> = {
  food: 'Еда',
  medicine: 'Медицина',
  grenade: 'Граната',
  fish: 'Еда',
}

export const inventoryTypeColors: Record<string, string> = {
  food: '#fbbf24',
  medicine: '#4ade80',
  grenade: '#f87171',
  fish: '#fbbf24',
}

export const inventoryCollection: InventoryItem[] = [
  {
    name: InventoryNamespace.preserves,
    type: 'food',
    title: 'Консервы',
    purchase_price: 20,
    sale_price: 10,
    food: 4,
    description: '+4 сытости',
  },
  {
    name: InventoryNamespace.energy_bar,
    type: 'food',
    title: 'Энергетический батончик',
    purchase_price: 30,
    sale_price: 15,
    food: 1,
    stamina_bonus: 1,
    od_bonus: 1,
    description: '+1 сытости\n+1 ОД до конца хода',
  },
  {
    name: InventoryNamespace.lollipop,
    type: 'food',
    title: 'Леденец',
    purchase_price: 10,
    sale_price: 5,
    food: 1,
    description: '+1 сытости',
  },
  {
    name: InventoryNamespace.fac,
    type: 'medicine',
    title: 'КПП',
    purchase_price: 50,
    sale_price: 25,
    heal: 10,
    description: '+10 здоровья\nИзбавляет от всех негативных эффектов.',
  },
  {
    name: InventoryNamespace.stimulator,
    type: 'medicine',
    title: 'Стимулятор',
    purchase_price: 100,
    sale_price: 50,
    heal: 20,
    description: '+20 здоровья',
  },
  {
    name: InventoryNamespace.bandage,
    type: 'medicine',
    title: 'Бинт',
    purchase_price: 30,
    sale_price: 15,
    heal: 5,
    description: '+5 здоровья',
  },
  {
    name: InventoryNamespace.armor_plate,
    type: 'medicine',
    title: 'Бронепластина',
    purchase_price: 40,
    sale_price: 20,
    armor_bonus: 10,
    description: '+10 брони',
  },
  {
    name: InventoryNamespace.incendiary_grenade,
    type: 'grenade',
    title: 'Зажигательная граната',
    purchase_price: 100,
    sale_price: 50,
    description:
      '(2-6) |близко| / (3-6) |средне|\n\n' +
      'Накладывает негативный эффект горения на всех находящихся на клетке.\n\n' +
      'Далее остаётся на текущей клетке следующий ход. Те, кто находятся на этой клетке или наступают на неё, получают негативный эффект горения.\n\n' +
      'Критическая неудача (1): граната взрывается на вашей клетке и накладывает горение на всех, кто на ней находится.',
  },
  {
    name: InventoryNamespace.frag_grenade,
    type: 'grenade',
    title: 'Осколочная граната',
    purchase_price: 100,
    sale_price: 50,
    description:
      '(2-6) |близко| / (3-6) |средне|\n\n' +
      'Наносит 8 урона по всем персонажам на клетке.\n\n' +
      'Критическая неудача (1): граната взрывается на вашей клетке с уроном 8.',
  },
  {
    name: InventoryNamespace.smoke_grenade,
    type: 'grenade',
    title: 'Дымовая граната',
    purchase_price: 50,
    sale_price: 25,
    description:
      'Сбросьте этот предмет и получите +2 при смывке на этом ходу.\n\n' +
      'После использования вы не можете стрелять на этом ходу.\n\n' +
      'На следующий ход оппонента -2 к броску, если он пытается по вам выстрелить.',
  },
  {
    name: InventoryNamespace.cryogen_grenade,
    type: 'grenade',
    title: 'Криогенная граната',
    purchase_price: 50,
    sale_price: 25,
    description:
      '(2-6) |близко| / (3-6) |средне|\n\n' +
      'Все находящиеся на клетке поражения получают негативный эффект обморожения.\n\n' +
      'Критическая неудача (1): граната взрывается на вашей клетке с тем же эффектом.',
  },
  {
    name: InventoryNamespace.portal_grenade,
    type: 'grenade',
    title: 'Портальная граната',
    purchase_price: 100,
    sale_price: 50,
    description:
      'Затратьте одно дополнительное действие и бросьте один шестигранный кубик. Выпавшее число равно дистанции телепортации относительно текущей клетки.\n\n' +
      'Исключения:\n' +
      '1 — остаётесь на месте.\n' +
      '6 — выберите любую клетку на поле боя для телепортации.',
  },
  {
    name: InventoryNamespace.common_fish,
    type: 'fish',
    title: 'Обычная рыба',
    purchase_price: 0,
    sale_price: null,
    description: '+3 сытости',
  },
  {
    name: InventoryNamespace.rare_fish,
    type: 'fish',
    title: 'Редкая рыба',
    purchase_price: 0,
    sale_price: null,
    description: '+5 сытости',
  },
  {
    name: InventoryNamespace.legendary_fish,
    type: 'fish',
    title: 'Легендарная рыба',
    purchase_price: 0,
    sale_price: null,
    description: '+макс. сытость',
  },
]
