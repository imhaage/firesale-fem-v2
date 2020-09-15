// electron has access to Node API + browser API
const { app, BrowserWindow } = require("electron");

// global to avoid garbage collection
let mainWindow = null;

app.on("ready", () => {
  // create window and hide it
  mainWindow = new BrowserWindow({ show: false });

  mainWindow.loadFile(`${__dirname}/index.html`);

  // wait until file is loaded
  mainWindow.once("ready-to-show", () => {
    // show window
    mainWindow.show();
  });
});
