import { app, BrowserWindow, ipcMain } from 'electron';
import { enableLiveReload } from 'electron-compile';
import * as path from 'path';
import { setMainMenu } from './menu';

enableLiveReload();

let mainWindow;
const winArr = [];


function countWindows() {
  return winArr.forEach((w) => {
    w.webContents.send('window-count', {
      count: winArr.length,
    });
  });
}

function createBrowserWindow(opts, inst) {
  const win = new BrowserWindow({
    ...opts,
    width: 300,
    height: 300,
    show: true,
  });


  winArr.push(inst || win);
  win.loadURL(path.join('file://', __dirname, './index.html'));

  win.on('close', () => {
    winArr.splice(winArr.indexOf(win), 1);
    countWindows();
  });
}

function foo() {
  mainWindow = new BrowserWindow({
    show: false,
  });

  winArr.push(mainWindow);

  mainWindow.loadURL(path.join('file://', __dirname, './index.html'));
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('main-created', countWindows);
  });
}


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  foo();

  ipcMain.on('get-window-count', countWindows);

  ipcMain.on('create-window', (event, props) => {
    createBrowserWindow(props);
  });

  setMainMenu(mainWindow);
  console.log(mainWindow);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
