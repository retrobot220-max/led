import LuckyCloverIcon from '../assets/modifications/lucky_clover.svg?react'
import SnowmanPendantIcon from '../assets/modifications/snowman_pendant.svg?react'
import HuntersHookIcon from '../assets/modifications/hunter_hook.svg?react'
import NightmareSkullIcon from '../assets/modifications/nightmare_skull.svg?react'
import {
  ModificationNamespace,
  type ModificationItem,
} from '../models/modification'

export const demoniacTrinketIcons: Partial<
  Record<
    ModificationNamespace,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  >
> = {
  [ModificationNamespace.lucky_clover]: LuckyCloverIcon,
  [ModificationNamespace.snowman_pendant]: SnowmanPendantIcon,
  [ModificationNamespace.hunters_hook]: HuntersHookIcon,
  [ModificationNamespace.nightmare_skull]: NightmareSkullIcon,
}

export const demoniacTrinketCollection: ModificationItem[] = [
  {
    name: ModificationNamespace.lucky_clover,
    title: 'Фартанутый клевер',
    purchase_price: 0,
    sale_price: null,
    upgrade_price: null,
    type: 'bunker',
    description:
      'Позволяет переводить обычную успешную атаку, без модификаторов, по себе на инициатора (1 раз за бой).',
  },
  {
    name: ModificationNamespace.snowman_pendant,
    title: 'Кулон снеговика',
    purchase_price: 0,
    sale_price: null,
    upgrade_price: null,
    type: 'bunker',
    description:
      'Затратив дополнительное действие, позволяет наложить негативный эффект обморожения на врага на его следующий ход (1 раз за бой).',
  },
  {
    name: ModificationNamespace.hunters_hook,
    title: 'Крюк охотника',
    purchase_price: 0,
    sale_price: null,
    upgrade_price: null,
    type: 'bunker',
    description:
      'Позволяет притянуть врага на одну клетку на любой дистанции и получить +2 урона к атаке на этом ходу по этой цели.\n\n' +
      'Необходимо затратить одно дополнительное действие (1 раз за бой).',
  },
  {
    name: ModificationNamespace.nightmare_skull,
    title: 'Череп кошмара',
    purchase_price: 0,
    sale_price: null,
    upgrade_price: null,
    type: 'bunker',
    description:
      '-1 к броскам врага, если он стоит на соседней или одной клетке с вами.',
  },
]
