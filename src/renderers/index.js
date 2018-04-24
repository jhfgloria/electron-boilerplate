const app = document.querySelector('#app');

const webview = document.createElement('webview');
webview.src = 'https://shaka-player-demo.appspot.com';
app.appendChild(webview);


/*
const ipc = require('electron').ipcRenderer;

const webview = document.querySelector('webview');
const loader = document.querySelector('#loader');
let isStartup = true;

if (process.env.NODE_ENV === 'development') {
  // this should be configured to a local developesoment port
  webview.src = 'https://shaka-player-demo.appspot.com';
} else {
  // this should point to a specific store depending on the build environment
  webview.src = 'https://skystore.com';
}


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
*/
