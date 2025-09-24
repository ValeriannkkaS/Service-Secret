import type { optionForSelect } from '@/constants&interfaces/interfaces.ts'

export const optionsCountOfSymbols: optionForSelect[] = [
  {
    id: 1,
    text: '8 символов',
    value: 8,
  },
  {
    id: 2,
    text: '12 символов',
    value: 12,
  },
  {
    id: 3,
    text: '15 символов',
    value: 15,
  },
]
export const optionsExpiresIn: optionForSelect[] = [
  {
    id: 1,
    text: '1 день',
    value: 86400000,
  },
  {
    id: 2,
    text: '3 дня',
    value: 259200000,
  },
  {
    id: 3,
    text: '5 дней',
    value: 432000000,
  },
  {
    id: 4,
    text: '10 дней',
    value: 864000000,
  },
]
export const optionsCountOfViews: optionForSelect[] = [
  {
    id: 1,
    text: '1 просмотр',
    value: 1,
  },
  {
    id: 2,
    text: '3 просмотра',
    value: 3,
  },
  {
    id: 3,
    text: '5 просмотров',
    value: 5,
  },
]
