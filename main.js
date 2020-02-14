//const rend = require('./renderer.js');
const electron = require('electron');
const { app, BrowserWindow } = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win;

function createWindow () {
  win = new BrowserWindow({ width: 1024, height: 768 });
  win.loadFile('index.html');
  win.webContents.openDevTools();
  console.log('Node JS version ', process.versions.node);
  console.log('Chrome version ', process.versions.chrome);
  console.log('Electron version ', process.versions.electron);

  win.on('closed', () => {
    win = null;
  })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
