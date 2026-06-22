import * as S from '../styles'

export function PipCounter({
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
