import moment from 'moment'

export function upperCaseToLowerCase(word?: string) {
  if (!word) {
    return ''
  }
  const len = word.length
  let newWord = word
  let i = 0

  while (i < len) {
    if (containsUppercase(word.charAt(i))) {
      newWord =
        word.substring(0, i) + '_' + word.charAt(i).toLowerCase() + word.substring(i + 1, len)
    }
    i++
  }

  return newWord
}

export function camelCaseToDashed(word?: string) {
  if (!word || word === '') {
    return ''
  }
  const nWord = word.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase())

  return [nWord.slice(0, 2).replace('_', ''), nWord.slice(2)].join('')
}

export function dashedToCamel(word?: string): string {
  if (!word) {
    return ''
  }
  const len = word.length
  let newWord = word
  let i = 0

  while (i < len) {
    const characterNextFromWord = word.charAt(i - 1)
    if (characterNextFromWord === '_' || characterNextFromWord === '-') {
      newWord = word.substring(0, i - 1) + word.charAt(i).toUpperCase() + word.substring(i + 1, len)
    }
    i++
  }

  return newWord
}

export function dashedToLowerCased(word?: string): string {
  if (!word) {
    return ''
  }
  const len = word.length
  let newWord = word
  let i = 0

  while (i < len) {
    const characterNextFromWord = word.charAt(i - 1)
    if (characterNextFromWord === '_' || characterNextFromWord === '-') {
      newWord =
        word.substring(0, i - 1) + ' ' + word.charAt(i).toLowerCase() + word.substring(i + 1, len)
    }
    i++
  }

  return newWord
}

function containsUppercase(str: string) {
  return /[A-Z]/.test(str)
}

export const DEFAULT_FORMAT_DATE = 'DD-MM-YYYY'
export const DEFAULT_FORMAT_DATE_TIME = 'DD-MM-YYYY HH:mm'

export const formatDate = (
  input?: string | Date | null,
  options?: {
    format?: string
    type?: 'utc' | null
    returnType?: 'string' | 'Date' | 'number' | 'moment' | 'utc'
  },
) => {
  if (!input || input === '') {
    return null
  }

  const format = options?.format || DEFAULT_FORMAT_DATE
  const returnType = options?.returnType || 'string'
  const strInput = String(input ?? '')
  const momentValue = moment(strInput)
  const formatValue = moment(strInput).format(format)
  const dateValue = moment(strInput).toDate()

  switch (returnType) {
    case 'string':
      return String(formatValue)
    case 'Date':
      return dateValue
    case 'moment':
      if (!strInput) {
        return null
      }
      return momentValue
    case 'utc':
      return momentValue.add('hour', 7)
    default:
      return formatValue
  }
}

export function formatNumberDate(input?: string | Date | null, format?: string): number {
  if (!input) {
    return 0
  }
  return Number(formatDate(input, { format, returnType: 'number' }))
}

export function formatStringDate(input?: string | Date | null, format?: string): string {
  if (!input) {
    return ''
  }
  return String(formatDate(input, { format, returnType: 'string' }))
}

export function formatMomentDate(
  input?: string | Date | null,
  format?: string,
): moment.Moment | null {
  const value = formatDate(input, { format, returnType: 'moment' }) as moment.Moment

  if (!input) {
    return null
  }

  return value
}

export function wordToCamelStyle(word?: string) {
  if (!word) {
    return ''
  }

  const breakWords = word.split(' ')
  if (breakWords && breakWords.length > 0) {
    return breakWords.reduce(
      (str, word, index) => str + (index ? dashedToCamel(word) : word.toLocaleLowerCase()),
      '',
    )
  }
  return ''
}

export function convertNullAndUndefinedTextToDash(text: any) {
  if ((typeof text === 'string' && ['null', 'undefined'].includes(text)) || !text) {
    return '-'
  }

  return text
}

export function convertToISO8601(text: string | Date): string {
  if (!text) {
    return ''
  }

  if (typeof text === 'string') {
    const newDate = new Date(text)

    return newDate.toISOString()
  }

  return text.toISOString()
}

export const backToPreviousScreen = () => history.back()

export const formatNumber = (value: number | string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatCurrency = (value: number, currency: string) => {
  if (isNaN(value)) return '-'
  return currency.toUpperCase() + ' ' + formatNumber(value)
}
