import {
  DASHBOARD_SEARCH_PATHNAME,
  DefaultPageState,
  LANGUAGE,
  PAGE_CACHE,
  SIDE_BAR_OPEN,
} from '../config/constants'
import { getAsJSON, getAsString, setAsJSON, setAsString } from './local-storage'

export interface PageCacheItem {
  index: number
  size: number
  graphs?: { id: string; type: string }[]
  panelList?: string[]
  args?: any[]
  productionDisplay?: { [key: string]: string }
  cropOptions?: { [key: string]: string[] | never[] }
}

export function setBarOpenState(open: boolean) {
  setAsString(SIDE_BAR_OPEN, Number(open).toString())
}

export function getBarOpenState() {
  const strState = getAsString(SIDE_BAR_OPEN)
  return !strState ? true : Boolean(parseInt(strState, 10))
}

export const getPageCache = (path?: string): PageCacheItem => {
  if (typeof window !== 'undefined' && path) {
    const pageCache = getAsJSON(PAGE_CACHE)

    if (!pageCache || !pageCache[path]) {
      return {
        index: 0,
        size: 10,
      }
    }

    return {
      ...pageCache[path],
      index: Number(pageCache[path].index ?? 0),
      size: Number(pageCache[path].size ?? 10),
    } as PageCacheItem
  }

  return {
    index: 0,
    size: 10,
  }
}

export const setPagingWithLocation = (page?: number, perPage?: number) => {
  // Get the current URL
  const url = new URL(window.location.href)

  // Get the search parameters from the URL
  const searchParams = new URLSearchParams(url.search)

  // Remove the desired search parameter
  searchParams.set('page', String(page ?? 0))
  searchParams.set('perPage', String(perPage ?? 10))

  // Update the URL with the modified search parameters
  url.search = searchParams.toString()

  // Redirect the user to the updated URL
  history.replaceState({}, '', url.toString())
}

export const getPagingWithLocation = () => {
  // Get the current URL
  const url = new URL(window.location.href)

  // Get the search parameters from the URL
  const searchParams = new URLSearchParams(url.search)

  // Redirect the user to the updated URL
  return {
    page: Number(searchParams.get('page') ?? DefaultPageState.index),
    perPage: Number(searchParams.get('perPage') ?? DefaultPageState.size),
  }
}

export const setPageCache = (
  data: { path: string; index?: number; size?: number },
  value?: Record<string, any>,
) => {
  const { path } = data
  const lastPathPageCache = getPageCache(path)
  const lastCache = getAsJSON(PAGE_CACHE)
  // const newQueryPath = createNewHrefWithPageAndPerPage(data?.index, data?.size)

  // history.replaceState({}, window.location.href, newQueryPath)
  if (typeof window !== 'undefined') {
    setAsJSON(PAGE_CACHE, {
      ...(lastCache ? lastCache : {}),
      [path]: {
        ...lastPathPageCache,
        ...value,
        ...(!isNaN(Number(data.index)) && { index: data.index }),
        ...(!isNaN(Number(data.size)) && { size: data.size }),
      },
    })
  }

  return 1
}

export function setLanguage(language: 'vi' | 'en' | 'jp') {
  setAsString(LANGUAGE, language)

  return 1
}

export function getLanguage() {
  return getAsString(LANGUAGE)
}

// Note: init graph, get data list and set to graph detail
export function getGraphPosition(path: string) {
  return path === DASHBOARD_SEARCH_PATHNAME ? 'dashboard' : 'product_management'
}

export function getGraphDataList(path?: string) {
  return getPageCache(path)?.graphs
}

export function updateGraphDataList(path?: string, graphList?: { id: string; type: string }[]) {
  const savePath = path ?? window.location.pathname

  return setPageCache({ path: savePath }, { graphs: graphList })
}


export function onUpdateSyncState(id: string, state: boolean, path?: string) {
  const graphList = getGraphDataList(path)

  updateGraphDataList(path, graphList)

  return { code: 1, msg: 'Success' }
}

export function onDisableGraphState(id: string, path?: string) {
  try {
    return onUpdateSyncState(id, false, path)
  } catch (error) {
    return { error: error, code: -1 }
  }
}

export function onEnableGraphState(id: string, path?: string) {
  try {
    return onUpdateSyncState(id, true, path)
  } catch (error) {
    return { error: error, code: -1 }
  }
}


export const Filterer = {
  getSearchParams: function () {
    const search = window.location.search
    const params = {}

    // Remove the leading '?' character if it exists
    const searchParams = search.substring(1).split('&')

    for (const param of searchParams) {
      const [key, value] = param.split('=')
      params[key] = decodeURIComponent(value)
    }

    return params
  },
  filter: function (data, filters) {
    const params = this.getSearchParams()

    // Apply the filters
    const filteredData = data.filter((item) => {
      for (const key in filters) {
        if (item[key] !== params[key]) {
          return false
        }
      }
      return true
    })

    return filteredData
  },

  isFilterWithoutPageAndPerPage: function () {
    const values = Object.entries(this.getSearchParams() ?? {})?.filter(
      (item?: [string, unknown]) =>
        item && item[0] && !['page', 'perPage'].includes(String(item[0])),
    )

    return values?.length > 0
  },
  isFilterWithoutPageAndPerPageInoperation: function () {
    const values = Object.entries(this.getSearchParams() ?? {})?.filter(
      (item?: [string, unknown]) =>
        item && item[0] && !['page', 'perPage', 'inOperation'].includes(String(item[0])),
    )

    return values?.length > 0
  },
}
