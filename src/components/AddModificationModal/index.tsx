import { Modal, Tabs, message } from 'antd'
import {
  modificationCollection,
  modificationItemIcons,
} from '../../data/modifications'
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
} from './styled'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (item: ModificationItem) => void
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

export const AddModificationModal = ({ open, onClose }: Props) => {
  const money = useHeroStore((s) => s.money)
  const setMoney = useHeroStore((s) => s.setMoney)
  const mods = useHeroStore((s) => s.mods)
  const setMods = useHeroStore((s) => s.setMods)
  const upgradedMods = useHeroStore((s) => s.upgradedMods)
  const setUpgradedMods = useHeroStore((s) => s.setUpgradedMods)

  const isOwned = (item: ModificationItem) =>
    mods.some((m) => m?.name === item.name)
  const isUpgraded = (item: ModificationItem) =>
    upgradedMods.includes(item.name)

  const handleUpgrade = (item: ModificationItem) => {
    if (item.upgrade_price === null || item.upgrade_price === undefined) return
    if (money < item.upgrade_price) {
      message.warning('Недостаточно денег')
      return
    }
    setMoney(money - item.upgrade_price)
    setUpgradedMods((prev) => [...prev, item.name])
    message.success('Модификация улучшена')
  }

  const handleBuy = (item: ModificationItem) => {
    if (item.purchase_price === null || item.purchase_price === undefined)
      return
    if (money < (item.purchase_price ?? 0)) {
      message.warning('Недостаточно денег')
      return
    }
    setMoney(money - (item.purchase_price ?? 0))
    setMods((prev) => {
      const firstNullIndex = prev.findIndex((m) => m === null)
      if (firstNullIndex === -1) return prev
      const updated = [...prev]
      updated[firstNullIndex] = item
      return updated
    })
    message.success('Модификация успешно получена')
  }

  const handleTake = (item: ModificationItem) => {
    setMods((prev) => {
      const firstNullIndex = prev.findIndex((m) => m === null)
      if (firstNullIndex === -1) return prev
      const updated = [...prev]
      updated[firstNullIndex] = item
      return updated
    })
    message.success('Модификация успешно получена')
  }

  const renderTabContent = (activeTab: string) => {
    const items = modificationCollection.filter((item) => {
      if (activeTab === 'fight') return item.type === 'fight'
      if (activeTab === 'survival') return item.type === 'survival'
      return true
    })

    const sorted = [...items].sort((a, b) => a.type.localeCompare(b.type))

    return (
      <ItemsList>
        {sorted.map((item) => {
          const Icon = modificationItemIcons[item.name]
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
                  {isOwned(item) && item.upgrade_price != null ? (
                    isUpgraded(item) ? (
                      <ActionButton $variant='take' disabled>
                        Улучшена
                      </ActionButton>
                    ) : (
                      <ActionButton
                        $variant='buy'
                        onClick={() => handleUpgrade(item)}
                      >
                        Улучшить (${item.upgrade_price})
                      </ActionButton>
                    )
                  ) : isOwned(item) ? (
                    <ActionButton $variant='take' disabled>
                      Уже получена
                    </ActionButton>
                  ) : (
                    <>
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
                    </>
                  )}
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
      title='Добавить модификацию'
      destroyOnHidden
      styles={{ body: { padding: '8px 0' } }}
      width={860}
    >
      <Tabs
        defaultActiveKey='all'
        items={[
          { key: 'all', label: 'Всё', children: renderTabContent('all') },
          {
            key: 'fight',
            label: 'Боевые',
            children: renderTabContent('fight'),
          },
          {
            key: 'survival',
            label: 'Выживание',
            children: renderTabContent('survival'),
          },
        ]}
      />
    </Modal>
  )
}
