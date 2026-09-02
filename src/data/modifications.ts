import FlaskIcon from '../assets/modifications/flask.svg?react'
import LockpickIcon from '../assets/modifications/lockpick.svg?react'
import FishingRodIcon from '../assets/modifications/fishing_rod.svg?react'
import LegExoskeletonIcon from '../assets/modifications/leg_exoskeleton.svg?react'
import MechanicalArmIcon from '../assets/modifications/mechanical_arm.svg?react'
import GryadetsIcon from '../assets/modifications/gryadets.svg?react'
import MechanicalHeartIcon from '../assets/modifications/mechanical_heart.svg?react'
import JetpackIcon from '../assets/modifications/jetpack.svg?react'
import MortarIcon from '../assets/modifications/mortar.svg?react'
import OpticalEyeIcon from '../assets/modifications/optical_eye.svg?react'
import DefenderHelmetIcon from '../assets/modifications/defender_helmet.svg?react'
import VorovaykaDroneIcon from '../assets/modifications/vorovayka_drone.svg?react'
import {
  ModificationNamespace,
  type ModificationItem,
} from '../models/modification'

export const modificationItemIcons: Partial<
  Record<
    ModificationNamespace,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  >
> = {
  [ModificationNamespace.flask]: FlaskIcon,
  [ModificationNamespace.lockpick]: LockpickIcon,
  [ModificationNamespace.fishing_rod]: FishingRodIcon,
  [ModificationNamespace.leg_exoskeleton]: LegExoskeletonIcon,
  [ModificationNamespace.mechanical_arm]: MechanicalArmIcon,
  [ModificationNamespace.gryadets]: GryadetsIcon,
  [ModificationNamespace.mechanical_heart]: MechanicalHeartIcon,
  [ModificationNamespace.jetpack]: JetpackIcon,
  [ModificationNamespace.mortar]: MortarIcon,
  [ModificationNamespace.optical_eye]: OpticalEyeIcon,
  [ModificationNamespace.defender_helmet]: DefenderHelmetIcon,
  [ModificationNamespace.vorovayka_drone]: VorovaykaDroneIcon,
}

export const modificationCollection: ModificationItem[] = [
  {
    name: ModificationNamespace.flask,
    title: 'Фляга',
    purchase_price: 200,
    sale_price: 100,
    upgrade_price: 200,
    type: 'survival',
    description:
      'Уменьшает количество истощения сытости в начале дня на 1.\n\n' +
      '(+) Способности героя, где необходимо затратить сытость, уменьшаются на 1.',
  },
  {
    name: ModificationNamespace.lockpick,
    title: 'Набор отмычек',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: null,
    type: 'survival',
    description:
      'При ограблении банка +50 кредитов после каждой пройденной фазы. При побеге из тюрьмы позволяет сделать +-1 к броску. Везде, где упоминается взлом, вы получаете +1 к броску.',
  },
  {
    name: ModificationNamespace.fishing_rod,
    title: 'Удочка',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: 100,
    type: 'survival',
    description:
      'Даёт возможность рыбачить.\n\n' +
      '(+) +1 к броску за каждую единицу остатка выносливости.',
  },
  {
    name: ModificationNamespace.leg_exoskeleton,
    title: 'Экзоскелет ног',
    purchase_price: 200,
    sale_price: 100,
    upgrade_price: 200,
    type: 'survival',
    description:
      '+1 ОД в начале дня.\n\n' + '(+) +1 дополнительное действие в бою.',
  },
  {
    name: ModificationNamespace.mechanical_arm,
    title: 'Механическая рука',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: 100,
    type: 'survival',
    description:
      '+1 карта на руке.\n\n' + '(+) +2 карты на руке и +1 компаньон.',
  },
  {
    name: ModificationNamespace.gryadets,
    title: 'Грядец',
    purchase_price: 100,
    sale_price: 50,
    upgrade_price: 100,
    type: 'survival',
    description:
      'Вы можете посмотреть 1 верхнюю карту из колоды природы (1 раз в день).\n\n' +
      '(+) Позволяет просмотреть 2 карты из колоды природы и можно смотреть на одну карту заданий больше (1 раз в день).',
  },
  {
    name: ModificationNamespace.mechanical_heart,
    title: 'Механическое сердце',
    purchase_price: 300,
    sale_price: 150,
    upgrade_price: null,
    type: 'survival',
    description:
      'В момент смерти сбросьте эту модификацию и потратьте столько хлама, сколько считаете нужным. Один хлам равен 5 здоровья. Если вы не затратили хлам, то у вас будет 1 здоровье',
  },
  {
    name: ModificationNamespace.jetpack,
    title: 'Реактивный ранец',
    purchase_price: 150,
    sale_price: 75,
    upgrade_price: null,
    type: 'fight',
    description:
      'Позволяет перелететь одну клетку на поле боя затратив одно дополнительное действие. Если у вас есть оружие ближнего боя или свободный слот (кулак) и ваш перелёт будет иметь близкую дистанцию к цели, то вы наносите гарантированный урон. (1 раз за бой)',
  },
  {
    name: ModificationNamespace.mortar,
    title: 'Миномёт',
    purchase_price: 200,
    sale_price: 100,
    upgrade_price: null,
    type: 'fight',
    description:
      'Позволяет запускать осколочные, зажигательные и криогенные гранаты на любую дистанцию, затратив дополнительное действие. ' +
      'При этом шанс всегда фиксированный: (2-6).',
  },
  {
    name: ModificationNamespace.optical_eye,
    title: 'Оптический глаз',
    purchase_price: 250,
    sale_price: 125,
    upgrade_price: null,
    type: 'fight',
    description: '+1 к шансу при стрельбе.',
  },
  {
    name: ModificationNamespace.defender_helmet,
    title: 'Шлем защитника',
    purchase_price: 150,
    sale_price: 75,
    upgrade_price: 150,
    type: 'fight',
    description:
      '+10 к максимальной броне.\n\n' + '(+) +20 к максимальной броне.',
  },
  {
    name: ModificationNamespace.vorovayka_drone,
    title: 'Дрон Воровайка',
    purchase_price: 150,
    sale_price: 75,
    upgrade_price: 200,
    type: 'survival',
    description:
      'Даёт возможность воровать предметы у игроков.\n\n' +
      '(+) +1 к броску, можно использовать в бою за одно дополнительное действие (до первого успешного воровства в бою).',
  },
]
export const modificationTypeLabels: Record<string, string> = {
  fight: 'Боевая',
  survival: 'Выживание',
  unique: 'Квадрига',
  bunker: 'Бункерная',
}

export const modificationTypeColors: Record<string, string> = {
  fight: '#f87171',
  survival: '#60a5fa',
  unique: '#a78bfa',
  bunker: '#4ade80',
}
