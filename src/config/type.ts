export type MenuItemType = [string, string[] | []] | []
export interface RouterDefine {
  menuList: MenuItemType[]
  openMenuList: boolean[]
}

export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  disabledSort?: boolean
}

export type ActionType =
  | 'add'
  | 'edit'
  | 'save'
  | 'detail'
  | ''
  | null
  | undefined
  | 'create'
  | 'delete'
  | ''


export type PageName =
  | 'feeding'
  | 'treatment'
  | 'water-exchange'
  | 'sensor-cleaning'
  | 'biomass'
  | 'manual-input'
  | 'crops'
  | 'sludge'
  | 'product-master'
  | 'graph-search'
  | 'thresholds'
  | 'devices'
  | 'metrics'
  | 'alert-message'

export type PageMasterDataName =
  | 'operation_product_managements'
  | 'operation_sludges'
  | 'operation_devices'
  | 'operation_biomasses'
  | 'operation_water_exchanges'
  | 'manual_measurement_infos'
  | 'crops'
  | 'product_managements'
  | 'graph_metrics'
  | 'thresholds'
  | 'devices'
  | 'metrics'

export type PageMethod = 'index' | 'form'

export type Paging = {
  index?: number
  size?: number
  totalItem?: number
  totalPage?: number
  currentPage?: number
}


