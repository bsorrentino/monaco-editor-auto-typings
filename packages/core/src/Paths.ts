

export const pathEndsWithSourceExt = (thePath: string) => 
    thePath.match( /(.js|.mjs)$/ig )!==null

export const pathReplaceSourceExtAtEnd = ( thePath: string, replace = '' ) => 
    thePath.replace( /(.js|.mjs)$/ig, replace )

export const pathContainsSourceExt = (thePath: string) => 
    thePath.match( /((?:.js|.mjs).*)/ig )!==null

export const pathReplaceSourceExt = ( thePath: string, replace = '' ) => 
    thePath.replace( /((?:.js|.mjs).*)/ig, replace  )
  