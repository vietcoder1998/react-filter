import { MasterDataView } from '../config/constants'
import { PageMasterDataName, PageName } from '../config/type'
import { getPagingWithLocation } from './local-storage-handler'

export function generateQueryPath(
  query?: { [key: string]: any | undefined },
  disabledPaging?: boolean,
  isForParamUsed?: boolean,
): string {
  if ((!query || Object.keys(query).length === 0) && !disabledPaging) {
    return ''
  }

  const pageCache = getPagingWithLocation()
  const queryWithPaging = Object.fromEntries(
    Object.entries({
      ...(disabledPaging
        ? {}
        : { page: pageCache?.page + 1 ?? 1, perPage: pageCache?.perPage ?? 10 }),
      ...(query ?? {}),
    }).filter((value) => {
      return value && value?.at(1)
    }),
  )

  const queryValuesFull = Object.values(queryWithPaging).reduce((a, b) => a + String(b ?? ''), '')

  if (!queryValuesFull) {
    return ''
  }

  const queryString = Object.entries(queryWithPaging).reduce(
    (a, [name, value], index) => a + generateSingleQueryPath(name, value, index, isForParamUsed),
    '?',
  )

  if (!queryString) {
    return ''
  }

  return queryString
}

export function generateSingleQueryPath(
  name: string,
  value: any,
  position: number,
  isForParamUsed?: boolean,
): string {
  const initPath = !position ? '' : '&'

  if (!value || value.length === 0 || ['null', 'undefined'].includes(value)) {
    return ''
  }

  if (Array.isArray(value)) {
    if (isForParamUsed) {
      return initPath + `${name}=${value.join(',')}`
    }

    if (value.length === 1) {
      return initPath + `${name}=${value?.at(0)}`
    }

    return initPath + `${name}=${value.join(',')}`
  }

  return initPath + `${name}=${value}`
}

export function getPageMasterDataFromPageName(pageName?: PageName): PageMasterDataName | undefined {
  if (!pageName) {
    return
  }

  return Object.entries(MasterDataView)
    .find(([key, values]) => key && values?.includes(pageName))
    ?.at(0) as PageMasterDataName
}
