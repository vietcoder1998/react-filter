import { DefaultPageState, PAGE_CACHE } from './config/constants'
import { Paging } from './config/type'
import { generateQueryPath } from './helpers/generator'
import { getPagingWithLocation, setPagingWithLocation } from './helpers/local-storage-handler'
import { formatMomentDate, formatStringDate } from './helpers/validate'
import React from 'react'

export type Filter<T> = T & Record<keyof T | string, any>

interface UsePropsDefaultFilter<T> {
  defaultFilter?: Filter<T>
  formats?: {
    // data: ['date', 'DD-MM-YYYY']
    [key: string]: [string, string]
  }
  actionOnFilter?: (filter: T) => any
}
const timePicker: any = null

const convertToStringValueToValidValue = (key: string, value: any, isArray?: boolean) => {
  try {
    if (key) {
      const lowerKeyCase = key.toLowerCase()

      if (isArray) {
        if (typeof value === 'string') {
          if (value.includes(',')) {
            return value.split(',')
          }
          return [value]
        }

        return [...value]
      }

      // if key include date, replace with timestamp
      const isDateValue = lowerKeyCase.includes('date') || lowerKeyCase.includes('period')
      if (isDateValue) {
        const dateConvert = value.split('-').reverse().join('-')
        const dateValue = formatMomentDate(dateConvert)?.toDate()

        return dateValue
      }

      return value
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

const convertStringValueToWithKey = (key: string, value: Date) => {
  if (!key || !value) {
    return null
  }

  if (key?.includes('period') || key?.includes('date') || key?.includes('operate')) {
    return formatStringDate(value)
  }

  return value
}

export default function useFilter<T>(props?: UsePropsDefaultFilter<T>) {
  const [filter, setFilter] = React.useState<Filter<T>>({
    ...props?.defaultFilter,
  } as Filter<T>)
  const [lastFilter, setLastFilter] = React.useState<Filter<T>>({
    ...props?.defaultFilter,
  } as Filter<T>)

  /**
   * default filter from window.path.name
   * date: new Date()
   * ~otherwise: key: string | string[] | number | number[]
   */

  const getFilter = React.useCallback((): { defaultFilter: Filter<T> } => {
    const pathFilter = Object.fromEntries(
      window.location.search
        .split('?')
        .join('')
        .split('&')
        .map((searchItem) => {
          const [key, defaultValue] = searchItem.split('=')
          const value =
            defaultValue && defaultValue.includes(',') ? defaultValue.split(',') : defaultValue
          return [key, value]
        })
        .filter(([key, value]) => key && value),
    )
    const keys = Object.keys(pathFilter ?? {}).filter((key) => key)
    const querySearch = new URLSearchParams(window.location.search)
    const rootFilter = pathFilter as Filter<T>
    const defaultPropsValue = props?.defaultFilter

    if (keys?.length) {
      for (const key of keys) {
        const queryValue = querySearch.get(key)
        const returnValue = convertToStringValueToValidValue(
          key,
          queryValue,
          defaultPropsValue && Array.isArray(defaultPropsValue[key as keyof Filter<T>]),
        )

        if (returnValue) {
          rootFilter[key as keyof Filter<T>] = returnValue
        } else {
          delete rootFilter[key as keyof Filter<T>]
        }
      }
    }

    return {
      defaultFilter: rootFilter as Filter<T>,
    }
  }, [props?.defaultFilter])

  // set filter on init
  React.useEffect(() => {
    const initFilterValue = getFilter().defaultFilter

    setFilter(initFilterValue)
  }, [])

  const page = React.useMemo(() => {
    return getPagingWithLocation()?.page
  }, [window.location.search])

  const perPage = React.useMemo(() => {
    return getPagingWithLocation()?.perPage
  }, [window.location.search])

  // Note: call onchange filter update window.location.search
  const onChangeFilter = React.useCallback(
    (key: string, value?: any) => {
      // cache filter
      const newFilter = { ...filter, [key]: value }

      setLastFilter(filter)
      setFilter(newFilter)
      resetPaging()

      // filter is object handler
      const filterSearch = Object.fromEntries(
        Object.entries(newFilter).map(([key, value]) => [
          key,
          convertStringValueToWithKey(key, value),
        ]),
      )
      const querySearch = generateQueryPath({ ...filterSearch }, true, true)
      const pathname = window.location.pathname

      window.history.replaceState({}, '', pathname + querySearch)
    },
    [filter, window.location.pathname, page, perPage],
  )
  const onChangeMultiFilter = React.useCallback(
    (names: string[], values: any[]) => {
      let editFilter = {}

      for (const index in names) {
        editFilter = { ...editFilter, [names[index]]: values[index] }
      }

      const newFilter = { ...filter, ...editFilter }

      // cache filter

      setLastFilter(filter)
      setFilter(newFilter)
      resetPaging()

      // filter is object handler
      const filterSearch = Object.fromEntries(
        Object.entries(newFilter).map(([key, value]) => [
          key,
          convertStringValueToWithKey(key, value),
        ]),
      )

      const querySearch = generateQueryPath({ ...filterSearch }, false, true)
      const pathname = window.location.pathname

      const newPath = pathname + querySearch

      window.history.replaceState({}, window.location.href, newPath)
    },
    [filter, window.location.pathname, page, perPage],
  )
  const [paging, setPaging] = React.useState<Paging>({
    totalItem: DefaultPageState.index,
    totalPage: DefaultPageState.size,
    currentPage: 0,
  })

  const getPageFilter = React.useCallback(() => {
    return getPagingWithLocation()
  }, [window.location.pathname])

  const setPageFilter = React.useCallback(
    (index: number, size: number) => {
      return setPagingWithLocation(index, size)
    },
    [window.location.pathname],
  )
  const pageCache = React.useMemo(() => {
    const data = getPageFilter()
    return data
  }, [getPageFilter])

  const resetPaging = React.useCallback(() => {
    setPagingWithLocation(DefaultPageState.index, DefaultPageState.size)
  }, [window.location.pathname])
  const onRecallFilter = React.useCallback(
    (e, vl) => {
      setPagingWithLocation(DefaultPageState.index, DefaultPageState.size)
      onChangeFilter(e, vl)
    },
    [window.location.pathname, window.localStorage[PAGE_CACHE]],
  )
  // remove time picker
  React.useEffect(() => {
    return () => {
      clearTimeout(timePicker)
    }
  }, [])

  return {
    filter,
    setFilter,
    timePicker,
    lastFilter,
    paging,
    pageCache,
    getFilter,
    onChangeFilter,
    resetPaging,
    setPaging,
    onRecallFilter,
    getPageFilter,
    setPageFilter,
    onChangeMultiFilter,
    page,
    perPage,
  }
}
