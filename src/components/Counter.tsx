// src/components/Counter.tsx
import { Button, InputNumber } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import type { ComponentType, SVGProps } from 'react'
import * as S from '../styles'

export function Counter({
  label,
  value,
  steps,
  onChange,
  min = 0,
  icon: Icon,
}: {
  label: string
  value: number
  steps: number[]
  onChange: (v: number) => void
  min?: number
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}) {
  const clamp = (v: number) => (v < min ? min : v)
  return (
    <S.CounterRow>
      <S.CounterHead>
        <S.CounterLabel>
          {Icon && <Icon width={20} height={20} style={{ flexShrink: 0 }} />}
          {label}
        </S.CounterLabel>
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
