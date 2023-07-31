import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/styles.css';
import '../css/style.css';

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

// Show the loading spinner
loadSpinner();

// Initialize the editor
const editor = new Editor();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
