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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportResolver = void 0;
var DependencyParser_1 = require("./DependencyParser");
var ImportResourcePath_1 = require("./ImportResourcePath");
var path = __importStar(require("path"));
var invokeUpdate_1 = require("./invokeUpdate");
var RecursionDepth_1 = require("./RecursionDepth");
var PatchPaths = __importStar(require("./Patch.Paths"));
var ImportResolver = (function () {
    function ImportResolver(options) {
        var e_1, _a;
        this.options = options;
        this.loadedFiles = [];
        this.dependencyParser = new DependencyParser_1.DependencyParser();
        this.cache = options.sourceCache;
        this.sourceResolver = options.sourceResolver;
        this.newImportsResolved = false;
        this.monaco = options.monaco;
        if (options.preloadPackages && options.versions) {
            try {
                for (var _b = __values(Object.entries(options.versions)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), packageName = _d[0], version = _d[1];
                    this.resolveImport({
                        kind: 'package',
                        packageName: packageName,
                        importPath: '',
                        isTypeOnly: false
                    }, new RecursionDepth_1.RecursionDepth(this.options)).catch(function (e) {
                        console.error(e);
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    ImportResolver.prototype.wereNewImportsResolved = function () {
        return this.newImportsResolved;
    };
    ImportResolver.prototype.resetNewImportsResolved = function () {
        this.newImportsResolved = false;
    };
    ImportResolver.prototype.resolveImportsInFile = function (source, parent, depth) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var imports, imports_1, imports_1_1, importCall, e_2, e_3_1;
            var e_3, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (depth.shouldStop()) {
                            return [2];
                        }
                        imports = this.dependencyParser.parseDependencies(source, parent);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, 9, 10]);
                        imports_1 = __values(imports), imports_1_1 = imports_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!imports_1_1.done) return [3, 7];
                        importCall = imports_1_1.value;
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 5, , 6]);
                        return [4, this.resolveImport(importCall, depth)];
                    case 4:
                        _e.sent();
                        return [3, 6];
                    case 5:
                        e_2 = _e.sent();
                        if (this.options.onError) {
                            (_b = (_a = this.options).onError) === null || _b === void 0 ? void 0 : _b.call(_a, (_c = e_2.message) !== null && _c !== void 0 ? _c : e_2);
                        }
                        else {
                            console.error(e_2);
                        }
                        return [3, 6];
                    case 6:
                        imports_1_1 = imports_1.next();
                        return [3, 2];
                    case 7: return [3, 10];
                    case 8:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3, 10];
                    case 9:
                        try {
                            if (imports_1_1 && !imports_1_1.done && (_d = imports_1.return)) _d.call(imports_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7];
                    case 10: return [2];
                }
            });
        });
    };
    ImportResolver.prototype.resolveImport = function (importResource, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, _a, packageRelativeImport;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        hash = this.hashImportResourcePath(importResource);
                        if (this.loadedFiles.includes(hash)) {
                            return [2];
                        }
                        this.loadedFiles.push(hash);
                        _a = importResource.kind;
                        switch (_a) {
                            case 'package': return [3, 1];
                            case 'relative': return [3, 5];
                            case 'relative-in-package': return [3, 6];
                        }
                        return [3, 8];
                    case 1: return [4, this.resolveImportFromPackageRoot(importResource)];
                    case 2:
                        packageRelativeImport = _b.sent();
                        if (!packageRelativeImport) return [3, 4];
                        return [4, this.resolveImportInPackage(packageRelativeImport, depth.nextPackage().nextFile())];
                    case 3: return [2, _b.sent()];
                    case 4: return [3, 8];
                    case 5: throw Error('Not implemented yet');
                    case 6: return [4, this.resolveImportInPackage(importResource, depth.nextFile())];
                    case 7: return [2, _b.sent()];
                    case 8: return [2];
                }
            });
        });
    };
    ImportResolver.prototype.resolveImportInPackage = function (importResource, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var contents, source, at;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadSourceFileContents(importResource)];
                    case 1:
                        contents = _a.sent();
                        if (!contents) return [3, 3];
                        source = contents.source, at = contents.at;
                        this.createModel(source, this.monaco.Uri.parse(this.options.fileRootPath + path.join("node_modules/".concat(importResource.packageName), at)), importResource.isTypeOnly);
                        return [4, this.resolveImportsInFile(source, {
                                kind: 'relative-in-package',
                                packageName: importResource.packageName,
                                sourcePath: path.dirname(at),
                                importPath: '',
                                isTypeOnly: importResource.isTypeOnly
                            }, depth)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    ImportResolver.prototype.resolveImportFromPackageRoot = function (importResource) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var failedProgressUpdate, doesPkgJsonHasSubpath, pkgJsonSubpath, pkgJson, pkg, typings, typingPackageName, pkgJsonTypings, pkg_1, typings;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        failedProgressUpdate = {
                            type: 'LookedUpPackage',
                            package: importResource.packageName,
                            definitelyTyped: false,
                            success: false,
                        };
                        if (this.options.onlySpecifiedPackages) {
                            if (!this.getVersion(importResource.packageName) && !this.getVersion("@types/".concat(importResource.packageName))) {
                                (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                                return [2];
                            }
                        }
                        doesPkgJsonHasSubpath = (_b = (_a = importResource.importPath) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0 > 0;
                        pkgJsonSubpath = doesPkgJsonHasSubpath ? "/".concat(importResource.importPath) : '';
                        return [4, this.resolvePackageJson(importResource.packageName, this.getVersion(importResource.packageName), doesPkgJsonHasSubpath ? importResource.importPath : undefined)];
                    case 1:
                        pkgJson = _f.sent();
                        if (!(!pkgJson && doesPkgJsonHasSubpath)) return [3, 3];
                        return [4, this.resolvePackageJson(importResource.packageName, this.getVersion(importResource.packageName))];
                    case 2:
                        pkgJson = _f.sent();
                        pkgJsonSubpath = '';
                        _f.label = 3;
                    case 3:
                        if (!pkgJson) return [3, 7];
                        pkg = JSON.parse(pkgJson);
                        if (!(pkg.typings || pkg.types)) return [3, 4];
                        typings = pkg.typings || pkg.types;
                        this.createModel(pkgJson, this.monaco.Uri.parse("".concat(this.options.fileRootPath, "node_modules/").concat(importResource.packageName).concat(pkgJsonSubpath, "/package.json")), importResource.isTypeOnly);
                        (0, invokeUpdate_1.invokeUpdate)({
                            type: 'LookedUpPackage',
                            package: importResource.packageName,
                            definitelyTyped: false,
                            success: true,
                        }, this.options);
                        this.setVersion(importResource.packageName, pkg.version);
                        return [2, {
                                kind: 'relative-in-package',
                                packageName: importResource.packageName,
                                sourcePath: '',
                                importPath: path.join((_c = importResource.importPath) !== null && _c !== void 0 ? _c : '', typings.startsWith('./') ? typings.slice(2) : typings),
                                isTypeOnly: importResource.isTypeOnly
                            }];
                    case 4:
                        typingPackageName = "@types/".concat(importResource.packageName.startsWith('@')
                            ? importResource.packageName.slice(1).replace(/\//, '__')
                            : importResource.packageName);
                        return [4, this.resolvePackageJson(typingPackageName, (_d = this.versions) === null || _d === void 0 ? void 0 : _d[typingPackageName])];
                    case 5:
                        pkgJsonTypings = _f.sent();
                        if (pkgJsonTypings) {
                            pkg_1 = JSON.parse(pkgJsonTypings);
                            if (pkg_1.typings || pkg_1.types) {
                                typings = pkg_1.typings || pkg_1.types;
                                this.createModel(pkgJsonTypings, this.monaco.Uri.parse("".concat(this.options.fileRootPath, "node_modules/").concat(typingPackageName, "/package.json")), importResource.isTypeOnly);
                                (0, invokeUpdate_1.invokeUpdate)({
                                    type: 'LookedUpPackage',
                                    package: typingPackageName,
                                    definitelyTyped: true,
                                    success: true,
                                }, this.options);
                                this.setVersion(typingPackageName, pkg_1.version);
                                return [2, {
                                        kind: 'relative-in-package',
                                        packageName: typingPackageName,
                                        sourcePath: '',
                                        importPath: path.join((_e = importResource.importPath) !== null && _e !== void 0 ? _e : '', typings.startsWith('./') ? typings.slice(2) : typings),
                                        isTypeOnly: importResource.isTypeOnly
                                    }];
                            }
                            else {
                                (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                            }
                        }
                        else {
                            (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                        }
                        _f.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                        _f.label = 8;
                    case 8: return [2];
                }
            });
        });
    };
    ImportResolver.prototype.loadSourceFileContents = function (importResource) {
        return __awaiter(this, void 0, void 0, function () {
            var progressUpdatePath, failedProgressUpdate, pkgName, version, fullPath, source, appends, source, appends_1, appends_1_1, append, fullPath, source, e_4_1, pkgJson, types, fullPath, source;
            var e_4, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        progressUpdatePath = path.join(importResource.packageName, importResource.sourcePath, importResource.importPath);
                        failedProgressUpdate = {
                            type: 'LookedUpTypeFile',
                            path: progressUpdatePath,
                            definitelyTyped: false,
                            success: false,
                        };
                        pkgName = importResource.packageName;
                        version = this.getVersion(importResource.packageName);
                        if (!PatchPaths.pathContainsSourceExt(importResource.importPath)) return [3, 2];
                        fullPath = path.join(importResource.sourcePath, PatchPaths.pathReplaceAnySourceExt(importResource.importPath, '.d.ts'));
                        return [4, this.resolveSourceFile(pkgName, version, fullPath)];
                    case 1:
                        source = _b.sent();
                        if (source) {
                            (0, invokeUpdate_1.invokeUpdate)({
                                type: 'LookedUpTypeFile',
                                path: path.join(pkgName, fullPath),
                                success: true,
                            }, this.options);
                            return [2, { source: source, at: fullPath }];
                        }
                        return [3, 11];
                    case 2:
                        appends = ['.d.ts', '/index.d.ts', '.ts', '.tsx', '/index.ts', '/index.tsx'];
                        if (!appends.map(function (append) { return importResource.importPath.endsWith(append); }).reduce(function (a, b) { return a || b; }, false)) return [3, 4];
                        return [4, this.resolveSourceFile(pkgName, version, path.join(importResource.sourcePath, importResource.importPath))];
                    case 3:
                        source = _b.sent();
                        if (source) {
                            return [2, { source: source, at: path.join(importResource.sourcePath, importResource.importPath) }];
                        }
                        return [3, 11];
                    case 4:
                        _b.trys.push([4, 9, 10, 11]);
                        appends_1 = __values(appends), appends_1_1 = appends_1.next();
                        _b.label = 5;
                    case 5:
                        if (!!appends_1_1.done) return [3, 8];
                        append = appends_1_1.value;
                        fullPath = path.join(importResource.sourcePath, PatchPaths.pathAppendOrReplaceSourceExt(importResource.importPath, append));
                        return [4, this.resolveSourceFile(pkgName, version, fullPath)];
                    case 6:
                        source = _b.sent();
                        (0, invokeUpdate_1.invokeUpdate)({
                            type: 'AttemptedLookUpFile',
                            path: path.join(pkgName, fullPath),
                            success: !!source,
                        }, this.options);
                        if (source) {
                            (0, invokeUpdate_1.invokeUpdate)({
                                type: 'LookedUpTypeFile',
                                path: path.join(pkgName, fullPath),
                                success: true,
                            }, this.options);
                            return [2, { source: source, at: fullPath }];
                        }
                        _b.label = 7;
                    case 7:
                        appends_1_1 = appends_1.next();
                        return [3, 5];
                    case 8: return [3, 11];
                    case 9:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3, 11];
                    case 10:
                        try {
                            if (appends_1_1 && !appends_1_1.done && (_a = appends_1.return)) _a.call(appends_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7];
                    case 11: return [4, this.resolvePackageJson(pkgName, version, path.join(importResource.sourcePath, importResource.importPath))];
                    case 12:
                        pkgJson = _b.sent();
                        if (!pkgJson) return [3, 14];
                        types = JSON.parse(pkgJson).types;
                        if (!types) return [3, 14];
                        fullPath = path.join(importResource.sourcePath, importResource.importPath, types);
                        return [4, this.resolveSourceFile(pkgName, version, fullPath)];
                    case 13:
                        source = _b.sent();
                        if (source) {
                            (0, invokeUpdate_1.invokeUpdate)({
                                type: 'LookedUpTypeFile',
                                path: path.join(pkgName, fullPath),
                                success: true,
                            }, this.options);
                            return [2, { source: source, at: fullPath }];
                        }
                        _b.label = 14;
                    case 14:
                        (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                        return [2, null];
                }
            });
        });
    };
    ImportResolver.prototype.getVersion = function (packageName) {
        var _a;
        return (_a = this.versions) === null || _a === void 0 ? void 0 : _a[packageName];
    };
    ImportResolver.prototype.setVersions = function (versions) {
        var _a, _b;
        this.versions = versions;
        (_b = (_a = this.options).onUpdateVersions) === null || _b === void 0 ? void 0 : _b.call(_a, versions);
    };
    ImportResolver.prototype.setVersion = function (packageName, version) {
        var _a;
        this.setVersions(__assign(__assign({}, this.versions), (_a = {}, _a[packageName] = version, _a)));
    };
    ImportResolver.prototype.createModel = function (source, uri, isTypeOnly) {
        if (!isTypeOnly)
            uri = uri.with({ path: uri.path.replace('@types/', '') });
        if (!this.monaco.editor.getModel(uri)) {
            this.monaco.editor.createModel(source, 'typescript', uri);
            this.newImportsResolved = true;
        }
    };
    ImportResolver.prototype.hashImportResourcePath = function (p) {
        return (0, ImportResourcePath_1.importResourcePathToString)(p);
    };
    ImportResolver.prototype.resolvePackageJson = function (packageName, version, subPath) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, isAvailable, content, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = path.join(packageName + (version ? "@".concat(version) : ''), subPath !== null && subPath !== void 0 ? subPath : '', 'package.json');
                        isAvailable = false;
                        content = undefined;
                        if (!this.cache.isFileAvailable) return [3, 2];
                        return [4, this.cache.isFileAvailable(uri)];
                    case 1:
                        isAvailable = _b.sent();
                        return [3, 4];
                    case 2: return [4, this.cache.getFile(uri)];
                    case 3:
                        content = _b.sent();
                        isAvailable = content !== undefined;
                        _b.label = 4;
                    case 4:
                        if (!isAvailable) return [3, 8];
                        if (!(content !== null && content !== void 0)) return [3, 5];
                        _a = content;
                        return [3, 7];
                    case 5: return [4, this.cache.getFile(uri)];
                    case 6:
                        _a = (_b.sent());
                        _b.label = 7;
                    case 7: return [2, _a];
                    case 8: return [4, this.sourceResolver.resolvePackageJson(packageName, version, subPath)];
                    case 9:
                        content = _b.sent();
                        if (content) {
                            this.cache.storeFile(uri, content);
                        }
                        return [2, content];
                }
            });
        });
    };
    ImportResolver.prototype.resolveSourceFile = function (packageName, version, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, isAvailable, content, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = path.join(packageName + (version ? "@".concat(version) : ''), filePath);
                        isAvailable = false;
                        content = undefined;
                        if (!this.cache.isFileAvailable) return [3, 2];
                        return [4, this.cache.isFileAvailable(uri)];
                    case 1:
                        isAvailable = _b.sent();
                        return [3, 4];
                    case 2: return [4, this.cache.getFile(uri)];
                    case 3:
                        content = _b.sent();
                        isAvailable = content !== undefined;
                        _b.label = 4;
                    case 4:
                        if (!isAvailable) return [3, 8];
                        (0, invokeUpdate_1.invokeUpdate)({
                            type: 'LoadedFromCache',
                            importPath: uri,
                        }, this.options);
                        if (!(content !== null && content !== void 0)) return [3, 5];
                        _a = content;
                        return [3, 7];
                    case 5: return [4, this.cache.getFile(uri)];
                    case 6:
                        _a = (_b.sent());
                        _b.label = 7;
                    case 7: return [2, _a];
                    case 8: return [4, this.sourceResolver.resolveSourceFile(packageName, version, filePath)];
                    case 9:
                        content = _b.sent();
                        if (content) {
                            (0, invokeUpdate_1.invokeUpdate)({
                                type: 'StoredToCache',
                                importPath: uri,
                            }, this.options);
                            this.cache.storeFile(uri, content);
                        }
                        return [2, content];
                }
            });
        });
    };
    return ImportResolver;
}());
exports.ImportResolver = ImportResolver;
