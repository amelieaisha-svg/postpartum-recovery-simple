'use client'

import React, { useState } from 'react'

/**
 * Brand mark for PostpartumRecovery.
 *
 * Renders the illustrated two-moms-and-heart logo from /public/logo.png,
 * masked to a circle. If that image is missing (e.g. not added yet), it
 * falls back to a clean pink monogram instead of a broken-image icon.
 */
export function LogoBadge({
  badgeClassName = 'w-12 h-12',
  // Accepted for backwards compatibility with existing call sites.
  markClassName,
}: {
  badgeClassName?: string
  markClassName?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`${badgeClassName} rounded-full bg-babyPink flex items-center justify-center text-primary-800 font-bold ring-1 ring-black/5`}
      >
        <span style={{ fontSize: '0.55em' }}>PR</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="PostpartumRecovery logo"
      onError={() => setFailed(true)}
      className={`${badgeClassName} rounded-full object-cover bg-babyPinkSoft`}
    />
  )
}
