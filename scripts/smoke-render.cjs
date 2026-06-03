const fs = require('fs');
const vm = require('vm');

const root = { innerHTML: '' };
const elements = { root };

const context = {
  console,
  Date,
  Math,
  JSON,
  Number,
  String,
  URL,
  localStorage: {
    getItem() { return null; },
    setItem() {}
  },
  document: {
    getElementById(id) {
      if (!elements[id]) {
        elements[id] = { value: '', files: [], dataset: {}, onclick: null, onchange: null, addEventListener() {} };
      }
      return elements[id];
    },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    createElement() { return { href: '', download: '', click() {} }; }
  },
  Blob: function Blob() {},
  FileReader: function FileReader() { this.readAsDataURL = () => {}; },
  confirm() { return false; },
  alert() {}
};

vm.createContext(context);
vm.runInContext(fs.readFileSync('src/main.js', 'utf8'), context, { filename: 'src/main.js' });

if (!root.innerHTML.includes('Create your persona') || !root.innerHTML.includes('StatusSim')) {
  throw new Error('StatusSim onboarding UI did not render into #root.');
}

console.log('StatusSim render smoke test passed.');
