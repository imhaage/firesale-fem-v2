const fs = require("fs");

// electron has access to Node API + browser API
const { app, BrowserWindow, dialog } = require("electron");

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

// dialogs are only available in main process
exports.getFileFromUser = () => {
  // files => array | undefined
  const files = dialog.showOpenDialog({
    properties: ["openFile"],
    buttonLabel: "Import",
    title: "Import file"
    /* filters: [
      { name: "Markdown", extensions: ["md", "markdown", "mdown"] },
      { name: "Text", extensions: ["txt", "text"] }
    ] */
  });

  if (!files) return;

  const file = files[0];

  openFile(file);
};

const openFile = (file) => {
  const content = fs.readFileSync(file, "utf-8");

  mainWindow.webContents.send("file-opened", file, content);
};
