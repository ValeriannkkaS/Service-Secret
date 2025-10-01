import type { optionForSelect } from '@/constants&interfaces/interfaces.ts'

export const optionsCountOfSymbols: optionForSelect[] = [
  {
    id: 1,
    text: {
      ru: '8 символов',
      en: '8 symbols',
    },
    value: 8,
  },
  {
    id: 2,
    text: {
      ru: '12 символов',
      en: '12 symbols',
    },
    value: 12,
  },
  {
    id: 3,
    text: {
      ru: '15 символов',
      en: '15 symbols',
    },
    value: 15,
  },
]
export const optionsExpiresIn: optionForSelect[] = [
  {
    id: 1,
    text: { ru: '1 день', en: '1 day' },
    value: 86400000,
  },
  {
    id: 2,
    text: { ru: '3 дня', en: '3 days' },
    value: 259200000,
  },
  {
    id: 3,
    text: { ru: '5 дней', en: '5 days' },
    value: 432000000,
  },
  {
    id: 4,
    text: { ru: '10 дней', en: '10 days' },
    value: 864000000,
  },
]
export const optionsCountOfViews: optionForSelect[] = [
  {
    id: 1,
    text: { ru: '1 просмотр', en: '1 view' },
    value: 1,
  },
  {
    id: 2,
    text: { ru: '3 просмотра', en: '3 views' },
    value: 3,
  },
  {
    id: 3,
    text: { ru: '5 просмотров', en: '5 views' },
    value: 5,
  },
]
