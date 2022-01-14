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
      console.info('Loaded data from IndexedDB, injecting into editor');
      console.log();
      this.editor.setValue(data[0].content);
    });

    this.editor.on('change', () => {
      localStorage.setItem('jatedb', this.editor.getValue());
    });

    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('jatedb'));
    });
  }
}
