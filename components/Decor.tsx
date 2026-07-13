import React from 'react'

/**
 * A soft, elegant botanical sprig used as background decoration.
 * Colour comes from `currentColor`, so set a text color + opacity on the wrapper.
 */
export function Sprig({ className = '' }: { className?: string }) {
  const leaves = [
    { y: 66, s: 1 },
    { y: 96, s: -1 },
    { y: 126, s: 1 },
    { y: 156, s: -1 },
    { y: 186, s: 1 },
    { y: 216, s: -1 },
    { y: 246, s: 1 },
    { y: 276, s: -1 },
  ]
  return (
    <svg viewBox="0 0 150 320" fill="none" className={className} aria-hidden="true">
      <path
        d="M75 320 C75 260 71 180 78 92 C81 60 88 30 100 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(76, ${l.y}) rotate(${l.s > 0 ? -48 : 48})`}>
          <path d="M0 0 C 9 -8 12 -24 0 -40 C -12 -24 -9 -8 0 0 Z" fill="currentColor" />
        </g>
      ))}
      {/* a bud at the tip */}
      <g transform="translate(100, 6) rotate(20)">
        <path d="M0 0 C 7 -6 9 -18 0 -30 C -9 -18 -7 -6 0 0 Z" fill="currentColor" />
      </g>
    </svg>
  )
}
