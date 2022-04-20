import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { AutoTypings, LocalStorageCache } from 'monaco-editor-auto-typings';
import { editorContents } from './editorContents';

import './style.css';


// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({

//   importsNotUsedAsValues: 'preserve'
// })

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ES2016,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.CommonJS,
  allowNonTsExtensions: true,
  noEmit: true,
  // esModuleInterop: true,
  // allowJs: true,      
  jsx: monaco.languages.typescript.JsxEmit.React,
  experimentalDecorators: true
  // typeRoots: [TYPES_ROOT]
})
// monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: false,
  noSyntaxValidation: false,
  noSuggestionDiagnostics: true
})

const editor = monaco.editor.create(document.getElementById('editor-mountpoint')!, {
  model: monaco.editor.createModel(editorContents, 'typescript' /*Uri.parse('file://root/index.ts')*/),
});


const cache = new LocalStorageCache();

AutoTypings.create(editor, {
  // Cache declaration files to local storage
  sourceCache: cache,

  // Log progress updates to a div console
  onUpdate: (u, t) => {
    const mountPoint = document.getElementById('logs-mountpoint')!;
    const log = document.createElement('div');
    log.innerHTML = t;
    mountPoint.appendChild(log);
    mountPoint.scrollTop = mountPoint.scrollHeight;
  },

  // Log errors to a div console
  onError: e => {
    const mountPoint = document.getElementById('logs-mountpoint')!;
    const log = document.createElement('div');
    log.classList.add('err');
    log.innerHTML = e;
    mountPoint.appendChild(log);
    mountPoint.scrollTop = mountPoint.scrollHeight;
  },

  // Print loaded versions to DOM
  onUpdateVersions: versions => {
    document.getElementById('versions-mountpoint')!.innerHTML = Object.entries(versions)
      .map(v => `<div>${v[0]}: ${v[1]}</div>`)
      .join('');
  },
});

document.getElementById('reset-cache')!.onclick = () => cache.clear();
