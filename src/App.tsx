import { useState, useEffect } from 'react'
import {
  ConfigProvider,
  theme,
  Button,
  InputNumber,
  Collapse,
  Switch,
} from 'antd'
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
const MAX_LEVEL = 6

interface Companion {
  id: number
  name: string
  health: number
  armor: number
}

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])

  return [value, setValue] as const
}

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

function PipCounter({
  label,
  value,
  max,
  color,
  onChange,
  hint,
}: {
  label: string
  value: number
  max: number
  color: string
  onChange: (v: number) => void
  hint?: string
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
      {hint && (
        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{hint}</div>
      )}
    </S.CounterRow>
  )
}

export default function App() {
  const [health, setHealth] = useLocalStorage('hero.health', 10)
  const [armor, setArmor] = useLocalStorage('hero.armor', 0)
  const [exp, setExp] = useLocalStorage('hero.exp', 0)
  const [level, setLevel] = useLocalStorage('hero.level', 1)
  const [food, setFood] = useLocalStorage('hero.food', 0)
  const [money, setMoney] = useLocalStorage('hero.money', 0)
  const [junk, setJunk] = useLocalStorage('hero.junk', 0)
  const [stamina, setStamina] = useLocalStorage('hero.stamina', 0)

  const [inventory, setInventory] = useLocalStorage<(InventoryItem | null)[]>(
    'hero.inventory',
    Array(INVENTORY_SLOTS).fill(null),
  )
  const [mods, setMods] = useLocalStorage<(ModificationItem | null)[]>(
    'hero.mods',
    Array(MODIFICATION_SLOTS).fill(null),
  )
  const [companions, setCompanions] = useLocalStorage<Companion[]>(
    'hero.companions',
    [],
  )

  const [greenSkulls, setGreenSkulls] = useLocalStorage('hero.greenSkulls', 0)
  const [blueSkulls, setBlueSkulls] = useLocalStorage('hero.blueSkulls', 0)
  const [rage, setRage] = useLocalStorage('hero.rage', 0)

  const [extraEnabled0, setExtraEnabled0] = useLocalStorage(
    'hero.extraEnabled0',
    false,
  )

  const [extraSlot0, setExtraSlot0] = useLocalStorage<InventoryItem | null>(
    'hero.extraSlot0',
    null,
  )

  const [invModalOpen, setInvModalOpen] = useState(false)
  const [modModalOpen, setModModalOpen] = useState(false)
  const [activeInvSlot, setActiveInvSlot] = useState<number | null>(null)
  const [activeModSlot, setActiveModSlot] = useState<number | null>(null)

  const [activeExtraSlot, setActiveExtraSlot] = useState<0 | 1 | null>(null)
  const [extraInvModalOpen, setExtraInvModalOpen] = useState(false)

  // Опыт для следующего уровня: текущий_уровень * 10
  const expForNextLevel = level < MAX_LEVEL ? level * 10 : null

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

  // ---- доп. слоты ----
  const handleToggle0 = (checked: boolean) => {
    setExtraEnabled0(checked)
    if (!checked) setExtraSlot0(null)
  }

  const openExtra0 = () => {
    if (!extraEnabled0 || extraSlot0) return
    setActiveExtraSlot(0)
    setExtraInvModalOpen(true)
  }

  const selectExtraInv = (item: InventoryItem) => {
    if (activeExtraSlot === 0) setExtraSlot0(item)
    setExtraInvModalOpen(false)
  }

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

  const ExtraIcon0 = extraSlot0 ? inventoryItemIcons[extraSlot0.name] : null

  const extraSlotsData = [
    {
      index: 0 as const,
      enabled: extraEnabled0,
      item: extraSlot0,
      Icon: ExtraIcon0,
      onToggle: handleToggle0,
      onOpen: openExtra0,
      onRemove: () => setExtraSlot0(null),
    },
  ]

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
              label='Опыт'
              value={exp}
              steps={[1, 5]}
              onChange={setExp}
            />
            <PipCounter
              label='Уровень'
              value={level}
              max={MAX_LEVEL}
              color='#facc15'
              onChange={(v) => setLevel(Math.max(1, v))}
              hint={
                expForNextLevel !== null
                  ? `До следующего уровня: ${expForNextLevel} опыта`
                  : 'Максимальный уровень'
              }
            />
          </S.Card>

          {/* Инвентарь */}
          <S.Card>
            <S.SectionTitle>Инвентарь</S.SectionTitle>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              {extraSlotsData.map(({ index, enabled, onToggle }) => (
                <Switch
                  key={index}
                  checked={enabled}
                  onChange={onToggle}
                  checkedChildren={`Доп. слот ${index + 1}`}
                  unCheckedChildren={`Доп. слот ${index + 1}`}
                />
              ))}
            </div>
            <S.SlotsGrid $cols={3}>
              {inventory.map((item, i) => {
                const Icon = item ? inventoryItemIcons[item.name] : null
                return (
                  <S.Slot
                    key={`inv-${i}`}
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
              {extraSlotsData.map(
                ({ index, enabled, item, Icon, onOpen, onRemove }) => (
                  <S.Slot
                    key={`extra-${index}`}
                    $empty={!item}
                    $color={item ? inventoryTypeColors[item.type] : undefined}
                    style={{
                      opacity: enabled ? 1 : 0.35,
                      pointerEvents: enabled ? 'auto' : 'none',
                      cursor: enabled
                        ? item
                          ? 'default'
                          : 'pointer'
                        : 'not-allowed',
                      outline: enabled ? '2px dashed #555' : '2px dashed #333',
                      outlineOffset: -2,
                    }}
                    onClick={onOpen}
                  >
                    {item && Icon ? (
                      <>
                        <DeleteOutlined
                          className='slot-remove'
                          onClick={(e) => {
                            e.stopPropagation()
                            onRemove()
                          }}
                        />
                        <Icon className='slot-icon' />
                        <span className='slot-title'>{item.title}</span>
                      </>
                    ) : (
                      <span
                        className='slot-empty'
                        style={{ opacity: enabled ? 1 : 0.4 }}
                      >
                        {enabled ? '+' : '—'}
                      </span>
                    )}
                  </S.Slot>
                ),
              )}
            </S.SlotsGrid>
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
        <AddInventoryModal
          open={extraInvModalOpen}
          onClose={() => setExtraInvModalOpen(false)}
          onSelect={selectExtraInv}
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
