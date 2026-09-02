import { Modal } from 'antd'
import styled from 'styled-components'
import { heroesCollections } from '../data/heroes'
import iconArmor from '../assets/common/armor.svg?react'
import iconFood from '../assets/common/food.svg?react'
import iconHp from '../assets/common/hp.svg?react'
import iconStamina from '../assets/common/stamina.svg?react'

type Hero = (typeof heroesCollections)[number]
type IconType = React.ComponentType<{ className?: string }>

interface HeroSelectModalProps {
  open: boolean
  onClose: () => void
  onSelectHero: (heroId: number) => void
  selectedHeroId?: number
}

const HeroGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  align-items: stretch;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`

const Card = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: ${(p) =>
    p.$active ? '2px solid #6d94cc' : '1px solid rgba(255, 255, 255, 0.12)'};
  border-radius: 14px;
  overflow: hidden;
  transition: 0.15s;
  background: ${(p) =>
    p.$active
      ? 'linear-gradient(135deg, #3a5580 0%, #2E4569 100%)'
      : 'linear-gradient(135deg, #2E4569 0%, #26385a 100%)'};
  box-shadow: ${(p) =>
    p.$active
      ? '0 4px 20px rgba(46,69,105,0.6), inset 0 0 20px rgba(109,148,204,0.15)'
      : '0 2px 8px rgba(0,0,0,0.3)'};

  &:hover {
    border-color: ${(p) => (p.$active ? '#6d94cc' : 'rgba(255,255,255,0.3)')};
  }
`

const AccentBar = styled.div<{ $active: boolean }>`
  height: 3px;
  flex-shrink: 0;
  background: ${(p) =>
    p.$active
      ? 'linear-gradient(90deg, #6d94cc, #a5c3ec)'
      : 'linear-gradient(90deg, transparent, rgba(109,148,204,0.5), transparent)'};
`

const CardBody = styled.div`
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 8px;
  }
`

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 600px) {
    margin-bottom: 8px;
  }
`

const HeroImage = styled.img<{ $active: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: ${(p) =>
    p.$active ? '2px solid #6d94cc' : '1px solid rgba(255,255,255,0.15)'};
  border-radius: 12px;
`

const HeroName = styled.div<{ $active: boolean }>`
  font-weight: 800;
  font-size: 26px;
  text-align: center;
  margin-bottom: 12px;
  color: ${(p) => (p.$active ? '#ffffff' : '#e8eef7')};

  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`

const HeroQuote = styled.blockquote<{ $active: boolean }>`
  position: relative;
  margin: 0 0 14px;
  padding: 10px 14px 10px 26px;
  border-left: 3px solid ${(p) => (p.$active ? '#a5c3ec' : '#6d94cc')};
  border-radius: 0 8px 8px 0;
  background: ${(p) =>
    p.$active ? 'rgba(165,195,236,0.12)' : 'rgba(0,0,0,0.18)'};
  font-style: italic;
  font-size: 13px;
  line-height: 1.45;
  color: ${(p) => (p.$active ? '#eaf1fb' : '#c3d2e8')};
  text-align: left;

  &::before {
    content: '“';
    position: absolute;
    top: -6px;
    left: 6px;
    font-size: 32px;
    font-family: Georgia, 'Times New Roman', serif;
    line-height: 1;
    color: ${(p) => (p.$active ? '#a5c3ec' : '#6d94cc')};
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    padding: 8px 10px 8px 22px;
    font-size: 11px;
    margin-bottom: 10px;

    &::before {
      font-size: 26px;
    }
  }
`

const CheckBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #4a6ea5, #6d94cc);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    display: none;
  }
`

const StatBox = styled.div<{ $active: boolean }>`
  background: ${(p) =>
    p.$active ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)'};
  border-radius: 8px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

const StatLabel = styled.span`
  font-size: 9px;
  color: #a5b5cc;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
`

const StatValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  .stat-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    fill: currentColor;
  }
`

const StatValue = styled.span<{ $active: boolean }>`
  color: ${(p) => (p.$active ? '#ffffff' : '#facc15')};
  font-weight: 700;
  font-size: 18px;
`

const SelectButton = styled.button<{ $active: boolean }>`
  width: 100%;
  margin-top: auto;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  transition: 0.15s;
  background: ${(p) =>
    p.$active
      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
      : 'linear-gradient(135deg, #4a6ea5, #6d94cc)'};

  &:hover {
    opacity: 0.88;
  }

  @media (max-width: 600px) {
    padding: 8px 6px;
    font-size: 12px;
  }
`

export function HeroSelectModal({
  open,
  onClose,
  onSelectHero,
  selectedHeroId,
}: HeroSelectModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title='Выбор героя'
      destroyOnHidden
      styles={{ body: { padding: '8px 0' } }}
      width={860}
    >
      <HeroGrid>
        {heroesCollections.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            active={selectedHeroId === hero.id}
            onSelect={() => {
              onSelectHero(hero.id)
              onClose()
            }}
          />
        ))}
      </HeroGrid>
    </Modal>
  )
}

function HeroCard({
  hero,
  active,
  onSelect,
}: {
  hero: Hero
  active: boolean
  onSelect: () => void
}) {
  const stats: { icon?: IconType; label: string; value: number | string }[] = [
    { icon: iconHp, label: 'Здоровье', value: hero.health },
    { icon: iconArmor, label: 'Броня', value: hero.armor },
    { icon: iconStamina, label: 'Ход', value: hero.movement },
    { icon: iconFood, label: 'Сытость', value: hero.satiety },
    { label: 'Деньги', value: hero.cash },
    { label: 'Хлам', value: hero.trash },
  ]

  return (
    <Card $active={active}>
      <AccentBar $active={active} />
      <CardBody>
        <HeroName $active={active}>{hero.name}</HeroName>

        <HeroImageWrapper>
          <HeroImage $active={active} src={hero.image} alt={hero.name} />
          {active && <CheckBadge>✓</CheckBadge>}
        </HeroImageWrapper>

        {hero.quote && <HeroQuote $active={active}>{hero.quote}</HeroQuote>}

        <StatsGrid>
          {stats.map((s, i) => (
            <MiniStat key={i} {...s} active={active} />
          ))}
        </StatsGrid>

        <SelectButton $active={active} onClick={onSelect}>
          {active ? 'Выбран ✓' : 'Выбрать'}
        </SelectButton>
      </CardBody>
    </Card>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
  active,
}: {
  icon?: IconType
  label: string
  value: number | string
  active: boolean
}) {
  return (
    <StatBox $active={active}>
      <StatLabel>{label}</StatLabel>
      <StatValueRow style={{ color: active ? '#ffffff' : '#facc15' }}>
        {Icon && <Icon className='stat-icon' />}
        <StatValue $active={active}>{value}</StatValue>
      </StatValueRow>
    </StatBox>
  )
}
