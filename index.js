const { app, screen, ipcMain, BrowserWindow} = require('electron');
var y1 = 18;

const contextMenu = require('electron-context-menu');
contextMenu({
	showSaveImageAs: true
});

try {
    require('electron-reloader')(module)
  } catch (_) {}

const createWindow = () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const window = new BrowserWindow({
        width: width / 1.25,
        minWidth: 800,
        height: height / 1.25,
        minHeight: 400,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        trafficLightPosition: { x: 10, y: -6 },
        webPreferences: {
            experimentalFeatures: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, // use remote module
            webviewTag: true
        }, 
        webSecurity: false,
        vibrancy: 'under-window',
        visualEffectState: 'followWindow',
          backgroundColor:'#00000000'
    });
    
    ipcMain.on('close', (event, arg) => {
        window.close();
    })

    ipcMain.on('max', (event, arg) => {
        if(window.isMaximized() == true){
            window.restore();
        }else{
            window.maximize();
        }
    })

    ipcMain.on('min', (event, arg) => {
        window.minimize();
    })

    window.loadFile('index.html');
};
app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());