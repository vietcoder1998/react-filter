"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = exports.formatNumber = exports.backToPreviousScreen = exports.convertToISO8601 = exports.convertNullAndUndefinedTextToDash = exports.wordToCamelStyle = exports.formatMomentDate = exports.formatStringDate = exports.formatNumberDate = exports.formatDate = exports.DEFAULT_FORMAT_DATE_TIME = exports.DEFAULT_FORMAT_DATE = exports.dashedToLowerCased = exports.dashedToCamel = exports.camelCaseToDashed = exports.upperCaseToLowerCase = void 0;
var moment_1 = require("moment");
function upperCaseToLowerCase(word) {
    if (!word) {
        return '';
    }
    var len = word.length;
    var newWord = word;
    var i = 0;
    while (i < len) {
        if (containsUppercase(word.charAt(i))) {
            newWord =
                word.substring(0, i) + '_' + word.charAt(i).toLowerCase() + word.substring(i + 1, len);
        }
        i++;
    }
    return newWord;
}
exports.upperCaseToLowerCase = upperCaseToLowerCase;
function camelCaseToDashed(word) {
    if (!word || word === '') {
        return '';
    }
    var nWord = word.replace(/[A-Z]/g, function (m) { return '_' + m.toLowerCase(); });
    return [nWord.slice(0, 2).replace('_', ''), nWord.slice(2)].join('');
}
exports.camelCaseToDashed = camelCaseToDashed;
function dashedToCamel(word) {
    if (!word) {
        return '';
    }
    var len = word.length;
    var newWord = word;
    var i = 0;
    while (i < len) {
        var characterNextFromWord = word.charAt(i - 1);
        if (characterNextFromWord === '_' || characterNextFromWord === '-') {
            newWord = word.substring(0, i - 1) + word.charAt(i).toUpperCase() + word.substring(i + 1, len);
        }
        i++;
    }
    return newWord;
}
exports.dashedToCamel = dashedToCamel;
function dashedToLowerCased(word) {
    if (!word) {
        return '';
    }
    var len = word.length;
    var newWord = word;
    var i = 0;
    while (i < len) {
        var characterNextFromWord = word.charAt(i - 1);
        if (characterNextFromWord === '_' || characterNextFromWord === '-') {
            newWord =
                word.substring(0, i - 1) + ' ' + word.charAt(i).toLowerCase() + word.substring(i + 1, len);
        }
        i++;
    }
    return newWord;
}
exports.dashedToLowerCased = dashedToLowerCased;
function containsUppercase(str) {
    return /[A-Z]/.test(str);
}
exports.DEFAULT_FORMAT_DATE = 'DD-MM-YYYY';
exports.DEFAULT_FORMAT_DATE_TIME = 'DD-MM-YYYY HH:mm';
var formatDate = function (input, options) {
    if (!input || input === '') {
        return null;
    }
    var format = (options === null || options === void 0 ? void 0 : options.format) || exports.DEFAULT_FORMAT_DATE;
    var returnType = (options === null || options === void 0 ? void 0 : options.returnType) || 'string';
    var strInput = String(input !== null && input !== void 0 ? input : '');
    var momentValue = (0, moment_1.default)(strInput);
    var formatValue = (0, moment_1.default)(strInput).format(format);
    var dateValue = (0, moment_1.default)(strInput).toDate();
    switch (returnType) {
        case 'string':
            return String(formatValue);
        case 'Date':
            return dateValue;
        case 'moment':
            if (!strInput) {
                return null;
            }
            return momentValue;
        case 'utc':
            return momentValue.add('hour', 7);
        default:
            return formatValue;
    }
};
exports.formatDate = formatDate;
function formatNumberDate(input, format) {
    if (!input) {
        return 0;
    }
    return Number((0, exports.formatDate)(input, { format: format, returnType: 'number' }));
}
exports.formatNumberDate = formatNumberDate;
function formatStringDate(input, format) {
    if (!input) {
        return '';
    }
    return String((0, exports.formatDate)(input, { format: format, returnType: 'string' }));
}
exports.formatStringDate = formatStringDate;
function formatMomentDate(input, format) {
    var value = (0, exports.formatDate)(input, { format: format, returnType: 'moment' });
    if (!input) {
        return null;
    }
    return value;
}
exports.formatMomentDate = formatMomentDate;
function wordToCamelStyle(word) {
    if (!word) {
        return '';
    }
    var breakWords = word.split(' ');
    if (breakWords && breakWords.length > 0) {
        return breakWords.reduce(function (str, word, index) { return str + (index ? dashedToCamel(word) : word.toLocaleLowerCase()); }, '');
    }
    return '';
}
exports.wordToCamelStyle = wordToCamelStyle;
function convertNullAndUndefinedTextToDash(text) {
    if ((typeof text === 'string' && ['null', 'undefined'].includes(text)) || !text) {
        return '-';
    }
    return text;
}
exports.convertNullAndUndefinedTextToDash = convertNullAndUndefinedTextToDash;
function convertToISO8601(text) {
    if (!text) {
        return '';
    }
    if (typeof text === 'string') {
        var newDate = new Date(text);
        return newDate.toISOString();
    }
    return text.toISOString();
}
exports.convertToISO8601 = convertToISO8601;
var backToPreviousScreen = function () { return history.back(); };
exports.backToPreviousScreen = backToPreviousScreen;
var formatNumber = function (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
exports.formatNumber = formatNumber;
var formatCurrency = function (value, currency) {
    if (isNaN(value))
        return '-';
    return currency.toUpperCase() + ' ' + (0, exports.formatNumber)(value);
};
exports.formatCurrency = formatCurrency;
