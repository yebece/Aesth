const ipc = require('electron').ipcRenderer;

const close = document.querySelectorAll('.close-button');
const max = document.querySelectorAll('.maximize-button');
const min = document.querySelectorAll('.minimize-button');

close.forEach(el => el.addEventListener('click', event => {
  ipc.send("close");
}));

max.forEach(el => el.addEventListener('click', event => {
  ipc.send("max");
}));

min.forEach(el => el.addEventListener('click', event => {
  ipc.send("min");
}));