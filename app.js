const { app, BrowserWindow, Menu, shell } = require('electron');

// The main window
let win = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    titleBarStyle: 'hidden-inset'
  });

  var template = [
    {
      label: 'StackEdit',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        },
        {
          label: 'Developer Tools',
          accelerator: 'Command+Alt+J',
          click: () => {
            win.openDevTools();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        },
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        },
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  const urlsInNewWindow = [
    'https://stackedit.io/editor'
  ];
  const wc = win.webContents;
  wc.on('new-window', (ev, url, name) => {
    if (urlsInNewWindow.includes(url)) {
      ev.preventDefault();
      shell.openExternal(url);
    }
  });

  win.loadURL('https://stackedit.io/app');

  win.once('ready-to-show', () => {
    win.maximize()
    win.show()
  })

  win.on('closed', () => {
    win = null;
  });
})
