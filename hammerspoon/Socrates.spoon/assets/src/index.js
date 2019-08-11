import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App';

// class App {
//   static VERSION = '1.0.0';
//
//   constructor() {
//     // Setup DOM listeners.
//     webkit.messageHandlers.Socrates.postMessage('Whats up!');
//     webkit.messageHandlers.Socrates.postMessage({someData: 123});
//   }
//
//   run(props) {
//     console.log(props);
//   }
// }
//
// window.App = new App();

window.App = {
  selectOption: () => {
    console.log('LUA said to pick option');
  },
  run: props => {
    ReactDOM.render(<App {...props} />, document.getElementById('container'));
  }
};

window.App.run({
  selectedText: 'spoon.Socrates.webview:hswindow()',
  focusedApp: {
    name: 'Hammerspoon',
    path: '/Applications/Hammerspoon.app',
    title: '',
    url: ''
  }
});
