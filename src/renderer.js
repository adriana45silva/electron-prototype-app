import { ipcRenderer, remote, app } from 'electron';

const win = document.getElementById('win-count');
const version = document.querySelector('span');
const currentWindow = remote.getCurrentWindow();

version.innerText = remote.process.versions.electron;

ipcRenderer.send('get-window-count');
ipcRenderer.on('window-count', (event, props) => updateView(props));

function updateView(props) {
  win.textContent = props.count;
}


document.querySelector('button').addEventListener('click', () => {
  ipcRenderer.send('create-window', {
    x: 0,
    y: 0,
  });
});

function onBlur() {
  document.body.style = 'opacity: 0.2;';
  console.log('blur');
}

function onFocus() {
  document.body.style = 'opacity: 1;';
  console.log('focus');
}


currentWindow.on('blur', onBlur);
currentWindow.on('focus', onFocus);

window.addEventListener('beforeunload', () => {
  currentWindow.removeListener('blur', onBlur);
  currentWindow.removeListener('focus', onFocus);
});

