

export const pathEndsWithSourceExt = (thePath: string) => {
    console.group(`pathEndsWithSourceExt: ${thePath}`)

    const result =  thePath.match( /(.js|.mjs)$/ig )!==null

    console.log( 'result', result )
    console.groupEnd()

    return result

}

export const pathReplaceSourceExtAtEnd = ( thePath: string, replace = '' ) => {
    console.group(`pathReplaceSourceExtAtEnd: ${thePath}`)

    const result = thePath.replace( /(.js|.mjs)$/ig, replace )
    
    console.log( 'result', result )

    console.groupEnd()

    return result

}


export const pathContainsSourceExt = (thePath: string) => {
    console.group(`pathContainsSourceExt: ${thePath}`)

    const result =  thePath.match( /((?:.js|.mjs).*)/ig )!==null

    console.log( 'result', result )
    console.groupEnd()

    return result

}

export const pathReplaceSourceExt = ( thePath: string, replace = '' ) => {
    console.group(`pathReplaceSourceExt: ${thePath}`)

    const result = thePath.replace( /((?:.js|.mjs).*)/ig, replace  )
    //const result = thePath.replace( /(.js|.mjs)/ig, '' )

    console.log( 'result', result )
    console.groupEnd()

    return result

}
  
  