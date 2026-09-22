export type Position = { scene: number; beat: number }

export function move(position: Position, direction: 1 | -1, beatCounts: number[]): Position {
  let { scene, beat } = position
  if (direction === 1) {
    if (beat < beatCounts[scene] - 1) beat += 1
    else if (scene < beatCounts.length - 1) { scene += 1; beat = 0 }
  } else if (beat > 0) beat -= 1
  else if (scene > 0) { scene -= 1; beat = beatCounts[scene] - 1 }
  return { scene, beat }
}
