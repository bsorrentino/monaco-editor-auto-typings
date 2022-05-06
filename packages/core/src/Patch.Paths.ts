

export const pathEndsWithSourceExt = (thePath: string) => 
    thePath.match( /(.js|.mjs)$/ig )!==null

export const pathReplaceSourceExt = ( thePath: string, replace = '' ) => 
    thePath.replace( /(.js|.mjs)$/ig, replace )

export const pathAppendOrReplaceSourceExt = ( thePath: string, append = '' ) => 
    pathReplaceSourceExt(thePath).concat(append)

export const pathContainsSourceExt = (thePath: string) => 
    thePath.match( /((?:.js|.mjs).*)/ig )!==null

export const pathReplaceAnySourceExt = ( thePath: string, replace = '' ) => 
    thePath.replace( /((?:.js|.mjs).*)/ig, replace  )
  