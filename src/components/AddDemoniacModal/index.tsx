import { Modal, message } from 'antd'
import {
  demoniacTrinketCollection,
  demoniacTrinketIcons,
} from '../../data/demoniacTrinkets'
import type { ModificationItem } from '../../models/modification'
import { useHeroStore } from '../../store/heroStore'
import {
  AccentBar,
  ActionButton,
  ButtonsRow,
  Card,
  CardBody,
  DescParagraph,
  InfoRow,
  ItemDesc,
  ItemIcon,
  ItemName,
  ItemsList,
  PriceBadge,
} from '../AddModificationModal/styled'

interface Props {
  open: boolean
  onClose: () => void
}

const renderDescription = (text: string) => {
  const paragraphs = text
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <ItemDesc>
      {paragraphs.map((paragraph, idx) => (
        <DescParagraph key={idx}>
          {paragraph.split('\n').map((line, lineIdx) => (
            <div key={lineIdx}>{line}</div>
          ))}
        </DescParagraph>
      ))}
    </ItemDesc>
  )
}

export const AddDemoniacModal = ({ open, onClose }: Props) => {
  const money = useHeroStore((s) => s.money)
  const setMoney = useHeroStore((s) => s.setMoney)
  const setDemoniacTrinkets = useHeroStore((s) => s.setDemoniacTrinkets)

  const putIntoFreeSlot = (item: ModificationItem) => {
    let placed = false
    setDemoniacTrinkets((prev) => {
      const firstNullIndex = prev.findIndex((m) => m === null)
      if (firstNullIndex === -1) return prev
      placed = true
      const updated = [...prev]
      updated[firstNullIndex] = item
      return updated
    })
    return placed
  }

  const handleBuy = (item: ModificationItem) => {
    if (item.purchase_price === null || item.purchase_price === undefined)
      return
    if (money < (item.purchase_price ?? 0)) {
      message.warning('Недостаточно денег')
      return
    }
    if (!putIntoFreeSlot(item)) {
      message.warning('Нет свободных слотов для безделушек')
      return
    }
    setMoney(money - (item.purchase_price ?? 0))
    message.success('Безделушка успешно получена')
  }

  const handleTake = (item: ModificationItem) => {
    if (!putIntoFreeSlot(item)) {
      message.warning('Нет свободных слотов для безделушек')
      return
    }
    message.success('Безделушка успешно получена')
  }

  const items = demoniacTrinketCollection

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title='Добавить демоническую безделушку'
      destroyOnHidden
      styles={{ body: { padding: '8px 0' } }}
      width={860}
    >
      <ItemsList>
        {items.map((item) => {
          const Icon = demoniacTrinketIcons[item.name]
          const hasPrice =
            item.purchase_price !== null &&
            item.purchase_price !== undefined &&
            item.purchase_price > 0

          if (!Icon) return null

          return (
            <Card key={item.name}>
              <AccentBar />
              {hasPrice && <PriceBadge>${item.purchase_price}</PriceBadge>}
              <CardBody>
                <InfoRow>
                  <ItemIcon>
                    <Icon className='slot-icon' />
                  </ItemIcon>
                  <div style={{ flex: 1, paddingRight: hasPrice ? 48 : 0 }}>
                    <ItemName>{item.title}</ItemName>
                  </div>
                </InfoRow>

                {item.description && renderDescription(item.description)}

                <ButtonsRow>
                  {hasPrice && (
                    <ActionButton
                      $variant='buy'
                      onClick={() => handleBuy(item)}
                    >
                      Купить
                    </ActionButton>
                  )}
                  <ActionButton
                    $variant='take'
                    onClick={() => handleTake(item)}
                  >
                    Получить
                  </ActionButton>
                </ButtonsRow>
              </CardBody>
            </Card>
          )
        })}
      </ItemsList>
    </Modal>
  )
}
