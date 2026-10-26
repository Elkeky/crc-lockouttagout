/**
 * RTG (Rubber Tyred Gantry) crane silhouette — SVG icon.
 * Uses currentColor so it inherits from CSS.
 */
export default function GantryIcon({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 90"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Top beam ── */}
      <rect x="4" y="18" width="92" height="7" rx="2" fill="currentColor" />

      {/* ── Left cantilever arm ── */}
      <rect x="0" y="18" width="16" height="5" rx="1.5" fill="currentColor" />

      {/* ── Right cantilever arm ── */}
      <rect x="84" y="18" width="16" height="5" rx="1.5" fill="currentColor" />

      {/* ── Left leg ── */}
      <rect x="10" y="25" width="9" height="46" rx="2" fill="currentColor" />

      {/* ── Right leg ── */}
      <rect x="81" y="25" width="9" height="46" rx="2" fill="currentColor" />

      {/* ── Left diagonal brace ── */}
      <line x1="14" y1="25" x2="22" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="48" x2="22" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* ── Right diagonal brace ── */}
      <line x1="86" y1="25" x2="78" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="86" y1="48" x2="78" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* ── Trolley body ── */}
      <rect x="43" y="25" width="14" height="8" rx="2" fill="currentColor" />

      {/* ── Trolley wheels on beam ── */}
      <circle cx="46" cy="24" r="2.5" fill="currentColor" />
      <circle cx="54" cy="24" r="2.5" fill="currentColor" />

      {/* ── Hoist rope ── */}
      <rect x="49" y="33" width="2" height="22" fill="currentColor" rx="1" />

      {/* ── Spreader bar ── */}
      <rect x="38" y="55" width="24" height="5" rx="2" fill="currentColor" />
      <rect x="39" y="60" width="3" height="5" rx="1" fill="currentColor" />
      <rect x="58" y="60" width="3" height="5" rx="1" fill="currentColor" />

      {/* ── Left wheel bogey ── */}
      <rect x="4" y="71" width="20" height="5" rx="2" fill="currentColor" />
      <circle cx="8"  cy="80" r="5" fill="currentColor" />
      <circle cx="20" cy="80" r="5" fill="currentColor" />

      {/* ── Right wheel bogey ── */}
      <rect x="76" y="71" width="20" height="5" rx="2" fill="currentColor" />
      <circle cx="80" cy="80" r="5" fill="currentColor" />
      <circle cx="92" cy="80" r="5" fill="currentColor" />
    </svg>
  )
}
