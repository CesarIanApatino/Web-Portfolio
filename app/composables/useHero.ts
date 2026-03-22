import type { HeroCornerLabel } from '~/types/stack'

type Vec3 = [number, number, number]
type ShapeArgs = number[]

interface HeroShape {
  position: Vec3
  rotation: Vec3
  color: string
  type: string
  args: ShapeArgs
  isTorus?: boolean
}

export const useHero = () => {
  const cornerLabels: HeroCornerLabel[] = [
    { position: 'tl', text: '[ 001 ]' },
    { position: 'tr', text: '[ 2025 ]' },
    { position: 'bl', text: '[ LAT: 8.947890° ]' },
    { position: 'br', text: '[ LONG: 125.532333° ]' },
  ]

  const shapes: HeroShape[] = [
    { position: [-8, -1, 2],  rotation: [0.5, 0.5, 0],    color: '#ffffff', type: 'box',          args: [2, 2, 2] },
    { position: [6, 3, -2],   rotation: [0, 0, 0],         color: '#ffffff', type: 'icosahedron',  args: [0.8, 0] },
    { position: [0, 0, 0],    rotation: [Math.PI/2, 0, 0], color: '#ff0000', type: 'torus',        args: [2, 0.7, 8, 16], isTorus: true },
    { position: [-3, -4, 1],  rotation: [0.3, 0.3, 0.3],  color: '#ffffff', type: 'box',          args: [1, 1, 1] },
    { position: [-2, 4, -3],  rotation: [0, 0.4, 0],       color: '#ffffff', type: 'octahedron',   args: [0.7] },
    { position: [4, -3, 1],   rotation: [0.2, 0, 0],       color: '#ff0000', type: 'cone',         args: [0.6, 1.5, 4] },
    { position: [5, 1, -4],   rotation: [1, 0, 0.5],       color: '#ffffff', type: 'torus',        args: [0.5, 0.15, 6, 12] },
    { position: [3, 5, 3],    rotation: [0.4, 0.6, 0.2],   color: '#ff0000', type: 'sphere',       args: [0.9, 8, 8] },
    { position: [-6, 3, 4],   rotation: [0.3, 0.5, 0.7],   color: '#ffffff', type: 'dodecahedron', args: [0.6] },
    { position: [2, -5, -3],  rotation: [0.2, 0.8, 0.4],   color: '#ff0000', type: 'tetrahedron',  args: [0.7] },
    { position: [-3, 2, 5],   rotation: [0.5, 0.2, 0.3],   color: '#ffffff', type: 'cylinder',     args: [0.5, 0.5, 1.2, 8] },
    { position: [-4, -3, 3],  rotation: [0.7, 0.4, 0.5],   color: '#ffffff', type: 'icosahedron',  args: [0.75, 1] },
    { position: [1, 5, -5],   rotation: [0.6, 0.3, 0.4],   color: '#ff0000', type: 'sphere',       args: [0.8, 8, 8] },
    { position: [-7, -4, -4], rotation: [0.5, 0.6, 0.3],   color: '#ffffff', type: 'octahedron',   args: [0.65] },
    { position: [5, 4, 3],    rotation: [0.4, 0.2, 0.5],   color: '#ff0000', type: 'cone',         args: [0.55, 1.3, 5] },
  ]

  return { cornerLabels, shapes }
}