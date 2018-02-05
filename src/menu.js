import { app, Menu } from 'electron';

import { showMessage, showSaveDiag, showOpenDiag } from './dialogs';

const isWindows = process.platform === 'win32';


export function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
          accelerator: isWindows ? 'Al+F4' : 'CmdOrCtrl+Q',
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo',
        },
        {
          role: 'redo',
        },
        {
          role: 'separator',
        },
        {
          role: 'cut',
        },
        {
          role: 'copy',
        },
        {
          role: 'paste',
        },
        {
          role: 'selectall',
        },
      ],
    },
    {
      label: 'Actions',
      submenu: [
        {
          label: 'Say Hello',
          click() {
            showMessage(mainWindow);
          },
        },
        {
          label: 'Save Memory Usage Info',
          click() {
            showSaveDiag(mainWindow);
          },
        },
        {
          label: 'Open File',
          click() {
            showOpenDiag(mainWindow);
          },
        },
      ],
    },
  ];


  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// module.exports = {setMainMenu};

