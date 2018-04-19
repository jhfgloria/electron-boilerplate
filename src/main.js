import { app, BrowserWindow } from 'electron';
import path from 'path';
import { format as formatURL }  from 'url';

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(formatURL({
    // fixme: this should use the __dirname directive
    pathname: path.join('/Users/jgl07/workspace/skystore-desktop-container/src', 'index.html'),
    protocol: 'file',
    slashes: true
  }));
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
});
