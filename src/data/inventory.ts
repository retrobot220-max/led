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
  },
  {
    name: InventoryNamespace.lollipop,
    type: 'food',
    title: 'Леденец',
    purchase_price: 10,
    sale_price: 5,
  },
  {
    name: InventoryNamespace.smoke_grenade,
    type: 'grenade',
    title: 'Дымовая граната',
    purchase_price: 50,
    sale_price: 25,
  },
  {
    name: InventoryNamespace.stimulator,
    type: 'medicine',
    title: 'Стимулятор',
    purchase_price: 100,
    sale_price: 50,
  },
  {
    name: InventoryNamespace.bandage,
    type: 'medicine',
    title: 'Бинт',
    purchase_price: 30,
    sale_price: 15,
  },
  {
    name: InventoryNamespace.fac,
    type: 'medicine',
    title: 'КПП',
    purchase_price: 50,
    sale_price: 25,
  },
  {
    name: InventoryNamespace.energy_bar,
    type: 'food',
    title: 'Энергетический батончик',
    purchase_price: 30,
    sale_price: 15,
  },
  {
    name: InventoryNamespace.armor_plate,
    type: 'medicine',
    title: 'Бронепластина',
    purchase_price: 40,
    sale_price: 20,
  },
  {
    name: InventoryNamespace.incendiary_grenade,
    type: 'grenade',
    title: 'Зажигательная граната',
    purchase_price: 100,
    sale_price: 50,
  },
  {
    name: InventoryNamespace.frag_grenade,
    type: 'grenade',
    title: 'Осколочная граната',
    purchase_price: 100,
    sale_price: 50,
  },
  {
    name: InventoryNamespace.cryogen_grenade,
    type: 'grenade',
    title: 'Криогенная граната',
    purchase_price: 50,
    sale_price: 25,
  },
  {
    name: InventoryNamespace.portal_grenade,
    type: 'grenade',
    title: 'Телепортационная граната',
    purchase_price: 100,
    sale_price: 50,
  },
  {
    name: InventoryNamespace.common_fish,
    type: 'fish',
    title: 'Обычная рыба',
    purchase_price: 0,
    sale_price: 50,
  },
  {
    name: InventoryNamespace.rare_fish,
    type: 'fish',
    title: 'Редкая рыба',
    purchase_price: 0,
    sale_price: 100,
  },
  {
    name: InventoryNamespace.legendary_fish,
    type: 'fish',
    title: 'Легендарная рыба',
    purchase_price: 0,
    sale_price: 200,
  },
]
