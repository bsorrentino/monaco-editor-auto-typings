import { ImportResourcePath } from './ImportResourcePath';
export declare class DependencyParser {
    private REGEX_CLEAN;
    private REGEX_DETECT_IMPORT;
    parseDependencies(source: string, parent: ImportResourcePath | string): ImportResourcePath[];
    /**
     * [resolvePath description]
     *
     * @param   {string}              importPath  [importPath description]
     * @param   {boolean}             isTypeOnly  [isTypeOnly description]
     * @param   {ImportResourcePath}  parent      [parent description]
     *
     * @return  {ImportResourcePath}              [return description]
     */
    private resolvePath;
}
