// export const editorContents = `
// import fetch from 'node-fetch'
// import React from 'react'
// import { LocalStorageCache } from 'monaco-editor-auto-typings'

// // Works fine
// fetch('https://google.com', { method: 'GET' })
// React.useEffect(() => {})
// React.useState<string>('Hello')
// new LocalStorageCache().getFile('FILE_ID')

// // Type errors are detected! :)
// fetch(1337) // Shouldn't be a number!
// React.useEffect('I\`m not a function!')
// React.useState<number>('Not a number :s')
// new LocalStorageCache().getFile() // Argument missing!`;

// export const editorContents = `
// import { uuidV4 } from "@daz.is/uuid-v4";
// import React from 'react';

// const uuid = uuidV4();
// `

export const editorContents2 = `
/// <reference types="@types/xrm" />

import {html, render} from 'lit-html';

let c:Partial<Xrm.Metadata.EntityMetadata> = {}

// This is a lit-html template function. It returns a lit-html template.
const helloTemplate = (name) => html\`<div>Hello ${name}!</div>\`;

// This renders <div>Hello Steve!</div> to the document body
render(helloTemplate('Steve'), document.body);

// This updates to <div>Hello Kevin!</div>, but only updates the ${name} part
render(helloTemplate('Kevin'), document.body);
`


export const editorContents3 = `
import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css\`p { color: blue }\`;

  @property()
  name = 'Somebody';

  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}
`

export const editorContents4 = `
import {html, css, LitElement } from 'lit-element';
import {customElement, property} from 'lit/decorators.js';
@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css\`p { color: blue }\`;

  @property()
  name = 'Somebody';

  render() {
    return html\`<p>Hello, $\{this.name}!</p>\`;
  }
}
`
export const editorContents = `
import * as $ from 'jquery';
`
