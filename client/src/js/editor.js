import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('jatedb');

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb().then((data) => {
      if (data === "nothing") {
        this.editor.setValue(header);
      } else {
        this.editor.setValue(localData || data[0].content);
      }
    });

    this.editor.on('change', () => {
      localStorage.setItem('jatedb', this.editor.getValue());
    });

    this.editor.on('blur', () => {
      putDb(localStorage.getItem('jatedb'));
    });
  }
}
