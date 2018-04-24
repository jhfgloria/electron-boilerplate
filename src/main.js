import { app, BrowserWindow, dialog, ipcMain as ipc } from 'electron';
import path from 'path';
import { format as formatURL }  from 'url';
import { autoUpdater } from 'electron-updater';
import UpgradeHelper from './common/upgradeHelper';

let mainWindow;
const upgradeHelper = new UpgradeHelper(autoUpdater, app.getName());

if (process.platform === 'darwin') {
  app.commandLine.appendSwitch('widevine-cdm-path', path.join(__static, 'widevine_cdm/mac/widevinecdmadapter.plugin'));
  app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.1004');
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      plugins: true
    }
  });
  mainWindow.loadURL(formatURL({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.openDevTools();
    autoUpdater.on('update-downloaded', upgradeHelper.promptInstallationMessage);
    upgradeHelper.checkForUpdates();
  }
});
