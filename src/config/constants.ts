import { PageMasterDataName, PageName } from './type'

export const APP_TITLE = 'Shrimp Farming'
export const APP_CONTENT = 'Shrimp Farming Admin'
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本' },
  { code: 'zh-CN', name: '中国人' },
]
export const BASE_NAME = `SWGE`
export const LANGUAGE_DEFAULT = 'en'
export const USER_KEY = 'USER'
export const TOKEN_KEY = 'SWGE_TOKEN'
export const LAST_COMPANY_CODE = 'SWGE_LAST_COMPANY_CODE'
export const LAST_USERNAME = 'SWGE_LAST_USERNAME'
export const IS_REMEMBER_ME = 'SWGE_IS_REMEMBER_ME'
export const USER_INFO_KEY = 'SWGE_USER_INFO'
export const USER_TYPE = {
  admin: 'admin',
  tenant: 'tenant',
  user: 'user',
}

export enum BaseStatus {
  active = 'active',
  inactive = 'inactive',
}

export enum Status {
  show = 'show',
  hide = 'hide',
}

export enum Role {
  admin = 'admin',
  staff = 'staff',
}

export enum FormList {
  CropFormData = 'crop-form-data',
  BiomassFormData = 'biomass-form-data',
  FeedingFormData = 'feeding-form-data',
  WaterQualityFormData = 'water-quality-form-data',
  SludgeFormData = 'sludge-form-data',
  SensorCleaningFormData = 'sensor-cleaning-form-data',
  ThresholdFormData = 'threshold-form-data',
  DevicesFormData = 'devices-form-data',
  ClassificationFormData = 'classification-form-data',
  MeasureItemFormStateData = 'measure-item-form-state-metadata',
  ProductFormData = 'product-form-data',
  UserFormData = 'user-form-data',
  NotificationsFormData = 'notifications-form-data',
}

export const LAST_ROUTER_PATH = 'SWGE_last_router'
export const USER_TYPE_KEY = 'SWGE_USER_TYPE'
export const USER_LAST_LOGIN_PATH = 'SWGE_LAST_LOGIN_PATH'
export const PAGE_INDEX = 'SWGE_page_index'
export const PAGE_SIZE = 'SWGE_page_size'
export const PAGE_CACHE = 'SWGE_page_cache'
export const APP_BAR_HEADER = {
  dashboard: 'DashBoard',
  graph: 'Graph',
  production: 'Production',
  manual: 'Manual Input',
  sensor: 'Sensor',
  setting: 'Settings',
  logout: 'LogOut',
  feeding: 'Feeding',
  biomass: 'Biomass',
  waterEchange: 'Water exchange',
  waterQuality: 'Treatment',
  sensorCleaning: 'Sensor Cleaning',
  crop: 'Crop',
  classification: 'Classifications',
  threshold: 'Thresholds',
  device: 'Devices',
  user: 'user',
  productMaster: 'Products Master',
  notification: 'Notification',
  pond: 'Ponds',
  graphAndTable: 'Graph & Table',
  sofc: 'SOFC',
  measurementItems: 'Measurement Items',
  sensors: 'Sensors',
  login: 'Login',
  admin: 'v1',
  tenant: 'Tenants',
  masterUser: 'Master User',
  tenantUser: 'Tenant User',
  event: 'Event',
  usage: 'Usage',
  sludge: 'Sludge',
}

export const MAX_FILE_UPLOAD = 25 * 1024 * 1024 // 25MB
export const LANGUAGE = 'SWGE_lg'
export const USERNAME_REGEX = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
export const POSTAL_CODE_REGEX = /^[0-9]{1,7}$/
export const PHONE_REGEX = /^\d{10,}$/
export enum DefaultPageState {
  index = 0,
  size = 10,
}
export const ITEMS_PAGE = 1000
export const STATUS_CODE_FIRST_LOGIN = 1008

export enum PermissionUser {
  view_dashboard = 'view_dashboard',
  view_manual_input = 'view_manual_input',
  view_production = 'view_production',
  view_devices = 'view_devices',
  view_thresholds = 'view_thresholds',
  view_setting_classifications = 'view_setting_classifications',
  view_setting_pond = 'view_setting_pond',
  view_setting_measurement_items = 'view_setting_measurement_items',
  view_setting_notification = 'view_setting_notification',
  view_setting_products = 'view_setting_products',
  view_setting_user = 'view_setting_user',
  view_notification = 'view_notification',
}

export enum PermissionAdmin {
  view_user = 'view_user',
  view_master_user = 'view_master_user',
  view_event = 'view_event',
  view_usage = 'view_usage',
}

export const SIDE_BAR_OPEN = `${BASE_NAME}_SIDE_BAR_OPEN`
export const POSITION_OPTIONS = ['left_y', 'right_y']
export const DASHBOARD_SEARCH_PATHNAME = '/dashboard/graph-search'
export const PRODUCTION_SEARCH_PATHNAME = '/production/management/graph-activity'

export const MasterDataView: Record<PageMasterDataName, PageName[]> = {
  operation_product_managements: ['feeding', 'treatment'],
  operation_sludges: ['sludge'],
  operation_devices: ['sensor-cleaning'],
  operation_water_exchanges: ['water-exchange'],
  operation_biomasses: ['biomass'],
  manual_measurement_infos: ['manual-input'],
  crops: ['crops'],
  product_managements: ['product-master'],
  graph_metrics: ['graph-search'],
  thresholds: ['thresholds'],
  devices: ['devices'],
  metrics: ['metrics'],
}

export const MasterDataViewKey = Object.keys(MasterDataView)
export const MasterDataValue = Object.values(MasterDataView).reduce((a, b) => [...a, ...b], [])
