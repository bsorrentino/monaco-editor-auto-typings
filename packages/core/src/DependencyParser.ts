import { ImportResourcePath } from './ImportResourcePath';
import * as path from 'path';


const importPath_ext_to_remove = ['.js', '.mjs']

const normalizeImportPath = ( importPath: string  ) => {
  const ext = path.extname( importPath )
  // console.log( 'normalizeImportPath', importPath, `[${ext}]` )
  if( ext.length >= 3 ) { 
    for( let i = 0 ; i < importPath_ext_to_remove.length; ++i ) {
      if( ext === importPath_ext_to_remove[i] ) {
        const result = importPath.slice(0, -ext.length )
        // console.log( 'normalizeImportPath result', result )
        return result
      } 
    }
  }
  return importPath
}

export class DependencyParser {
  private REGEX_CLEAN = /[\n|\r]/g;
  private REGEX_DETECT_IMPORT = /(?:(?:import|export)(?:.)*?from\s+["']([^"']+)["'])|(?:\/+\s+<reference\s+(?:path|types)=["']([^"']+)["']\s+\/>)/g;

  public parseDependencies(source: string, parent: ImportResourcePath | string): ImportResourcePath[] {
    const cleaned = source; // source.replace(this.REGEX_CLEAN, '');

    const result = [ ...cleaned.matchAll(this.REGEX_DETECT_IMPORT) ]
    // console.log( 'REGEX_DETECT_IMPORT', result)
    
    return result
      .map(x => ({ path: x[1] ?? x[2], isTypeOnly: x[1]===undefined }) )
      .filter( x => !!x.path )
      .map(x => {
        const result = this.resolvePath(x.path, x.isTypeOnly, parent);
        return result;
      });
  }

  private resolvePath(importPath: string, isTypeOnly:boolean, parent: ImportResourcePath | string): ImportResourcePath {
    if (typeof parent === 'string') {
      if (importPath.startsWith('.')) {
        return {
          kind: 'relative',
          importPath,
          sourcePath: parent,
        };
      } else if (importPath.startsWith('@')) {
        const segments = importPath.split('/');
        return {
          kind: 'package',
          packageName: `${segments[0]}/${segments[1]}`,
          importPath: normalizeImportPath(segments.slice( 2 ).join('/')),
          isTypeOnly: isTypeOnly
        };
      } else {
        const segments = importPath.split('/');
        return {
          kind: 'package',
          packageName: segments[0],
          importPath: normalizeImportPath(segments.slice(1).join('/')),
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
          if (importPath.startsWith('.')) {
            return {
              kind: 'relative-in-package',
              packageName: parent.packageName,
              sourcePath: path.join(parent.sourcePath, parent.importPath),
              importPath: normalizeImportPath(importPath),
              isTypeOnly: isTypeOnly
            };
          } else if (importPath.startsWith('@')) {
            const segments = importPath.split('/');
            return {
              kind: 'package',
              packageName: `${segments[0]}/${segments[1]}`,
              importPath: normalizeImportPath(segments.slice(2).join('/')),
              isTypeOnly: isTypeOnly
            };
          } else {
            const segments = importPath.split('/');
            return {
              kind: 'package',
              packageName: segments[0],
              importPath: normalizeImportPath(segments.slice(1).join('/')),
              isTypeOnly: isTypeOnly
            };
          }
      }
    }
  }
}
