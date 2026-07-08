import React from 'react'

/**
 * Original brand mark for PostpartumRecovery.
 *
 * An abstract, single-weight line drawing: a mother's head and gently curving
 * arm cradling a smaller baby's head nestled against her, the negative space
 * between them suggesting a soft heart. Fully original artwork.
 */
export function LogoMark({
  className = '',
  stroke = 'currentColor',
}: {
  className?: string
  stroke?: string
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="PostpartumRecovery logo"
    >
      {/* Mother: head + shoulder arc sweeping down to cradle */}
      <circle cx="18" cy="13" r="5.4" stroke={stroke} strokeWidth="2.4" />
      <path
        d="M9 34c0-6.6 4.6-11.4 10.6-11.4 3.2 0 6 1.4 8 3.7"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Cradling arm curving around the baby */}
      <path
        d="M23.5 33.6c3.4 3.5 9 3.6 12.6.2 3.1-3 3.4-7.9.8-11.2"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Baby: small head nestled in the crook */}
      <circle cx="31.5" cy="27.5" r="3.6" stroke={stroke} strokeWidth="2.4" />
    </svg>
  )
}

/**
 * Full lockup: the mark inside its signature gradient badge.
 * `size` controls the badge dimensions (Tailwind w-/h- classes passed in).
 */
export function LogoBadge({
  badgeClassName = 'w-12 h-12',
  markClassName = 'w-7 h-7',
}: {
  badgeClassName?: string
  markClassName?: string
}) {
  return (
    <div
      className={`${badgeClassName} bg-gradient-to-br from-primary-500 to-warmPink rounded-2xl flex items-center justify-center shadow-sm`}
    >
      <LogoMark className={markClassName} stroke="white" />
    </div>
  )
}
