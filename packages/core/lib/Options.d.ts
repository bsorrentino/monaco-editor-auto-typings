import { SourceCache } from './SourceCache';
import { SourceResolver } from './SourceResolver';
import { ProgressUpdate } from './ProgressUpdate';
import type * as monaco from 'monaco-editor';
export interface Options {
    shareCache: boolean;
    onlySpecifiedPackages: boolean;
    preloadPackages: boolean;
    dontAdaptEditorOptions: boolean;
    dontRefreshModelValueAfterResolvement: boolean;
    versions?: {
        [packageName: string]: string;
    };
    onUpdateVersions?: (versions: {
        [packageName: string]: string;
    }) => void;
    sourceCache: SourceCache;
    sourceResolver: SourceResolver;
    fileRootPath: string;
    debounceDuration: number;
    packageRecursionDepth: number;
    fileRecursionDepth: number;
    onUpdate?: (update: ProgressUpdate, textual: string) => void;
    onError?: (error: string) => void;
    monaco: typeof monaco;
}
