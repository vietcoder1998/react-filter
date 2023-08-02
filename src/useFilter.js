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
var constants_1 = require("./config/constants");
var generator_1 = require("./helpers/generator");
var local_storage_handler_1 = require("./helpers/local-storage-handler");
var validate_1 = require("./helpers/validate");
var react_1 = require("react");
var timePicker = null;
var convertToStringValueToValidValue = function (key, value, isArray) {
    var _a;
    try {
        if (key) {
            var lowerKeyCase = key.toLowerCase();
            if (isArray) {
                if (typeof value === 'string') {
                    if (value.includes(',')) {
                        return value.split(',');
                    }
                    return [value];
                }
                return __spreadArray([], value, true);
            }
            // if key include date, replace with timestamp
            var isDateValue = lowerKeyCase.includes('date') || lowerKeyCase.includes('period');
            if (isDateValue) {
                var dateConvert = value.split('-').reverse().join('-');
                var dateValue = (_a = (0, validate_1.formatMomentDate)(dateConvert)) === null || _a === void 0 ? void 0 : _a.toDate();
                return dateValue;
            }
            return value;
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
var convertStringValueToWithKey = function (key, value) {
    if (!key || !value) {
        return null;
    }
    if ((key === null || key === void 0 ? void 0 : key.includes('period')) || (key === null || key === void 0 ? void 0 : key.includes('date')) || (key === null || key === void 0 ? void 0 : key.includes('operate'))) {
        return (0, validate_1.formatStringDate)(value);
    }
    return value;
};
function useFilter(props) {
    var _a = react_1.default.useState(__assign({}, props === null || props === void 0 ? void 0 : props.defaultFilter)), filter = _a[0], setFilter = _a[1];
    var _b = react_1.default.useState(__assign({}, props === null || props === void 0 ? void 0 : props.defaultFilter)), lastFilter = _b[0], setLastFilter = _b[1];
    /**
     * default filter from window.path.name
     * date: new Date()
     * ~otherwise: key: string | string[] | number | number[]
     */
    var getFilter = react_1.default.useCallback(function () {
        var pathFilter = Object.fromEntries(window.location.search
            .split('?')
            .join('')
            .split('&')
            .map(function (searchItem) {
            var _a = searchItem.split('='), key = _a[0], defaultValue = _a[1];
            var value = defaultValue && defaultValue.includes(',') ? defaultValue.split(',') : defaultValue;
            return [key, value];
        })
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            return key && value;
        }));
        var keys = Object.keys(pathFilter !== null && pathFilter !== void 0 ? pathFilter : {}).filter(function (key) { return key; });
        var querySearch = new URLSearchParams(window.location.search);
        var rootFilter = pathFilter;
        var defaultPropsValue = props === null || props === void 0 ? void 0 : props.defaultFilter;
        if (keys === null || keys === void 0 ? void 0 : keys.length) {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var queryValue = querySearch.get(key);
                var returnValue = convertToStringValueToValidValue(key, queryValue, defaultPropsValue && Array.isArray(defaultPropsValue[key]));
                if (returnValue) {
                    rootFilter[key] = returnValue;
                }
                else {
                    delete rootFilter[key];
                }
            }
        }
        return {
            defaultFilter: rootFilter,
        };
    }, [props === null || props === void 0 ? void 0 : props.defaultFilter]);
    // set filter on init
    react_1.default.useEffect(function () {
        var initFilterValue = getFilter().defaultFilter;
        setFilter(initFilterValue);
    }, []);
    var page = react_1.default.useMemo(function () {
        var _a;
        return (_a = (0, local_storage_handler_1.getPagingWithLocation)()) === null || _a === void 0 ? void 0 : _a.page;
    }, [window.location.search]);
    var perPage = react_1.default.useMemo(function () {
        var _a;
        return (_a = (0, local_storage_handler_1.getPagingWithLocation)()) === null || _a === void 0 ? void 0 : _a.perPage;
    }, [window.location.search]);
    // Note: call onchange filter update window.location.search
    var onChangeFilter = react_1.default.useCallback(function (key, value) {
        var _a;
        // cache filter
        var newFilter = __assign(__assign({}, filter), (_a = {}, _a[key] = value, _a));
        setLastFilter(filter);
        setFilter(newFilter);
        resetPaging();
        // filter is object handler
        var filterSearch = Object.fromEntries(Object.entries(newFilter).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [
                key,
                convertStringValueToWithKey(key, value),
            ];
        }));
        var querySearch = (0, generator_1.generateQueryPath)(__assign({}, filterSearch), true, true);
        var pathname = window.location.pathname;
        window.history.replaceState({}, '', pathname + querySearch);
    }, [filter, window.location.pathname, page, perPage]);
    var onChangeMultiFilter = react_1.default.useCallback(function (names, values) {
        var _a;
        var editFilter = {};
        for (var index in names) {
            editFilter = __assign(__assign({}, editFilter), (_a = {}, _a[names[index]] = values[index], _a));
        }
        var newFilter = __assign(__assign({}, filter), editFilter);
        // cache filter
        setLastFilter(filter);
        setFilter(newFilter);
        resetPaging();
        // filter is object handler
        var filterSearch = Object.fromEntries(Object.entries(newFilter).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [
                key,
                convertStringValueToWithKey(key, value),
            ];
        }));
        var querySearch = (0, generator_1.generateQueryPath)(__assign({}, filterSearch), false, true);
        var pathname = window.location.pathname;
        var newPath = pathname + querySearch;
        window.history.replaceState({}, window.location.href, newPath);
    }, [filter, window.location.pathname, page, perPage]);
    var _c = react_1.default.useState({
        totalItem: constants_1.DefaultPageState.index,
        totalPage: constants_1.DefaultPageState.size,
        currentPage: 0,
    }), paging = _c[0], setPaging = _c[1];
    var getPageFilter = react_1.default.useCallback(function () {
        return (0, local_storage_handler_1.getPagingWithLocation)();
    }, [window.location.pathname]);
    var setPageFilter = react_1.default.useCallback(function (index, size) {
        return (0, local_storage_handler_1.setPagingWithLocation)(index, size);
    }, [window.location.pathname]);
    var pageCache = react_1.default.useMemo(function () {
        var data = getPageFilter();
        return data;
    }, [getPageFilter]);
    var resetPaging = react_1.default.useCallback(function () {
        (0, local_storage_handler_1.setPagingWithLocation)(constants_1.DefaultPageState.index, constants_1.DefaultPageState.size);
    }, [window.location.pathname]);
    var onRecallFilter = react_1.default.useCallback(function (e, vl) {
        (0, local_storage_handler_1.setPagingWithLocation)(constants_1.DefaultPageState.index, constants_1.DefaultPageState.size);
        onChangeFilter(e, vl);
    }, [window.location.pathname, window.localStorage[constants_1.PAGE_CACHE]]);
    // remove time picker
    react_1.default.useEffect(function () {
        return function () {
            clearTimeout(timePicker);
        };
    }, []);
    return {
        filter: filter,
        setFilter: setFilter,
        timePicker: timePicker,
        lastFilter: lastFilter,
        paging: paging,
        pageCache: pageCache,
        getFilter: getFilter,
        onChangeFilter: onChangeFilter,
        resetPaging: resetPaging,
        setPaging: setPaging,
        onRecallFilter: onRecallFilter,
        getPageFilter: getPageFilter,
        setPageFilter: setPageFilter,
        onChangeMultiFilter: onChangeMultiFilter,
        page: page,
        perPage: perPage,
    };
}
exports.default = useFilter;
