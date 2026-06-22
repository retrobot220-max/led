// src/App.tsx
import {
  DeleteOutlined,
  ReloadOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { App as AntdApp, Button, Collapse, Modal, Switch } from 'antd'
import { useState } from 'react'
import { AddInventoryModal } from './components/AddInventoryModal'
import { AddModificationModal } from './components/AddModificationModal'
import { Counter } from './components/Counter'
import { PipCounter } from './components/PipCounter'
import { heroesCollections } from './data/heroes'
import {
  inventoryItemIcons,
  inventoryCollection,
  inventoryTypeColors,
} from './data/inventory'
import {
  modificationItemIcons,
  modificationTypeColors,
} from './data/modifications'
import type { InventoryItem } from './models/inventory'
import type { ModificationItem } from './models/modification'
import * as S from './styles'
import { useLocalStorage } from './useLocalStorage'

// ── иконки характеристик ──────────────────────────────────────────────────────
import iconHp from './assets/common/hp.svg?react'
import iconArmor from './assets/common/armor.svg?react'
import iconFood from './assets/common/food.svg?react'
import iconStamina from './assets/common/stamina.svg?react'
import iconExp from './assets/common/exp.svg?react'
// ─────────────────────────────────────────────────────────────────────────────

const INVENTORY_SLOTS = 9
const MODIFICATION_SLOTS = 6
const MAX_LEVEL = 6

interface Companion {
  id: number
  name: string
  health: number
  armor: number
}

export function App() {
  const { modal } = AntdApp.useApp()
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

  const [selectedHeroId, setSelectedHeroId] = useLocalStorage<number | null>(
    'hero.selectedHeroId',
    null,
  )
  const [accessAnger, setAccessAnger] = useLocalStorage(
    'hero.accessAnger',
    false,
  )
  const [accessSkulls, setAccessSkulls] = useLocalStorage(
    'hero.accessSkulls',
    false,
  )

  const [invModalOpen, setInvModalOpen] = useState(false)
  const [modModalOpen, setModModalOpen] = useState(false)
  const [activeInvSlot, setActiveInvSlot] = useState<number | null>(null)
  const [activeModSlot, setActiveModSlot] = useState<number | null>(null)
  const [activeExtraSlot, setActiveExtraSlot] = useState<0 | 1 | null>(null)
  const [extraInvModalOpen, setExtraInvModalOpen] = useState(false)
  const [heroModalOpen, setHeroModalOpen] = useState(false)

  const selectedHero =
    heroesCollections.find((h) => h.id === selectedHeroId) ?? null

  const expForNextLevel = level < MAX_LEVEL ? level * 10 : null

  const handleReset = () => {
    modal.confirm({
      title: 'Сбросить персонажа?',
      content:
        'Все характеристики, инвентарь и прогресс будут сброшены до начальных значений.',
      okText: 'Сбросить',
      cancelText: 'Отмена',
      okButtonProps: { danger: true },
      onOk: () => {
        setHealth(10)
        setArmor(0)
        setExp(0)
        setLevel(1)
        setFood(0)
        setMoney(0)
        setJunk(0)
        setStamina(0)
        setInventory(Array(INVENTORY_SLOTS).fill(null))
        setMods(Array(MODIFICATION_SLOTS).fill(null))
        setCompanions([])
        setGreenSkulls(0)
        setBlueSkulls(0)
        setRage(0)
        setExtraEnabled0(false)
        setExtraSlot0(null)
        setSelectedHeroId(null)
        setAccessAnger(false)
        setAccessSkulls(false)
      },
    })
  }

  const handleSelectHero = (heroId: number) => {
    const hero = heroesCollections.find((h) => h.id === heroId)
    if (!hero) return

    setHealth(hero.health)
    setArmor(hero.armor)
    setFood(hero.satiety)
    setMoney(hero.cash)
    setJunk(hero.trash)
    setExp(0)
    setLevel(1)
    setStamina(0)
    setGreenSkulls(0)
    setBlueSkulls(0)
    setRage(0)
    setMods(Array(MODIFICATION_SLOTS).fill(null))
    setCompanions([])
    setExtraEnabled0(false)
    setExtraSlot0(null)

    const newInventory: (InventoryItem | null)[] =
      Array(INVENTORY_SLOTS).fill(null)
    hero.inventory.forEach((invName, idx) => {
      if (idx < INVENTORY_SLOTS) {
        const found =
          inventoryCollection.find((item) => item.name === invName) ?? null
        newInventory[idx] = found
      }
    })
    setInventory(newInventory)

    setAccessAnger(hero.access_anger ?? false)
    setAccessSkulls(hero.access_skulls ?? false)
    setSelectedHeroId(hero.id)
    setHeroModalOpen(false)
  }

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

  const extraCollapseLabel = (() => {
    const parts: string[] = []
    if (accessSkulls) parts.push('черепки')
    if (accessAnger) parts.push('гнев')
    return parts.length > 0
      ? `Дополнительно (${parts.join(' / ')})`
      : 'Дополнительно'
  })()

  const showExtraCollapse = accessSkulls || accessAnger

  return (
    <S.Page>
      <S.Container>
        {/* Шапка с кнопками */}
        <S.Card>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            {selectedHero && (
              <img
                src={selectedHero.image}
                alt={selectedHero.name}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 12,
                  margin: -16,
                }}
              />
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              {selectedHero ? (
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                    marginBottom: 2,
                    marginLeft: 8,
                  }}
                >
                  {selectedHero.name}
                </div>
              ) : (
                <div style={{ color: '#777', fontSize: 14 }}>
                  Герой не выбран
                </div>
              )}
            </div>

            <Button
              icon={<TeamOutlined />}
              onClick={() => setHeroModalOpen(true)}
            >
              Выбрать героя
            </Button>
            <Button danger icon={<ReloadOutlined />} onClick={handleReset}>
              Сбросить
            </Button>
          </div>
        </S.Card>

        {/* Основные счётчики */}
        <S.Card>
          <S.SectionTitle>Характеристики</S.SectionTitle>
          <Counter
            label='Здоровье'
            icon={iconHp}
            value={health}
            steps={[1, 5]}
            onChange={setHealth}
          />
          <Counter
            label='Броня'
            icon={iconArmor}
            value={armor}
            steps={[1, 5]}
            onChange={setArmor}
          />
          <Counter
            label='Сытость'
            icon={iconFood}
            value={food}
            steps={[1, 2]}
            onChange={setFood}
          />
          <Counter
            label='Выносливость'
            icon={iconStamina}
            value={stamina}
            steps={[1, 2]}
            onChange={setStamina}
          />
          <Counter
            label='Опыт'
            icon={iconExp}
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
                  $color={item ? modificationTypeColors[item.type] : undefined}
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
                icon={iconHp}
                value={c.health}
                steps={[1, 5]}
                onChange={(v) => updateCompanion(c.id, 'health', v)}
              />
              <Counter
                label='Броня'
                icon={iconArmor}
                value={c.armor}
                steps={[1, 5]}
                onChange={(v) => updateCompanion(c.id, 'armor', v)}
              />
            </S.CompanionCard>
          ))}
        </S.Card>

        {/* Скрываемые счётчики */}
        {showExtraCollapse && (
          <Collapse
            ghost
            items={[
              {
                key: 'extra',
                label: extraCollapseLabel,
                children: (
                  <S.Card>
                    {accessSkulls && (
                      <>
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
                      </>
                    )}
                    {accessAnger && (
                      <PipCounter
                        label='Гнев'
                        value={rage}
                        max={6}
                        color='#f87171'
                        onChange={setRage}
                      />
                    )}
                  </S.Card>
                ),
              },
            ]}
          />
        )}
      </S.Container>

      {/* Модалка выбора героя */}
      <Modal
        open={heroModalOpen}
        onCancel={() => setHeroModalOpen(false)}
        footer={null}
        title='Выбрать героя'
        width={720}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
            padding: '8px 0',
          }}
        >
          {heroesCollections.map((hero) => (
            <div
              key={hero.id}
              onClick={() => handleSelectHero(hero.id)}
              style={{
                border:
                  selectedHeroId === hero.id
                    ? '2px solid #1677ff'
                    : '2px solid #333',
                borderRadius: 10,
                padding: 12,
                cursor: 'pointer',
                background: selectedHeroId === hero.id ? '#111d2c' : '#1a1a1a',
                transition: 'border-color 0.2s, background 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <img
                src={hero.image}
                alt={hero.name}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: '1px solid #444',
                }}
              />
              <div
                style={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}
              >
                {hero.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#aaa',
                  lineHeight: 1.6,
                  width: '100%',
                }}
              >
                <div>❤️ Здоровье: {hero.health}</div>
                <div>🛡️ Броня: {hero.armor}</div>
                <div>🥾 Движение: {hero.movement}</div>
                <div>🍖 Сытость: {hero.satiety}</div>
                <div>💰 Деньги: {hero.cash}</div>
                <div>🗑️ Хлам: {hero.trash}</div>
                {hero.access_skulls && (
                  <div style={{ color: '#4ade80' }}>💀 Черепки</div>
                )}
                {hero.access_anger && (
                  <div style={{ color: '#f87171' }}>🔥 Гнев</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

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
  )
}
