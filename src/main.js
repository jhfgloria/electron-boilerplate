import { app, BrowserWindow, ipcMain as ipc } from 'electron';
import path from 'path';
import { format as formatURL }  from 'url';
import { autoUpdater } from 'electron-updater';
import UpgradeHelper from './common/upgradeHelper';
import env from 'env';
import platform from 'platform';
import './skystore.html';

// Set widevine plugin
app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, env.static, platform.widevine_cdm_path));
app.commandLine.appendSwitch('widevine-cdm-version', platform.widevine_cdm_version);

let mainWindow;
const upgradeHelper = new UpgradeHelper(autoUpdater, app.getName());

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(
    formatURL({
    pathname: path.join(__dirname, './skystore.html'),
    protocol: 'file',
    slashes: true
  }));

  if (env.environment === 'development') {
    mainWindow.webContents.openDevTools();
  } else {
    // Set autoUpdater job
    autoUpdater.on('update-downloaded', upgradeHelper.promptInstallationMessage);
    upgradeHelper.checkForUpdates();
  }
});
