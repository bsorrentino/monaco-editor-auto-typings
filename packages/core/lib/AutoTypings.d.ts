import { Options } from './Options';
import type * as monaco from 'monaco-editor';
declare type Editor = monaco.editor.ICodeEditor | monaco.editor.IStandaloneCodeEditor;
export declare class AutoTypings implements monaco.IDisposable {
    private editor;
    private options;
    private static sharedCache?;
    private importResolver;
    private debounceTimer?;
    private isResolving?;
    private disposables;
    private constructor();
    static create(editor: Editor, options?: Partial<Options>): Promise<AutoTypings>;
    dispose(): void;
    setVersions(versions: {
        [packageName: string]: string;
    }): void;
    clearCache(): Promise<void>;
    private debouncedResolveContents;
    private resolveContents;
}
export {};
