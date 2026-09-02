import styled from 'styled-components'

export const Page = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  padding: 12px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 8px;
  }
`

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`

export const Card = styled.div`
  background: #1e1e1e;
  border: 1px solid #2c2c2c;
  border-radius: 12px;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 8px;
  }
`

export const CounterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid #2c2c2c;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
`

export const CounterHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const CounterLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #ccc;
  min-width: 80px;

  @media (max-width: 768px) {
    margin-bottom: 2px;
  }
`

export const CounterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;

  .ant-input-number {
    width: 80px;
  }

  @media (max-width: 768px) {
    .ant-btn {
      padding: 0 6px;
      font-size: 11px;
      min-height: 24px;
    }
  }
`

export const SlotsGrid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols}, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`

export const Slot = styled.div<{ $empty?: boolean; $color?: string }>`
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 1px solid ${(p) => (p.$empty ? '#333' : p.$color || '#444')};
  background: ${(p) => (p.$empty ? '#181818' : '#262626')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: 0.15s;
  padding: 4px;
  text-align: center;

  &:hover {
    border-color: #666;
  }

  @media (max-width: 768px) {
    border-radius: 6px;
    padding: 2px;
  }

  .slot-icon {
    width: 32px;
    height: 32px;
    fill: #fff;
    color: #fff;

    @media (max-width: 768px) {
      width: 24px;
      height: 24px;
    }
  }

  .slot-icon path {
    fill: #fff;
  }

  .slot-title {
    font-size: 9px;
    color: #ccc;
    margin-top: 2px;
    line-height: 1.1;

    @media (max-width: 768px) {
      font-size: 8px;
    }
  }

  .slot-empty {
    font-size: 20px;
    color: #555;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  .slot-remove {
    position: absolute;
    top: 2px;
    right: 2px;
    color: #f87171;
    font-size: 12px;
    opacity: 0;
    transition: 0.15s;

    @media (max-width: 768px) {
      font-size: 10px;
      top: 1px;
      right: 1px;
    }
  }

  &:hover .slot-remove {
    opacity: 1;
  }
`

export const ModalIconWrap = styled.div<{ $showDesc?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: ${(p) => (p.$showDesc ? '8px' : '10px 6px')};
  border-radius: 8px;
  border: 1px solid #2c2c2c;
  background: #1e1e1e;
  cursor: pointer;
  transition: 0.15s;
  text-align: center;

  &:hover {
    border-color: #666;
    background: #262626;
  }

  @media (max-width: 768px) {
    padding: ${(p) => (p.$showDesc ? '6px' : '6px 4px')};
    gap: 2px;
  }

  .slot-icon {
    width: 36px;
    height: 36px;
    fill: #fff;

    @media (max-width: 768px) {
      width: 28px;
      height: 28px;
    }
  }

  .slot-icon path {
    fill: #fff;
  }

  .slot-title {
    font-size: 10px;
    color: #ddd;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 9px;
    }
  }

  .item-description {
    font-size: 9px;
    color: #aaa;
    margin-top: 2px;
    line-height: 1.3;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 8px;
    }
  }
`

export const Pips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 4px;
  }
`

export const Pip = styled.div<{ $active?: boolean; $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${(p) => p.$color};
  background: ${(p) => (p.$active ? p.$color : 'transparent')};
  transition: 0.15s;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`

export const CompanionCard = styled(Card)`
  border-color: #3a3a3a;

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
`

// Description tooltip style
export const ItemDescription = styled.div<{ $collapsed?: boolean }>`
  font-size: 9px;
  color: #aaa;
  margin-top: 2px;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${(p) => (p.$collapsed ? 'nowrap' : 'normal')};

  @media (max-width: 768px) {
    font-size: 8px;
  }
`
