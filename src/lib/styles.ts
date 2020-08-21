import { create } from 'tailwind-rn'
import styles from '../../styles.json'

const { tailwind, getColor } = create({
  ...styles,
  'bg-primary-100': {
    backgroundColor: '#E6F5EE',
  },
  'bg-primary-200': {
    backgroundColor: '#C0E5D4',
  },
  'bg-primary-300': {
    backgroundColor: '#99D6BA',
  },
  'bg-primary-400': {
    backgroundColor: '#4DB787',
  },
  'bg-primary-500': {
    backgroundColor: '#019853',
  },
  'bg-primary-600': {
    backgroundColor: '#01894B',
  },
  'bg-primary-700': {
    backgroundColor: '#015B32',
  },
  'bg-primary-800': {
    backgroundColor: '#004425',
  },
  'bg-primary-900': {
    backgroundColor: '#002E19',
  },
  'bg-white-transparent': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  'text-primary-500': {
    color: '#019853',
  },
  'border-primary-500': {
    borderColor: '#019853',
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
