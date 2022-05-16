"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
exports.DependencyParser = void 0;
var path = __importStar(require("path"));
var processImportPath = function (importPath) {
    return {
        isRelative: importPath.startsWith('.') || importPath.endsWith('.d.ts'),
        isScoped: importPath.startsWith('@'),
        value: importPath
    };
};
var DependencyParser = (function () {
    function DependencyParser() {
        this.REGEX_CLEAN = /[\n|\r]/g;
        this.REGEX_DETECT_IMPORT = /(?:(?:import|export)(?:.)*?from\s+["']([^"']+)["'])|(?:\/+\s+<reference\s+(?:path|types)=["']([^"']+)["']\s+\/>)/g;
    }
    DependencyParser.prototype.parseDependencies = function (source, parent) {
        var _this = this;
        var cleaned = source;
        var result = __spreadArray([], __read(cleaned.matchAll(this.REGEX_DETECT_IMPORT)), false);
        return result
            .map(function (x) { var _a; return ({ path: (_a = x[1]) !== null && _a !== void 0 ? _a : x[2], isTypeOnly: x[1] === undefined }); })
            .filter(function (x) { return !!x.path; })
            .map(function (x) { return _this.resolvePath({ path: processImportPath(x.path), isTypeOnly: x.isTypeOnly }, parent); });
    };
    DependencyParser.prototype.resolvePath = function (importInfo, parent) {
        var _a = importInfo.path, isRelative = _a.isRelative, isScoped = _a.isScoped, pathToResolve = _a.value, isTypeOnly = importInfo.isTypeOnly;
        if (typeof parent === 'string') {
            if (isRelative) {
                return {
                    kind: 'relative',
                    importPath: pathToResolve,
                    sourcePath: parent,
                };
            }
            else if (isScoped) {
                var segments = pathToResolve.split('/');
                return {
                    kind: 'package',
                    packageName: "".concat(segments[0], "/").concat(segments[1]),
                    importPath: segments.slice(2).join('/'),
                    isTypeOnly: isTypeOnly
                };
            }
            else {
                var segments = pathToResolve.split('/');
                return {
                    kind: 'package',
                    packageName: segments[0],
                    importPath: segments.slice(1).join('/'),
                    isTypeOnly: isTypeOnly
                };
            }
        }
        else {
            switch (parent.kind) {
                case 'package':
                    throw Error('TODO?');
                case 'relative':
                    throw Error('TODO2?');
                case 'relative-in-package':
                    if (isRelative) {
                        return {
                            kind: 'relative-in-package',
                            packageName: parent.packageName,
                            sourcePath: path.join(parent.sourcePath, parent.importPath),
                            importPath: pathToResolve,
                            isTypeOnly: isTypeOnly
                        };
                    }
                    else if (isScoped) {
                        var segments = pathToResolve.split('/');
                        return {
                            kind: 'package',
                            packageName: "".concat(segments[0], "/").concat(segments[1]),
                            importPath: segments.slice(2).join('/'),
                            isTypeOnly: isTypeOnly
                        };
                    }
                    else {
                        var segments = pathToResolve.split('/');
                        return {
                            kind: 'package',
                            packageName: segments[0],
                            importPath: segments.slice(1).join('/'),
                            isTypeOnly: isTypeOnly
                        };
                    }
            }
        }
    };
    return DependencyParser;
}());
exports.DependencyParser = DependencyParser;
