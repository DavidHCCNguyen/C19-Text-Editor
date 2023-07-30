import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/styles.css';
import { header } from './header'; // Import the header content

// Show loading spinner while the editor is initializing
const main = document.querySelector('#main');
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Show the header
const showHeader = () => {
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header');
  headerContainer.innerHTML = header;
  main.appendChild(headerContainer);
};

// Initialize the editor
const initEditor = () => {
  loadSpinner();
  const editor = new Editor();
  editor.editor.on("blur", () => {
    console.log("The editor has lost focus");
    putDb(localStorage.getItem("content"));
  });
};

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

// Show the header and initialize the editor after a slight delay to allow loading spinner to show
showHeader();
setTimeout(initEditor, 100);
