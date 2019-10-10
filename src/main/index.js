import { app, BrowserWindow } from 'electron';

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1000, height: 800, titleBarStyle: 'hidden' });
  mainWindow.loadFile('index.html');

  if (process.env.NODE_ENV === 'development') mainWindow.webContents.openDevTools();
});
