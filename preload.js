/*if (process.env.NODE_ENV === 'development')*/
window.__devtron = { require: require, process: process }

window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;

global.ELECTRON_IPC = require('ipc');