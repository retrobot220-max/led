import { useState } from 'react'
import { ConfigProvider, theme, Button, InputNumber, Collapse } from 'antd'
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import * as S from './styles'
import { AddInventoryModal } from './components/AddInventoryModal'
import { AddModificationModal } from './components/AddModificationModal'
import { inventoryItemIcons, inventoryTypeColors } from './data/inventory'
import {
  modificationItemIcons,
  modificationTypeColors,
} from './data/modifications'
import type { InventoryItem } from './models/inventory'
import type { ModificationItem } from './models/modification'

const INVENTORY_SLOTS = 9
const MODIFICATION_SLOTS = 6

interface Companion {
  id: number
  name: string
  health: number
  armor: number
}

// Переиспользуемый счётчик
function Counter({
  label,
  value,
  steps,
  onChange,
  min = 0,
}: {
  label: string
  value: number
  steps: number[]
  onChange: (v: number) => void
  min?: number
}) {
  const clamp = (v: number) => (v < min ? min : v)
  return (
    <S.CounterRow>
      <S.CounterHead>
        <S.CounterLabel>{label}</S.CounterLabel>
        <InputNumber
          value={value}
          min={min}
          onChange={(v) => onChange(clamp(Number(v) || 0))}
        />
      </S.CounterHead>
      <S.CounterControls>
        {steps.map((s) => (
          <Button
            key={`m${s}`}
            danger
            size='small'
            icon={<MinusOutlined />}
            onClick={() => onChange(clamp(value - s))}
          >
            {s}
          </Button>
        ))}
        {steps.map((s) => (
          <Button
            key={`p${s}`}
            size='small'
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => onChange(clamp(value + s))}
          >
            {s}
          </Button>
        ))}
      </S.CounterControls>
    </S.CounterRow>
  )
}

// Счётчик "точками" (черепки, гнев)
function PipCounter({
  label,
  value,
  max,
  color,
  onChange,
}: {
  label: string
  value: number
  max: number
  color: string
  onChange: (v: number) => void
}) {
  return (
    <S.CounterRow>
      <S.CounterHead>
        <S.CounterLabel>
          {label}: {value}
        </S.CounterLabel>
      </S.CounterHead>
      <S.Pips>
        {Array.from({ length: max }).map((_, i) => (
          <S.Pip
            key={i}
            $color={color}
            $active={i < value}
            onClick={() => onChange(i + 1 === value ? i : i + 1)}
          />
        ))}
      </S.Pips>
    </S.CounterRow>
  )
}

export default function App() {
  const [health, setHealth] = useState(10)
  const [armor, setArmor] = useState(0)
  const [exp, setExp] = useState(0)
  const [food, setFood] = useState(0)
  const [money, setMoney] = useState(0)
  const [junk, setJunk] = useState(0)
  const [stamina, setStamina] = useState(0)

  const [inventory, setInventory] = useState<(InventoryItem | null)[]>(
    Array(INVENTORY_SLOTS).fill(null),
  )
  const [mods, setMods] = useState<(ModificationItem | null)[]>(
    Array(MODIFICATION_SLOTS).fill(null),
  )

  const [companions, setCompanions] = useState<Companion[]>([])

  const [greenSkulls, setGreenSkulls] = useState(0)
  const [blueSkulls, setBlueSkulls] = useState(0)
  const [rage, setRage] = useState(0)

  // модалки
  const [invModalOpen, setInvModalOpen] = useState(false)
  const [modModalOpen, setModModalOpen] = useState(false)
  const [activeInvSlot, setActiveInvSlot] = useState<number | null>(null)
  const [activeModSlot, setActiveModSlot] = useState<number | null>(null)

  // ---- инвентарь ----
  const openInvSlot = (i: number) => {
    if (inventory[i]) return
    setActiveInvSlot(i)
    setInvModalOpen(true)
  }
  const selectInv = (item: InventoryItem) => {
    if (activeInvSlot === null) return
    setInventory((prev) => {
      const next = [...prev]
      next[activeInvSlot] = item
      return next
    })
  }
  const removeInv = (i: number) =>
    setInventory((prev) => {
      const next = [...prev]
      next[i] = null
      return next
    })

  // ---- модификации ----
  const openModSlot = (i: number) => {
    if (mods[i]) return
    setActiveModSlot(i)
    setModModalOpen(true)
  }
  const selectMod = (item: ModificationItem) => {
    if (activeModSlot === null) return
    setMods((prev) => {
      const next = [...prev]
      next[activeModSlot] = item
      return next
    })
  }
  const removeMod = (i: number) =>
    setMods((prev) => {
      const next = [...prev]
      next[i] = null
      return next
    })

  // ---- компаньоны ----
  const addCompanion = () =>
    setCompanions((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `Компаньон ${prev.length + 1}`,
        health: 5,
        armor: 0,
      },
    ])
  const removeCompanion = (id: number) =>
    setCompanions((prev) => prev.filter((c) => c.id !== id))
  const updateCompanion = (id: number, field: 'health' | 'armor', v: number) =>
    setCompanions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: v } : c)),
    )

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <S.Page>
        <S.Container>
          {/* Основные счётчики */}
          <S.Card>
            <S.SectionTitle>Характеристики</S.SectionTitle>
            <Counter
              label='Здоровье'
              value={health}
              steps={[1, 5]}
              onChange={setHealth}
            />
            <Counter
              label='Броня'
              value={armor}
              steps={[1, 5]}
              onChange={setArmor}
            />
            <Counter
              label='Опыт'
              value={exp}
              steps={[1, 5]}
              onChange={setExp}
            />
            <Counter
              label='Сытость'
              value={food}
              steps={[1, 2]}
              onChange={setFood}
            />
            <Counter
              label='Выносливость'
              value={stamina}
              steps={[1, 2]}
              onChange={setStamina}
            />
            <Counter
              label='Деньги'
              value={money}
              steps={[1, 5, 10]}
              onChange={setMoney}
            />
            <Counter
              label='Хлам'
              value={junk}
              steps={[1, 5]}
              onChange={setJunk}
            />
          </S.Card>

          {/* Инвентарь */}
          <S.Card>
            <S.SectionTitle>Инвентарь</S.SectionTitle>
            <S.SlotsGrid $cols={3}>
              {inventory.map((item, i) => {
                const Icon = item ? inventoryItemIcons[item.name] : null
                return (
                  <S.Slot
                    key={i}
                    $empty={!item}
                    $color={item ? inventoryTypeColors[item.type] : undefined}
                    onClick={() => openInvSlot(i)}
                  >
                    {item && Icon ? (
                      <>
                        <DeleteOutlined
                          className='slot-remove'
                          onClick={(e) => {
                            e.stopPropagation()
                            removeInv(i)
                          }}
                        />
                        <Icon className='slot-icon' />
                        <span className='slot-title'>{item.title}</span>
                      </>
                    ) : (
                      <span className='slot-empty'>+</span>
                    )}
                  </S.Slot>
                )
              })}
            </S.SlotsGrid>
          </S.Card>

          {/* Модификации */}
          <S.Card>
            <S.SectionTitle>Модификации</S.SectionTitle>
            <S.SlotsGrid $cols={3}>
              {mods.map((item, i) => {
                const Icon = item ? modificationItemIcons[item.name] : null
                return (
                  <S.Slot
                    key={i}
                    $empty={!item}
                    $color={
                      item ? modificationTypeColors[item.type] : undefined
                    }
                    onClick={() => openModSlot(i)}
                  >
                    {item && Icon ? (
                      <>
                        <DeleteOutlined
                          className='slot-remove'
                          onClick={(e) => {
                            e.stopPropagation()
                            removeMod(i)
                          }}
                        />
                        <Icon className='slot-icon' />
                        <span className='slot-title'>{item.title}</span>
                      </>
                    ) : (
                      <span className='slot-empty'>+</span>
                    )}
                  </S.Slot>
                )
              })}
            </S.SlotsGrid>
          </S.Card>

          {/* Компаньоны */}
          <S.Card>
            <S.SectionTitle>
              Компаньоны
              <Button
                type='primary'
                icon={<UserAddOutlined />}
                onClick={addCompanion}
              >
                Добавить
              </Button>
            </S.SectionTitle>
            {companions.length === 0 && (
              <div style={{ color: '#777' }}>Нет компаньонов</div>
            )}
            {companions.map((c) => (
              <S.CompanionCard key={c.id} style={{ marginTop: 10 }}>
                <S.FlexBetween style={{ marginBottom: 8 }}>
                  <strong>{c.name}</strong>
                  <Button
                    danger
                    size='small'
                    icon={<DeleteOutlined />}
                    onClick={() => removeCompanion(c.id)}
                  />
                </S.FlexBetween>
                <Counter
                  label='Здоровье'
                  value={c.health}
                  steps={[1, 5]}
                  onChange={(v) => updateCompanion(c.id, 'health', v)}
                />
                <Counter
                  label='Броня'
                  value={c.armor}
                  steps={[1, 5]}
                  onChange={(v) => updateCompanion(c.id, 'armor', v)}
                />
              </S.CompanionCard>
            ))}
          </S.Card>

          {/* Скрываемые счётчики */}
          <Collapse
            ghost
            items={[
              {
                key: 'extra',
                label: 'Дополнительно (черепки / гнев)',
                children: (
                  <S.Card>
                    <PipCounter
                      label='Зелёные черепки'
                      value={greenSkulls}
                      max={6}
                      color='#4ade80'
                      onChange={setGreenSkulls}
                    />
                    <PipCounter
                      label='Синие черепки'
                      value={blueSkulls}
                      max={6}
                      color='#60a5fa'
                      onChange={setBlueSkulls}
                    />
                    <PipCounter
                      label='Гнев'
                      value={rage}
                      max={6}
                      color='#f87171'
                      onChange={setRage}
                    />
                  </S.Card>
                ),
              },
            ]}
          />
        </S.Container>

        <AddInventoryModal
          open={invModalOpen}
          onClose={() => setInvModalOpen(false)}
          onSelect={selectInv}
        />
        <AddModificationModal
          open={modModalOpen}
          onClose={() => setModModalOpen(false)}
          onSelect={selectMod}
        />
      </S.Page>
    </ConfigProvider>
  )
}
