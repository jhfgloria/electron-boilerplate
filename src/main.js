import { app, BrowserWindow, ipcMain as ipc } from 'electron';
import path from 'path';
import { format as formatURL }  from 'url';
import { autoUpdater } from 'electron-updater';
import UpgradeHelper from './common/upgradeHelper';
import env from 'env';
import './renderer.html';

let mainWindow;
const upgradeHelper = new UpgradeHelper(autoUpdater, app.getName());

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      plugins: true
    }
  });
  mainWindow.loadURL(formatURL({
    pathname: path.join(__dirname, './renderer.html'),
    protocol: 'file',
    slashes: true
  }));

  if (env.environment === 'development') {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.openDevTools();
    autoUpdater.on('update-downloaded', upgradeHelper.promptInstallationMessage);
    upgradeHelper.checkForUpdates();
  }
});
