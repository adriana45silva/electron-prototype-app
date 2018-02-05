import { dialog, app, nativeImage } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
// import img from '../images/info.png';

function test() {
  const main = document.querySelector('.main');
  const newChild = '<div>aaaaa</div>';
  main.appendChild(newChild);
}

export function showMessage(browserWindow) {
  dialog.showMessageBox(browserWindow, {
    type: 'info',
    message: 'Hello',
    detail: 'Details message',
    buttons: ['Close', 'Ok'],
    defaultId: 1,
  }, (clickedIndexButton) => {
    console.log(clickedIndexButton);
  });
}

export function showSaveDiag(browserWindow) {
  dialog.showSaveDialog(browserWindow, {
    defaultPath: path.join(app.getPath('downloads'), 'memory-info.txt'),
  }, (filename) => {
    if (filename) {
      const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
      fs.writeFile(filename, memInfo, 'utf8', (err) => {
        if (err) {
          dialog.showErrorBox('Save failed!', err.message);
        }
      });
    }
  });
}

export function showOpenDiag(browserWindow) {
  dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath('downloads'),
    filters: [
      {
        name: 'Text files', extensions: ['txt'],
      },
    ],
  }, (filepaths) => {
    if (filepaths) {
      console.log(filepaths, fs.readFileSync(filepaths[0], 'utf8'));
    }
  });
}
