import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InventoryItem } from '../models/inventory'
import {
  ModificationNamespace,
  type ModificationItem,
} from '../models/modification'

const INVENTORY_SLOTS = 9
const MODIFICATION_SLOTS = 6
const DEMONIAC_TRINKET_SLOTS = 4

interface Companion {
  id: number
  name: string
  health: number
  armor: number
}

export interface HeroState {
  // ── основные характеристики ───────────────────────────────────────
  health: number
  armor: number
  food: number
  stamina: number
  exp: number
  level: number
  money: number
  junk: number

  // ── скрывемые счётчики ────────────────────────────────────────────
  greenSkulls: number
  blueSkulls: number
  rage: number

  // ── инвентарь и модификации ──────────────────────────────────────
  inventory: (InventoryItem | null)[]
  mods: (ModificationItem | null)[]
  upgradedMods: ModificationNamespace[]
  demoniacTrinkets: (ModificationItem | null)[]
  companions: Companion[]

  // ── доп. слоты ───────────────────────────────────────────────────
  extraEnabled0: boolean
  extraSlot0: InventoryItem | null

  // ── герой access flags ───────────────────────────────────────────
  selectedHeroId: number | null
  accessAnger: boolean
  accessSkulls: boolean

  // ── actions ──────────────────────────────────────────────────────
  setHealth: (v: number) => void
  setArmor: (v: number) => void
  setFood: (v: number) => void
  setStamina: (v: number) => void
  setExp: (v: number) => void
  setLevel: (v: number) => void
  setMoney: (v: number) => void
  setJunk: (v: number) => void

  setGreenSkulls: (v: number) => void
  setBlueSkulls: (v: number) => void
  setRage: (v: number) => void

  setInventory: (
    fn: (prev: (InventoryItem | null)[]) => (InventoryItem | null)[],
  ) => void
  setMods: (
    fn: (prev: (ModificationItem | null)[]) => (ModificationItem | null)[],
  ) => void
  setUpgradedMods: (
    fn: (prev: ModificationNamespace[]) => ModificationNamespace[],
  ) => void
  setDemoniacTrinkets: (
    fn: (prev: (ModificationItem | null)[]) => (ModificationItem | null)[],
  ) => void
  setCompanions: (fn: (prev: Companion[]) => Companion[]) => void

  setExtraEnabled0: (v: boolean) => void
  setExtraSlot0: (v: InventoryItem | null) => void

  setSelectedHeroId: (v: number | null) => void
  setAccessAnger: (v: boolean) => void
  setAccessSkulls: (v: boolean) => void

  // ── reset helper ─────────────────────────────────────────────────
  resetAll: () => void
  selectHero: (heroId: number) => void
}

// ── localStorage keys ────────────────────────────────────────────────
const STORAGE_KEY = 'hero.state'

export const useHeroStore = create<HeroState>()(
  persist(
    (set) => ({
      // ── defaults ───────────────────────────────────────────────────────
      health: 10,
      armor: 0,
      food: 0,
      stamina: 0,
      exp: 0,
      level: 1,
      money: 0,
      junk: 0,

      greenSkulls: 0,
      blueSkulls: 0,
      rage: 0,

      inventory: Array(INVENTORY_SLOTS).fill(null),
      mods: Array(MODIFICATION_SLOTS).fill(null),
      upgradedMods: [],
      demoniacTrinkets: Array(DEMONIAC_TRINKET_SLOTS).fill(null),
      companions: [],

      extraEnabled0: false,
      extraSlot0: null,

      selectedHeroId: null,
      accessAnger: false,
      accessSkulls: false,

      // ── basic setters ────────────────────────────────────────────────────
      setHealth: (v) => set({ health: v }),
      setArmor: (v) => set({ armor: v }),
      setFood: (v) => set({ food: v }),
      setStamina: (v) => set({ stamina: v }),
      setExp: (v) => set({ exp: v }),
      setLevel: (v) => set({ level: v }),
      setMoney: (v) => set({ money: v }),
      setJunk: (v) => set({ junk: v }),

      // ── skull / rage setters ─────────────────────────────────────────────
      setGreenSkulls: (v) => set({ greenSkulls: v }),
      setBlueSkulls: (v) => set({ blueSkulls: v }),
      setRage: (v) => set({ rage: v }),

      // ── inventory / mods / companions setters ──────────────────────────────
      setInventory: (fn) =>
        set((state) => ({
          inventory: fn([...state.inventory]),
        })),
      setMods: (fn) =>
        set((state) => ({
          mods: fn([...state.mods]),
        })),
      setUpgradedMods: (fn) =>
        set((state) => ({
          upgradedMods: fn([...state.upgradedMods]),
        })),
      setDemoniacTrinkets: (fn) =>
        set((state) => ({
          demoniacTrinkets: fn([...state.demoniacTrinkets]),
        })),
      setCompanions: (fn) =>
        set((state) => ({
          companions: fn([...state.companions]),
        })),

      // ── extra slot setters ────────────────────────────────────────────────
      setExtraEnabled0: (v) => set({ extraEnabled0: v }),
      setExtraSlot0: (v) => set({ extraSlot0: v }),

      // ── hero flags ─────────────────────────────────────────────────────────
      setSelectedHeroId: (v) => set({ selectedHeroId: v }),
      setAccessAnger: (v) => set({ accessAnger: v }),
      setAccessSkulls: (v) => set({ accessSkulls: v }),

      // ── reset all to defaults ──────────────────────────────────────────────
      resetAll: () =>
        set({
          health: 10,
          armor: 0,
          food: 0,
          stamina: 0,
          exp: 0,
          level: 1,
          money: 0,
          junk: 0,

          greenSkulls: 0,
          blueSkulls: 0,
          rage: 0,

          inventory: Array(INVENTORY_SLOTS).fill(null),
          mods: Array(MODIFICATION_SLOTS).fill(null),
          upgradedMods: [],
          demoniacTrinkets: Array(DEMONIAC_TRINKET_SLOTS).fill(null),
          companions: [],

          extraEnabled0: false,
          extraSlot0: null,

          selectedHeroId: null,
          accessAnger: false,
          accessSkulls: false,
        }),

      // ── load hero presets ──────────────────────────────────────────────────
      selectHero: (heroId: number) => {
        set({ selectedHeroId: heroId })
      },
    }),
    {
      name: STORAGE_KEY,
    },
  ),
)
