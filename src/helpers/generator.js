"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageMasterDataFromPageName = exports.generateSingleQueryPath = exports.generateQueryPath = void 0;
var constants_1 = require("../config/constants");
var local_storage_handler_1 = require("./local-storage-handler");
function generateQueryPath(query, disabledPaging, isForParamUsed) {
    var _a, _b;
    if ((!query || Object.keys(query).length === 0) && !disabledPaging) {
        return '';
    }
    var pageCache = (0, local_storage_handler_1.getPagingWithLocation)();
    var queryWithPaging = Object.fromEntries(Object.entries(__assign(__assign({}, (disabledPaging
        ? {}
        : { page: (_a = (pageCache === null || pageCache === void 0 ? void 0 : pageCache.page) + 1) !== null && _a !== void 0 ? _a : 1, perPage: (_b = pageCache === null || pageCache === void 0 ? void 0 : pageCache.perPage) !== null && _b !== void 0 ? _b : 10 })), (query !== null && query !== void 0 ? query : {}))).filter(function (value) {
        return value && (value === null || value === void 0 ? void 0 : value.at(1));
    }));
    var queryValuesFull = Object.values(queryWithPaging).reduce(function (a, b) { return a + String(b !== null && b !== void 0 ? b : ''); }, '');
    if (!queryValuesFull) {
        return '';
    }
    var queryString = Object.entries(queryWithPaging).reduce(function (a, _a, index) {
        var name = _a[0], value = _a[1];
        return a + generateSingleQueryPath(name, value, index, isForParamUsed);
    }, '?');
    if (!queryString) {
        return '';
    }
    return queryString;
}
exports.generateQueryPath = generateQueryPath;
function generateSingleQueryPath(name, value, position, isForParamUsed) {
    var initPath = !position ? '' : '&';
    if (!value || value.length === 0 || ['null', 'undefined'].includes(value)) {
        return '';
    }
    if (Array.isArray(value)) {
        if (isForParamUsed) {
            return initPath + "".concat(name, "=").concat(value.join(','));
        }
        if (value.length === 1) {
            return initPath + "".concat(name, "=").concat(value === null || value === void 0 ? void 0 : value.at(0));
        }
        return initPath + "".concat(name, "=").concat(value.join(','));
    }
    return initPath + "".concat(name, "=").concat(value);
}
exports.generateSingleQueryPath = generateSingleQueryPath;
function getPageMasterDataFromPageName(pageName) {
    var _a;
    if (!pageName) {
        return;
    }
    return (_a = Object.entries(constants_1.MasterDataView)
        .find(function (_a) {
        var key = _a[0], values = _a[1];
        return key && (values === null || values === void 0 ? void 0 : values.includes(pageName));
    })) === null || _a === void 0 ? void 0 : _a.at(0);
}
exports.getPageMasterDataFromPageName = getPageMasterDataFromPageName;
