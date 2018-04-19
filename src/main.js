import { app, BrowserWindow, dialog, ipcMain as ipc } from 'electron';
import path from 'path';
import { format as formatURL }  from 'url';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

let mainWindow;

switch (process.platform) {
  case 'darwin':
    app.commandLine.appendSwitch('widevine-cdm-path', '/Users/jgl07/workspace/skystore-desktop-container/src/resources/widevine_cdm/mac/widevinecdmadapter.plugin');
    app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.1004');
  default:

}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      plugins: true
    }
  });
  mainWindow.loadURL(formatURL({
    // fixme: this should use the __dirname directive
    pathname: path.join('/Users/jgl07/workspace/skystore-desktop-container/src', 'index.html'),
    protocol: 'file',
    slashes: true
  }));
  if (process.env.NODE_ENV === 'development') {
    const page = mainWindow.webContents;
    autoUpdater.updateConfigPath = path.join('/Users/jgl07/workspace/skystore-desktop-container/src/', 'dev-app-update.yml');
    autoUpdater.on('checking-for-update', (info) => page.send('checking-for-update'));
    autoUpdater.on('update-available', (info) => page.send('update-available'));
    autoUpdater.on('update-not-available', (info) => page.send('update-not-available'));
    autoUpdater.checkForUpdates();
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.openDevTools();

    const page = mainWindow.webContents;
    page.once('did-frame-finish-load', () => {
      autoUpdater.updateConfigPath = path.join('/Users/jgl07/workspace/skystore-desktop-container/src/', 'dev-app-update.yml');
      autoUpdater.on('checking-for-update', (info) => page.send('checking-for-update'));
      autoUpdater.on('update-available', (info) => page.send('update-available'));
      autoUpdater.on('update-not-available', (info) => page.send('update-not-available'));
      autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
        let message = app.getName() + ' ' + releaseName + ' is now available. It will be installed the next time you restart the application.';

        if (releaseNotes) {
          const splitNotes = releaseNotes.split(/[^\r]\n/);
          message += '\n\nRelease notes:\n';
          splitNotes.forEach(notes => {
            message += notes + '\n\n';
          });
        }
        // Ask user to update the app
        dialog.showMessageBox({
          type: 'question',
          buttons: ['Install and Relaunch', 'Later'],
          defaultId: 0,
          message: 'A new version of ' + app.getName() + ' has been downloaded',
          detail: message
        }, response => {
          if (response === 0) {
            setTimeout(() => autoUpdater.quitAndInstall(), 1);
          }
        });
      });
      autoUpdater.checkForUpdates();
    });
  }
});
