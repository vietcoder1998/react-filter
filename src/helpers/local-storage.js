"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAll = exports.removeAs = exports.getAsJSON = exports.setAsJSON = exports.getAsString = exports.setAsString = void 0;
/**
 * Set an item by (key, value) to local storage
 * @param {string} key
 * @param {string} value
 */
var setAsString = function (key, value) {
    localStorage.setItem(key, value);
};
exports.setAsString = setAsString;
/**
 * Get an item by key from local storage
 * @param {string} key
 * @param {string} defValue Default value
 * @returns string | undefined
 */
var getAsString = function (key, defValue) {
    if (defValue === void 0) { defValue = ''; }
    return localStorage.getItem(key) || defValue;
};
exports.getAsString = getAsString;
/**
 * Set an item by (key, value) in JSON format to local storage
 * @param {string} key
 * @param {*} value
 * @returns
 */
var setAsJSON = function (key, value) {
    var result = false;
    if (value !== undefined) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            result = true;
        }
        catch (err) {
            /* empty */
        }
    }
    return result;
};
exports.setAsJSON = setAsJSON;
/**
 * Get an item by key from local storage and convert it to JSON format
 * @param {string} key
 * @returns JSON | null
 */
var getAsJSON = function (key) {
    var item = localStorage.getItem(key);
    if (item != null) {
        try {
            return JSON.parse(item);
        }
        catch (err) {
            /* empty */
        }
    }
    return null;
};
exports.getAsJSON = getAsJSON;
/**
 * Delete an item by key from local storage
 * @param {string} key
 */
var removeAs = function (key) {
    localStorage.removeItem(key);
};
exports.removeAs = removeAs;
/**
 * Delete all items in local storage
 */
var clearAll = function () {
    localStorage.clear();
};
exports.clearAll = clearAll;
