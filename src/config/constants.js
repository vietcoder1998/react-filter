"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterDataValue = exports.MasterDataViewKey = exports.MasterDataView = exports.PRODUCTION_SEARCH_PATHNAME = exports.DASHBOARD_SEARCH_PATHNAME = exports.POSITION_OPTIONS = exports.SIDE_BAR_OPEN = exports.PermissionAdmin = exports.PermissionUser = exports.STATUS_CODE_FIRST_LOGIN = exports.ITEMS_PAGE = exports.DefaultPageState = exports.PHONE_REGEX = exports.POSTAL_CODE_REGEX = exports.PASSWORD_REGEX = exports.EMAIL_REGEX = exports.USERNAME_REGEX = exports.LANGUAGE = exports.MAX_FILE_UPLOAD = exports.APP_BAR_HEADER = exports.PAGE_CACHE = exports.PAGE_SIZE = exports.PAGE_INDEX = exports.USER_LAST_LOGIN_PATH = exports.USER_TYPE_KEY = exports.LAST_ROUTER_PATH = exports.FormList = exports.Role = exports.Status = exports.BaseStatus = exports.USER_TYPE = exports.USER_INFO_KEY = exports.IS_REMEMBER_ME = exports.LAST_USERNAME = exports.LAST_COMPANY_CODE = exports.TOKEN_KEY = exports.USER_KEY = exports.LANGUAGE_DEFAULT = exports.BASE_NAME = exports.LANGUAGES = exports.APP_CONTENT = exports.APP_TITLE = void 0;
exports.APP_TITLE = 'Shrimp Farming';
exports.APP_CONTENT = 'Shrimp Farming Admin';
exports.LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本' },
    { code: 'zh-CN', name: '中国人' },
];
exports.BASE_NAME = "SWGE";
exports.LANGUAGE_DEFAULT = 'en';
exports.USER_KEY = 'USER';
exports.TOKEN_KEY = 'SWGE_TOKEN';
exports.LAST_COMPANY_CODE = 'SWGE_LAST_COMPANY_CODE';
exports.LAST_USERNAME = 'SWGE_LAST_USERNAME';
exports.IS_REMEMBER_ME = 'SWGE_IS_REMEMBER_ME';
exports.USER_INFO_KEY = 'SWGE_USER_INFO';
exports.USER_TYPE = {
    admin: 'admin',
    tenant: 'tenant',
    user: 'user',
};
var BaseStatus;
(function (BaseStatus) {
    BaseStatus["active"] = "active";
    BaseStatus["inactive"] = "inactive";
})(BaseStatus || (exports.BaseStatus = BaseStatus = {}));
var Status;
(function (Status) {
    Status["show"] = "show";
    Status["hide"] = "hide";
})(Status || (exports.Status = Status = {}));
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["staff"] = "staff";
})(Role || (exports.Role = Role = {}));
var FormList;
(function (FormList) {
    FormList["CropFormData"] = "crop-form-data";
    FormList["BiomassFormData"] = "biomass-form-data";
    FormList["FeedingFormData"] = "feeding-form-data";
    FormList["WaterQualityFormData"] = "water-quality-form-data";
    FormList["SludgeFormData"] = "sludge-form-data";
    FormList["SensorCleaningFormData"] = "sensor-cleaning-form-data";
    FormList["ThresholdFormData"] = "threshold-form-data";
    FormList["DevicesFormData"] = "devices-form-data";
    FormList["ClassificationFormData"] = "classification-form-data";
    FormList["MeasureItemFormStateData"] = "measure-item-form-state-metadata";
    FormList["ProductFormData"] = "product-form-data";
    FormList["UserFormData"] = "user-form-data";
    FormList["NotificationsFormData"] = "notifications-form-data";
})(FormList || (exports.FormList = FormList = {}));
exports.LAST_ROUTER_PATH = 'SWGE_last_router';
exports.USER_TYPE_KEY = 'SWGE_USER_TYPE';
exports.USER_LAST_LOGIN_PATH = 'SWGE_LAST_LOGIN_PATH';
exports.PAGE_INDEX = 'SWGE_page_index';
exports.PAGE_SIZE = 'SWGE_page_size';
exports.PAGE_CACHE = 'SWGE_page_cache';
exports.APP_BAR_HEADER = {
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
};
exports.MAX_FILE_UPLOAD = 25 * 1024 * 1024; // 25MB
exports.LANGUAGE = 'SWGE_lg';
exports.USERNAME_REGEX = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
exports.EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
exports.POSTAL_CODE_REGEX = /^[0-9]{1,7}$/;
exports.PHONE_REGEX = /^\d{10,}$/;
var DefaultPageState;
(function (DefaultPageState) {
    DefaultPageState[DefaultPageState["index"] = 0] = "index";
    DefaultPageState[DefaultPageState["size"] = 10] = "size";
})(DefaultPageState || (exports.DefaultPageState = DefaultPageState = {}));
exports.ITEMS_PAGE = 1000;
exports.STATUS_CODE_FIRST_LOGIN = 1008;
var PermissionUser;
(function (PermissionUser) {
    PermissionUser["view_dashboard"] = "view_dashboard";
    PermissionUser["view_manual_input"] = "view_manual_input";
    PermissionUser["view_production"] = "view_production";
    PermissionUser["view_devices"] = "view_devices";
    PermissionUser["view_thresholds"] = "view_thresholds";
    PermissionUser["view_setting_classifications"] = "view_setting_classifications";
    PermissionUser["view_setting_pond"] = "view_setting_pond";
    PermissionUser["view_setting_measurement_items"] = "view_setting_measurement_items";
    PermissionUser["view_setting_notification"] = "view_setting_notification";
    PermissionUser["view_setting_products"] = "view_setting_products";
    PermissionUser["view_setting_user"] = "view_setting_user";
    PermissionUser["view_notification"] = "view_notification";
})(PermissionUser || (exports.PermissionUser = PermissionUser = {}));
var PermissionAdmin;
(function (PermissionAdmin) {
    PermissionAdmin["view_user"] = "view_user";
    PermissionAdmin["view_master_user"] = "view_master_user";
    PermissionAdmin["view_event"] = "view_event";
    PermissionAdmin["view_usage"] = "view_usage";
})(PermissionAdmin || (exports.PermissionAdmin = PermissionAdmin = {}));
exports.SIDE_BAR_OPEN = "".concat(exports.BASE_NAME, "_SIDE_BAR_OPEN");
exports.POSITION_OPTIONS = ['left_y', 'right_y'];
exports.DASHBOARD_SEARCH_PATHNAME = '/dashboard/graph-search';
exports.PRODUCTION_SEARCH_PATHNAME = '/production/management/graph-activity';
exports.MasterDataView = {
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
};
exports.MasterDataViewKey = Object.keys(exports.MasterDataView);
exports.MasterDataValue = Object.values(exports.MasterDataView).reduce(function (a, b) { return __spreadArray(__spreadArray([], a, true), b, true); }, []);
