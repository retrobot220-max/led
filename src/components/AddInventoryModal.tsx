import { Modal, Tabs, message } from 'antd'
import styled from 'styled-components'
import { inventoryCollection, inventoryItemIcons } from '../data/inventory'
import type { InventoryItem } from '../models/inventory'
import { useHeroStore } from '../store/heroStore'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (item: InventoryItem) => void
  onAction?: (item: InventoryItem, action: 'buy' | 'take') => void
}

const ItemsList = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  padding: 16px 4px 4px;
`

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  transition: 0.15s;
  background: linear-gradient(135deg, #2e4569 0%, #26385a 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const AccentBar = styled.div`
  height: 3px;
  flex-shrink: 0;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(109, 148, 204, 0.5),
    transparent
  );
`

const CardBody = styled.div`
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`

const ItemIcon = styled.div`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.2);

  .slot-icon {
    width: 36px;
    height: 36px;
    fill: #a5c3ec;
  }
`

const ItemName = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.1;
  color: #e8eef7;
`

const PriceBadge = styled.div`
  position: absolute;
  top: -14px;
  right: -14px;
  z-index: 3;
  transform: rotate(8deg);
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 34px;
    height: 16px;
    background: rgba(255, 255, 255, 0.35);
    border: 1px dashed rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  &::before {
    top: -8px;
    left: -12px;
    transform: rotate(-38deg);
  }

  &::after {
    bottom: -8px;
    right: -12px;
    transform: rotate(-38deg);
  }
`

const ItemDesc = styled.div`
  font-size: 12px;
  color: #c3d2e8;
  margin-bottom: 12px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const DescParagraph = styled.div`
  &:not(:first-child) {
    padding-top: 6px;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
  }
`

const ButtonsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`

const ActionButton = styled.button<{ $variant: 'buy' | 'take' }>`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  transition: 0.15s;
  background: ${(p) =>
    p.$variant === 'buy'
      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
      : 'linear-gradient(135deg, #4a6ea5, #6d94cc)'};

  &:hover {
    opacity: 0.88;
  }
`

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

export const AddInventoryModal = ({ open, onClose }: Props) => {
  const money = useHeroStore((s) => s.money)
  const setMoney = useHeroStore((s) => s.setMoney)
  const setInventory = useHeroStore((s) => s.setInventory)

  const handleBuy = (item: InventoryItem) => {
    if (item.purchase_price === null || item.purchase_price === undefined)
      return
    if (money < (item.purchase_price ?? 0)) {
      message.warning('Недостаточно денег')
      return
    }
    setMoney(money - (item.purchase_price ?? 0))
    setInventory((prev) => {
      const next = [...prev]
      const emptyIdx = next.findIndex((i) => i === null)
      if (emptyIdx !== -1) {
        next[emptyIdx] = { ...item }
      }
      return next
    })
    message.success('Успешная покупка')
  }

  const handleTake = (item: InventoryItem) => {
    setInventory((prev) => {
      const next = [...prev]
      const emptyIdx = next.findIndex((i) => i === null)
      if (emptyIdx !== -1) {
        next[emptyIdx] = { ...item }
      }
      return next
    })
    message.success('Предмет успешно получен')
  }

  const renderTabContent = (activeTab: string) => {
    let items: InventoryItem[]
    if (activeTab === 'all') {
      items = inventoryCollection
    } else if (activeTab === 'food') {
      items = inventoryCollection.filter(
        (i) => i.type === 'food' || i.type === 'fish',
      )
    } else if (activeTab === 'grenade') {
      items = inventoryCollection.filter((i) => i.type === 'grenade')
    } else {
      items = inventoryCollection.filter((i) => i.type === 'medicine')
    }

    const sorted = [...items].sort((a, b) => {
      if (activeTab === 'all' || activeTab === 'food') {
        const aIsFish = a.type === 'fish' ? 1 : 0
        const bIsFish = b.type === 'fish' ? 1 : 0
        if (aIsFish !== bIsFish) return aIsFish - bIsFish
        if (a.type === 'fish' && b.type === 'fish') {
          const fishOrder = { common_fish: 1, rare_fish: 2, legendary_fish: 3 }
          return (
            (fishOrder[a.name as keyof typeof fishOrder] ?? 0) -
            (fishOrder[b.name as keyof typeof fishOrder] ?? 0)
          )
        }
      }
      return a.type.localeCompare(b.type)
    })

    return (
      <ItemsList>
        {sorted.map((item) => {
          const Icon = inventoryItemIcons[item.name]
          const hasPrice =
            item.purchase_price !== null &&
            item.purchase_price !== undefined &&
            item.purchase_price > 0

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
    )
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title='Добавить предмет'
      destroyOnHidden
      styles={{ body: { padding: '8px 0' } }}
      width={860}
    >
      <Tabs
        defaultActiveKey='all'
        items={[
          { key: 'all', label: 'Всё', children: renderTabContent('all') },
          { key: 'food', label: 'Еда', children: renderTabContent('food') },
          {
            key: 'grenade',
            label: 'Гранаты',
            children: renderTabContent('grenade'),
          },
          {
            key: 'medicine',
            label: 'Медицина',
            children: renderTabContent('medicine'),
          },
        ]}
      />
    </Modal>
  )
}
