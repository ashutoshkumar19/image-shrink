const { app, BrowserWindow, Menu } = require('electron');

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;
const isLinux = process.platform === 'linux' ? true : false;
const isWindows = process.platform === 'win32' ? true : false;

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: `Image Shrink - ${isMac ? 'MacOS' : isLinux ? 'Linux' : isWindows ? 'Windows' : ''}`,
    width: 600,
    height: 500,
    icon: './assets/icons/Icon_32x32.png',
    resizable: isDev ? true : false,
  });

  mainWindow.loadFile('./src/index.html');
};

const menu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        // click: () => app.quit(),
      },
    ],
  },
];

// app.on('ready', createMainWindow);

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on('ready', () => (mainWindow = null));

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (!isMac) app.quit();
});
