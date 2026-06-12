import styled from 'styled-components'

export const Page = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 10px;
  }
`

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Card = styled.div`
  background: #1e1e1e;
  border: 1px solid #2c2c2c;
  border-radius: 12px;
  padding: 16px;

  @media (max-width: 480px) {
    padding: 12px;
  }
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`

export const CounterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid #2c2c2c;

  &:last-child {
    border-bottom: none;
  }
`

export const CounterHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const CounterLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
`

export const CounterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;

  .ant-input-number {
    width: 80px;
  }

  @media (max-width: 480px) {
    .ant-btn {
      padding: 0 8px;
      font-size: 12px;
    }
  }
`

export const SlotsGrid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols}, 1fr);
  gap: 10px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`

export const Slot = styled.div<{ $empty?: boolean; $color?: string }>`
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  border: 1px solid ${(p) => (p.$empty ? '#333' : p.$color || '#444')};
  background: ${(p) => (p.$empty ? '#181818' : '#262626')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: 0.15s;
  padding: 6px;
  text-align: center;

  &:hover {
    border-color: #666;
  }

  .slot-icon {
    width: 44px;
    height: 44px;
    fill: #fff;
    color: #fff;
  }

  .slot-icon path {
    fill: #fff;
  }

  .slot-title {
    font-size: 10px;
    color: #ccc;
    margin-top: 4px;
    line-height: 1.1;
  }

  .slot-empty {
    font-size: 26px;
    color: #555;
  }

  .slot-remove {
    position: absolute;
    top: 2px;
    right: 2px;
    color: #f87171;
    font-size: 13px;
    opacity: 0;
    transition: 0.15s;
  }

  &:hover .slot-remove {
    opacity: 1;
  }
`

export const ModalIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px;
  border-radius: 10px;
  border: 1px solid #2c2c2c;
  background: #1e1e1e;
  cursor: pointer;
  transition: 0.15s;
  text-align: center;

  &:hover {
    border-color: #666;
    background: #262626;
  }

  .slot-icon {
    width: 40px;
    height: 40px;
    fill: #fff;
  }

  .slot-icon path {
    fill: #fff;
  }

  .slot-title {
    font-size: 11px;
    color: #ddd;
  }
`

export const Pips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const Pip = styled.div<{ $active?: boolean; $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${(p) => p.$color};
  background: ${(p) => (p.$active ? p.$color : 'transparent')};
  transition: 0.15s;
`

export const CompanionCard = styled(Card)`
  border-color: #3a3a3a;
`

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`
