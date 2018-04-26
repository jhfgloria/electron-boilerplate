require('../css/index.css');
const ipc = require('electron').ipcRenderer;
const env = require('env');

const webview = document.querySelector('webview');
const loader = document.querySelector('#loader');
let isStartup = true;

webview.src = env.url;

webview.addEventListener('did-start-loading', () => {
  if (isStartup) {
    webview.classList.add('hide');
    loader.classList.remove('hide');
    isStartup = false;
  }
});

webview.addEventListener('dom-ready', () => {
  webview.classList.remove('hide');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 1500);
});
