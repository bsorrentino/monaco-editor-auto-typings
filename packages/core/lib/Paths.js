"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathReplaceSourceExt = exports.pathContainsSourceExt = exports.pathReplaceSourceExtAtEnd = exports.pathEndsWithSourceExt = void 0;
var pathEndsWithSourceExt = function (thePath) {
    return thePath.match(/(.js|.mjs)$/ig) !== null;
};
exports.pathEndsWithSourceExt = pathEndsWithSourceExt;
var pathReplaceSourceExtAtEnd = function (thePath, replace) {
    if (replace === void 0) { replace = ''; }
    return thePath.replace(/(.js|.mjs)$/ig, replace);
};
exports.pathReplaceSourceExtAtEnd = pathReplaceSourceExtAtEnd;
var pathContainsSourceExt = function (thePath) {
    return thePath.match(/((?:.js|.mjs).*)/ig) !== null;
};
exports.pathContainsSourceExt = pathContainsSourceExt;
var pathReplaceSourceExt = function (thePath, replace) {
    if (replace === void 0) { replace = ''; }
    return thePath.replace(/((?:.js|.mjs).*)/ig, replace);
};
exports.pathReplaceSourceExt = pathReplaceSourceExt;
