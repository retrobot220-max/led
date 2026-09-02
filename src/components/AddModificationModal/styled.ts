import styled from 'styled-components'

export const ItemsList = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  padding: 16px 4px 4px;
`

export const Card = styled.div`
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

export const AccentBar = styled.div`
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

export const CardBody = styled.div`
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`

export const ItemIcon = styled.div`
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
  }
`

export const ItemName = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.1;
  color: #e8eef7;
`

export const PriceBadge = styled.div`
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

export const ItemDesc = styled.div`
  font-size: 12px;
  color: #c3d2e8;
  margin-bottom: 12px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const DescParagraph = styled.div`
  &:not(:first-child) {
    padding-top: 6px;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`

export const ActionButton = styled.button<{ $variant: 'buy' | 'take' }>`
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

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
