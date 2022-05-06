"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathReplaceAnySourceExt = exports.pathContainsSourceExt = exports.pathAppendOrReplaceSourceExt = exports.pathReplaceSourceExt = exports.pathEndsWithSourceExt = void 0;
var pathEndsWithSourceExt = function (thePath) {
    return thePath.match(/(.js|.mjs)$/ig) !== null;
};
exports.pathEndsWithSourceExt = pathEndsWithSourceExt;
var pathReplaceSourceExt = function (thePath, replace) {
    if (replace === void 0) { replace = ''; }
    return thePath.replace(/(.js|.mjs)$/ig, replace);
};
exports.pathReplaceSourceExt = pathReplaceSourceExt;
var pathAppendOrReplaceSourceExt = function (thePath, append) {
    if (append === void 0) { append = ''; }
    return (0, exports.pathReplaceSourceExt)(thePath).concat(append);
};
exports.pathAppendOrReplaceSourceExt = pathAppendOrReplaceSourceExt;
var pathContainsSourceExt = function (thePath) {
    return thePath.match(/((?:.js|.mjs).*)/ig) !== null;
};
exports.pathContainsSourceExt = pathContainsSourceExt;
var pathReplaceAnySourceExt = function (thePath, replace) {
    if (replace === void 0) { replace = ''; }
    return thePath.replace(/((?:.js|.mjs).*)/ig, replace);
};
exports.pathReplaceAnySourceExt = pathReplaceAnySourceExt;
