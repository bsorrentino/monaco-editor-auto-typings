import { ImportResourcePath } from './ImportResourcePath';
import * as path from 'path';

// const _LOG = console.log

type ImportPathInfo = {
  isRelative:boolean
  isScoped:boolean
  value:string
}

type ImportInfo = {
  path: ImportPathInfo
  isTypeOnly: boolean
}

/**
 * [parseImportPath description]
 *
 * @param   {string}                 importPath  [importPath description]
 *
 * @return  {ImportPathInfo}              [return description]
 */
const processImportPath = ( importPath: string ): ImportPathInfo => {
  
  // let val = importPath
  // let ver:string|undefined = undefined
  // const regexp = /@((?:\d+\.)(?:\d+\.)?(\d+\.)?(\d+)?)$/g
  // const versionMatch = regexp.exec(importPath)

  // if( versionMatch!==null ) {
  //   ver = versionMatch[1]
  //   val = importPath.replace(regexp, '')
  // }

  return {
    isRelative: importPath.startsWith('.') || importPath.endsWith('.d.ts'),
    isScoped: importPath.startsWith('@'),
    value: importPath
  }
}

export class DependencyParser {
  private REGEX_CLEAN = /[\n|\r]/g;
  private REGEX_DETECT_IMPORT = /(?:(?:import|export)(?:.)*?from\s+["']([^"']+)["'])|(?:\/+\s+<reference\s+(?:path|types)=["']([^"']+)["']\s+\/>)/g;

  
  /**
   * [parseDependencies description]
   *
   * @param   {string}                source  [source description]
   * @param   {ImportResourcePath[]}  parent  [parent description]
   *
   * @return  {ImportResourcePath[]}          [return description]
   */
  public parseDependencies(source: string, parent: ImportResourcePath | string): ImportResourcePath[] {
    const cleaned = source; // source.replace(this.REGEX_CLEAN, '');

    const result = [ ...cleaned.matchAll(this.REGEX_DETECT_IMPORT) ]
    // console.log( 'REGEX_DETECT_IMPORT', result)
    
    return result
      .map( x => ({ path: x[1] ?? x[2], isTypeOnly: x[1]===undefined }) )
      .filter( x => !!x.path )
      .map( x => this.resolvePath( { path: processImportPath(x.path), isTypeOnly: x.isTypeOnly }, parent) )
  }

  /**
   * [resolvePath description]
   *
   * @param   {ImportInfo}          importInfo  [importInfo description]
   * @param   {ImportResourcePath}  parent      [parent description]
   *
   * @return  {ImportResourcePath}              [return description]
   */
  private resolvePath( importInfo: ImportInfo, parent: ImportResourcePath | string): ImportResourcePath {

    const { path: {isRelative, isScoped, value: pathToResolve }, isTypeOnly } = importInfo

    if (typeof parent === 'string') {
      if ( isRelative ) {
        return {
          kind: 'relative',
          importPath: pathToResolve,
          sourcePath: parent,
        };
      } else if ( isScoped ) {
        const segments = pathToResolve.split('/');
        return {
          kind: 'package',
          packageName: `${segments[0]}/${segments[1]}`,
          importPath: segments.slice( 2 ).join('/'),
          isTypeOnly: isTypeOnly
        };
      } else {
        const segments = pathToResolve.split('/');
        return {
          kind: 'package',
          packageName: segments[0],
          importPath: segments.slice(1).join('/'),
          isTypeOnly: isTypeOnly
        };
      }
    } else {
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
          } else if (isScoped) {
            const segments = pathToResolve.split('/');
            return {
              kind: 'package',
              packageName: `${segments[0]}/${segments[1]}`,
              importPath: segments.slice(2).join('/'),
              isTypeOnly: isTypeOnly
            };
          } else {
            const segments = pathToResolve.split('/');
            return {
              kind: 'package',
              packageName: segments[0],
              importPath: segments.slice(1).join('/'),
              isTypeOnly: isTypeOnly
            };
          }
      }
    }
  }
}
