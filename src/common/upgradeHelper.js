import { dialog } from 'electron';

export default class UpgradeHelper {
  constructor(autoUpdater, appName) {
    this.autoUpdater = autoUpdater;
    this.appName = appName;
  }

  checkForUpdates() {
    this.autoUpdater.checkForUpdates();
  }

  promptInstallationMessage(event, releaseNotes, releaseName) {
    let message = `${this.appName} ${releaseName} is now available. It will be installed the next time you restart the application.`;

    if (releaseNotes) {
      const splitNotes = releaseNotes.split(/[^\r]\n/);
      message += '\n\nRelease notes:\n';
      splitNotes.forEach(notes => message += notes + '\n\n');
    }
    dialog.showMessageBox({
      type: 'question',
      buttons: ['Install and Relaunch', 'Later'],
      defaultId: 0,
      message: 'A new version of ' + this.appName + ' has been downloaded',
      detail: message
    }, response => {
      if (response === 0) {
        setTimeout(() => this.quitAndInstall(), 1);
      }
    });
  };

  quitAndInstall() {
    this.autoUpdater.quitAndInstall();
  }
};
