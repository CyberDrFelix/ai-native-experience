# Design system

## Permanent safe-stage rule

The browser is a keynote stage, never a scrolling page. **One screen equals one complete thought.** Every meaningful label, choice, caption, and narrative element required for a beat must be simultaneously visible inside the audience safe zone.

The shared `.scene` boundary reserves responsive horizontal margins, a top identity margin, and a dedicated bottom control rail. The HUD and navigation live only in that bottom rail. Audience content cannot use the rail, sit below the fold, rely on scrolling, or be partially clipped. At minimum, every beat is composed and inspected at 1920×1080 and 1366×768. If content cannot breathe at both sizes, remove secondary material or split it across beats; do not merely shrink the composition until it technically fits.

## Character

Cinematic, restrained, sophisticated, executive. The stage uses near-black rather than pure black, warm white for primary type, muted gray for context, acid green for system/action markers, and pale blue for conceptual emphasis. Color never carries meaning alone.

## Tokens

- Canvas: `#080A0D`
- Primary text: `#F2F0EB`
- Secondary text: `#8C9198`
- System/accent: `#C8FF5A`
- Concept/emphasis: `#9CCAFF`
- Hairline: white at 9–14% opacity
- Display: local system Helvetica Neue / Segoe UI / Arial stack
- Interface: local system Inter / San Francisco / Segoe UI / Arial stack

No font request leaves the device. Proprietary font binaries are not bundled.

Typography uses responsive `clamp()` sizes and a tight display rhythm. Keynote lines should be comprehensible in a compressed video call, not merely attractive on a local monitor. Keep copy short, line lengths deliberate, and controls peripheral.

## Motion

Default reveals use 600–800ms opacity/vertical translation with an ease-out curve. Motion indicates hierarchy and state change; it never delays input or blocks recovery. Do not stack ambient animation. Under `prefers-reduced-motion: reduce`, transitions resolve immediately.

## Layout

Design from a 16:9 stage with responsive safe areas rather than fixed pixels. Current tokens reserve roughly 7vw horizontally, 8vh at the top, and 12vh/100–132px at the bottom for presenter controls. Use asymmetry and negative space. At laptop heights, reduce media scale and optional detail before shrinking central narrative type.

## Employee 001 identity (future)

Employee 001 is an abstract capability architecture: a quiet central identity surrounded by precise orbital topology. It gains structural coherence as it evolves from tool to workforce member; capability groups occupy stable quadrants around its core. This makes the character memorable through behavior, status, and relationships rather than anthropomorphism. It is never a face, body, humanoid robot, AI brain, hologram, or stock illustration.

Supporting system typography must be comfortably legible after video-call compression, not merely technically visible. Evolution labels, architecture headings, capabilities, and explanatory copy use enlarged responsive ranges; the Employee 001 core identity receives an additional 25–35% prominence. Secondary detail may recede in color, but essential language may not become microtype.

In Scene 04 the orbit becomes an organizational operating architecture. Culture enters as context, Constitution draws a governed perimeter, and Impact supplies purpose and expectations. Modules are architectural states rather than cards or settings. Decision choices are large stage objects; consequence screens replace them rather than stacking information below.
