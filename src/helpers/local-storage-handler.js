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
exports.Filterer = exports.onEnableGraphState = exports.onDisableGraphState = exports.onUpdateSyncState = exports.updateGraphDataList = exports.getGraphDataList = exports.getGraphPosition = exports.getLanguage = exports.setLanguage = exports.setPageCache = exports.getPagingWithLocation = exports.setPagingWithLocation = exports.getPageCache = exports.getBarOpenState = exports.setBarOpenState = void 0;
var constants_1 = require("../config/constants");
var local_storage_1 = require("./local-storage");
function setBarOpenState(open) {
    (0, local_storage_1.setAsString)(constants_1.SIDE_BAR_OPEN, Number(open).toString());
}
exports.setBarOpenState = setBarOpenState;
function getBarOpenState() {
    var strState = (0, local_storage_1.getAsString)(constants_1.SIDE_BAR_OPEN);
    return !strState ? true : Boolean(parseInt(strState, 10));
}
exports.getBarOpenState = getBarOpenState;
var getPageCache = function (path) {
    var _a, _b;
    if (typeof window !== 'undefined' && path) {
        var pageCache = (0, local_storage_1.getAsJSON)(constants_1.PAGE_CACHE);
        if (!pageCache || !pageCache[path]) {
            return {
                index: 0,
                size: 10,
            };
        }
        return __assign(__assign({}, pageCache[path]), { index: Number((_a = pageCache[path].index) !== null && _a !== void 0 ? _a : 0), size: Number((_b = pageCache[path].size) !== null && _b !== void 0 ? _b : 10) });
    }
    return {
        index: 0,
        size: 10,
    };
};
exports.getPageCache = getPageCache;
var setPagingWithLocation = function (page, perPage) {
    // Get the current URL
    var url = new URL(window.location.href);
    // Get the search parameters from the URL
    var searchParams = new URLSearchParams(url.search);
    // Remove the desired search parameter
    searchParams.set('page', String(page !== null && page !== void 0 ? page : 0));
    searchParams.set('perPage', String(perPage !== null && perPage !== void 0 ? perPage : 10));
    // Update the URL with the modified search parameters
    url.search = searchParams.toString();
    // Redirect the user to the updated URL
    history.replaceState({}, '', url.toString());
};
exports.setPagingWithLocation = setPagingWithLocation;
var getPagingWithLocation = function () {
    var _a, _b;
    // Get the current URL
    var url = new URL(window.location.href);
    // Get the search parameters from the URL
    var searchParams = new URLSearchParams(url.search);
    // Redirect the user to the updated URL
    return {
        page: Number((_a = searchParams.get('page')) !== null && _a !== void 0 ? _a : constants_1.DefaultPageState.index),
        perPage: Number((_b = searchParams.get('perPage')) !== null && _b !== void 0 ? _b : constants_1.DefaultPageState.size),
    };
};
exports.getPagingWithLocation = getPagingWithLocation;
var setPageCache = function (data, value) {
    var _a;
    var path = data.path;
    var lastPathPageCache = (0, exports.getPageCache)(path);
    var lastCache = (0, local_storage_1.getAsJSON)(constants_1.PAGE_CACHE);
    // const newQueryPath = createNewHrefWithPageAndPerPage(data?.index, data?.size)
    // history.replaceState({}, window.location.href, newQueryPath)
    if (typeof window !== 'undefined') {
        (0, local_storage_1.setAsJSON)(constants_1.PAGE_CACHE, __assign(__assign({}, (lastCache ? lastCache : {})), (_a = {}, _a[path] = __assign(__assign(__assign(__assign({}, lastPathPageCache), value), (!isNaN(Number(data.index)) && { index: data.index })), (!isNaN(Number(data.size)) && { size: data.size })), _a)));
    }
    return 1;
};
exports.setPageCache = setPageCache;
function setLanguage(language) {
    (0, local_storage_1.setAsString)(constants_1.LANGUAGE, language);
    return 1;
}
exports.setLanguage = setLanguage;
function getLanguage() {
    return (0, local_storage_1.getAsString)(constants_1.LANGUAGE);
}
exports.getLanguage = getLanguage;
// Note: init graph, get data list and set to graph detail
function getGraphPosition(path) {
    return path === constants_1.DASHBOARD_SEARCH_PATHNAME ? 'dashboard' : 'product_management';
}
exports.getGraphPosition = getGraphPosition;
function getGraphDataList(path) {
    var _a;
    return (_a = (0, exports.getPageCache)(path)) === null || _a === void 0 ? void 0 : _a.graphs;
}
exports.getGraphDataList = getGraphDataList;
function updateGraphDataList(path, graphList) {
    var savePath = path !== null && path !== void 0 ? path : window.location.pathname;
    return (0, exports.setPageCache)({ path: savePath }, { graphs: graphList });
}
exports.updateGraphDataList = updateGraphDataList;
function onUpdateSyncState(id, state, path) {
    var graphList = getGraphDataList(path);
    updateGraphDataList(path, graphList);
    return { code: 1, msg: 'Success' };
}
exports.onUpdateSyncState = onUpdateSyncState;
function onDisableGraphState(id, path) {
    try {
        return onUpdateSyncState(id, false, path);
    }
    catch (error) {
        return { error: error, code: -1 };
    }
}
exports.onDisableGraphState = onDisableGraphState;
function onEnableGraphState(id, path) {
    try {
        return onUpdateSyncState(id, true, path);
    }
    catch (error) {
        return { error: error, code: -1 };
    }
}
exports.onEnableGraphState = onEnableGraphState;
exports.Filterer = {
    getSearchParams: function () {
        var search = window.location.search;
        var params = {};
        // Remove the leading '?' character if it exists
        var searchParams = search.substring(1).split('&');
        for (var _i = 0, searchParams_1 = searchParams; _i < searchParams_1.length; _i++) {
            var param = searchParams_1[_i];
            var _a = param.split('='), key = _a[0], value = _a[1];
            params[key] = decodeURIComponent(value);
        }
        return params;
    },
    filter: function (data, filters) {
        var params = this.getSearchParams();
        // Apply the filters
        var filteredData = data.filter(function (item) {
            for (var key in filters) {
                if (item[key] !== params[key]) {
                    return false;
                }
            }
            return true;
        });
        return filteredData;
    },
    isFilterWithoutPageAndPerPage: function () {
        var _a, _b;
        var values = (_b = Object.entries((_a = this.getSearchParams()) !== null && _a !== void 0 ? _a : {})) === null || _b === void 0 ? void 0 : _b.filter(function (item) {
            return item && item[0] && !['page', 'perPage'].includes(String(item[0]));
        });
        return (values === null || values === void 0 ? void 0 : values.length) > 0;
    },
    isFilterWithoutPageAndPerPageInoperation: function () {
        var _a, _b;
        var values = (_b = Object.entries((_a = this.getSearchParams()) !== null && _a !== void 0 ? _a : {})) === null || _b === void 0 ? void 0 : _b.filter(function (item) {
            return item && item[0] && !['page', 'perPage', 'inOperation'].includes(String(item[0]));
        });
        return (values === null || values === void 0 ? void 0 : values.length) > 0;
    },
};
