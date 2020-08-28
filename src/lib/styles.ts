import { create } from 'tailwind-rn'
import styles from '../../styles.json'

const { tailwind, getColor } = create({
  ...styles,
  'bg-gray-50': {
    backgroundColor: '#FCFCFC',
  },
  'bg-primary-100': {
    backgroundColor: '#E6F9F0',
  },
  'bg-primary-200': {
    backgroundColor: '#BFEFD9',
  },
  'bg-primary-300': {
    backgroundColor: '#99E5C3',
  },
  'bg-primary-400': {
    backgroundColor: '#4DD295',
  },
  'bg-primary-500': {
    backgroundColor: '#00BF68',
  },
  'bg-primary-600': {
    backgroundColor: '#00AC5E',
  },
  'bg-primary-700': {
    backgroundColor: '#00733E',
  },
  'bg-primary-800': {
    backgroundColor: '#00562F',
  },
  'bg-primary-900': {
    backgroundColor: '#00391F',
  },
  'bg-white-transparent': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  'text-primary-500': {
    color: '#00BF68',
  },
  'border-primary-500': {
    borderColor: '#00BF68',
  },
  'w-38': {
    width: 185,
  },
  'shadow-sm': {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  'shadow-md': {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  'shadow-t': {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 18,
  },
})
export { tailwind, getColor }
