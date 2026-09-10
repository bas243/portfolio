import { LabExperiment } from '../types';

export const labExperiments: LabExperiment[] = [
  {
    id: 'geom-morph',
    number: 'EXP_01',
    title: 'TOPOLOGICAL GEOMETRY MORPHER',
    subtitle: 'Real-time mathematical surface transformations between Torus Knot, Dodecahedron, and Cyber Lattice.',
    tag: 'THREE.JS / MESH PHYSICS',
    type: 'canvas',
  },
  {
    id: 'particle-gravity',
    number: 'EXP_02',
    title: 'KINETIC PARTICLE ATTRACTOR',
    subtitle: 'Newtonian gravitational particle vortex responding dynamically to cursor position and drag forces.',
    tag: 'PHYSICS / VECTOR MATH',
    type: 'canvas',
  },
  {
    id: 'cyber-synth',
    number: 'EXP_03',
    title: 'PROCEDURAL AUDIO OSCILLATOR',
    subtitle: 'Synthesizes sci-fi sine and square frequencies on harmonic musical scales with visual oscilloscope.',
    tag: 'WEB AUDIO API',
    type: 'audio',
  },
  {
    id: 'text-decrypt',
    number: 'EXP_04',
    title: 'GLITCH CYPHER DECRYPTOR',
    subtitle: 'Cyberpunk alphanumeric descrambler engine converting encrypted binary matrices into clear text.',
    tag: 'ALGORITHMIC GLITCH',
    type: 'decrypt',
  },
];
