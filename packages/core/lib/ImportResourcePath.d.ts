export interface ImportResourcePathPackage {
    kind: 'package';
    packageName: string;
    importPath?: string;
    isTypeOnly: boolean;
}
export interface ImportResourcePathRelative {
    kind: 'relative';
    importPath: string;
    sourcePath: string;
}
export interface ImportResourcePathRelativeInPackage {
    kind: 'relative-in-package';
    packageName: string;
    importPath: string;
    sourcePath: string;
    isTypeOnly: boolean;
}
export declare type ImportResourcePath = ImportResourcePathPackage | ImportResourcePathRelative | ImportResourcePathRelativeInPackage;
export declare const importResourcePathToString: (p: ImportResourcePath) => string;
