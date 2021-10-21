const electron = require('electron');
const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');
// import Electron from "electron";
// import React from "react";
// import url from "url";
// import path from "path";

const {app,BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../out/index.html')}`);

    // const mainMenu = Menu.buildFromTemplate();
    // Menu.setApplicationMenu(mainMenu);
});

// const mainMenuTemplate = [
//     {
//         label:'File'
//     }
// ];

