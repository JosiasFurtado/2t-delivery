export default function translateWeekDay(day: string) {
    switch (day) {
      case 'sunday': {
        return 'Domingo'
      }
      case 'monday': {
        return 'Segunda-feira'
      }
      case 'tuesday': {
        return 'Terça-feira'
      }
      case 'wednesday': {
        return 'Quarta-feira'
      }
      case 'thursday': {
        return 'Quinta-feira'
      }
      case 'friday': {
        return 'Sexta-feira'
      }
      case 'saturday': {
        return 'Sábado'
      }
      default: {
        return 'Dia inválido'
      }
    }
  }