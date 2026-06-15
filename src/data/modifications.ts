import FlaskIcon from '../assets/modifications/flask.svg?react'
import LockpickIcon from '../assets/modifications/lockpick.svg?react'
import FishingRodIcon from '../assets/modifications/fishing_rod.svg?react'
import LegExoskeletonIcon from '../assets/modifications/leg_exoskeleton.svg?react'
import MechanicalArmIcon from '../assets/modifications/mechanical_arm.svg?react'
import GryadetsIcon from '../assets/modifications/gryadets.svg?react'
import MechanicalHeartIcon from '../assets/modifications/mechanical_heart.svg?react'
import BayonetIcon from '../assets/modifications/bayonet.svg?react'
import JetpackIcon from '../assets/modifications/jetpack.svg?react'
import MortarIcon from '../assets/modifications/mortar.svg?react'
import OpticalEyeIcon from '../assets/modifications/optical_eye.svg?react'
import DefenderHelmetIcon from '../assets/modifications/defender_helmet.svg?react'
import VorovaykaDroneIcon from '../assets/modifications/vorovayka_drone.svg?react'
import LuckyCloverIcon from '../assets/modifications/lucky_clover.svg?react'
import {
  ModificationNamespace,
  type ModificationItem,
} from '../models/modification'

export const modificationItemIcons: Record<
  ModificationNamespace,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  [ModificationNamespace.flask]: FlaskIcon,
  [ModificationNamespace.lockpick]: LockpickIcon,
  [ModificationNamespace.fishing_rod]: FishingRodIcon,
  [ModificationNamespace.leg_exoskeleton]: LegExoskeletonIcon,
  [ModificationNamespace.mechanical_arm]: MechanicalArmIcon,
  [ModificationNamespace.gryadets]: GryadetsIcon,
  [ModificationNamespace.mechanical_heart]: MechanicalHeartIcon,
  [ModificationNamespace.bayonet]: BayonetIcon,
  [ModificationNamespace.jetpack]: JetpackIcon,
  [ModificationNamespace.mortar]: MortarIcon,
  [ModificationNamespace.optical_eye]: OpticalEyeIcon,
  [ModificationNamespace.defender_helmet]: DefenderHelmetIcon,
  [ModificationNamespace.vorovayka_drone]: VorovaykaDroneIcon,
  [ModificationNamespace.lucky_clover]: LuckyCloverIcon,
}

export const modificationCollection: ModificationItem[] = [
  {
    name: ModificationNamespace.bayonet,
    title: 'Штык',
    purchase_price: 50,
    sale_price: 25,
    upgrade_price: null,
    type: 'fight',
  },
  {
    name: ModificationNamespace.flask,
    title: 'Фляга',
    purchase_price: 200,
    sale_price: 100,
    upgrade_price: null,
    type: 'survival',
  },
  {
    name: ModificationNamespace.lockpick,
    title: 'Отмычка',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: null,
    type: 'survival',
  },
  {
    name: ModificationNamespace.fishing_rod,
    title: 'Удочка',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: null,
    type: 'survival',
  },
  {
    name: ModificationNamespace.leg_exoskeleton,
    title: 'Экзоскелет ног',
    purchase_price: 200,
    sale_price: 100,
    upgrade_price: null,
    type: 'survival',
  },
  {
    name: ModificationNamespace.mechanical_arm,
    title: 'Механическая рука',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: 100,
    type: 'unique',
  },
  {
    name: ModificationNamespace.gryadets,
    title: 'Грядец',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: 100,
    type: 'unique',
  },
  {
    name: ModificationNamespace.mechanical_heart,
    title: 'Механическое сердце',
    purchase_price: 300,
    sale_price: 150,
    upgrade_price: null,
    type: 'survival',
  },
  {
    name: ModificationNamespace.jetpack,
    title: 'Реактивный ранец',
    purchase_price: 150,
    sale_price: 75,
    upgrade_price: null,
    type: 'fight',
  },
  {
    name: ModificationNamespace.mortar,
    title: 'Миномет',
    purchase_price: 200,
    sale_price: 100,
    upgrade_price: null,
    type: 'fight',
  },
  {
    name: ModificationNamespace.optical_eye,
    title: 'Оптический глаз',
    purchase_price: 250,
    sale_price: 125,
    upgrade_price: null,
    type: 'fight',
  },
  {
    name: ModificationNamespace.defender_helmet,
    title: 'Шлем защитника',
    purchase_price: 200,
    sale_price: 100,
    upgrade_price: null,
    type: 'fight',
  },
  {
    name: ModificationNamespace.vorovayka_drone,
    title: 'Дрон Воровайка',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: 200,
    type: 'unique',
  },
]

export const modificationTypeLabels: Record<string, string> = {
  fight: 'Боевая',
  survival: 'Выживание',
  unique: 'Можно прокачать',
  bunker: 'Бункерная',
}

export const modificationTypeColors: Record<string, string> = {
  fight: '#f87171',
  survival: '#60a5fa',
  unique: '#a78bfa',
  bunker: '#4ade80',
}
