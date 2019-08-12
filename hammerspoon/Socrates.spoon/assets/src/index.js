import ReactDOM from 'react-dom';
import React from 'react';
import NanoEvents from 'nanoevents';

import App from './components/App';

const emitter = new NanoEvents();

window.App = {
  selectProvider: providerIndex => {
    emitter.emit('select', providerIndex);
  },
  run: props => {
    ReactDOM.render(
      <App {...props} emitter={emitter} />,
      document.getElementById('container')
    );
  }
};

// window.App.run({
//   selectedText:
//     '2019-08-11 16:33:00: -- Lazy extension loading enabled\n2019-08-11 16:33:00: -- Loading ~/.hammerspoon/init.lua\\n2019-08-11 16:33:00: -- Loading Spoon: Socrates\n2019-08-11 16:33:01: -- Loading extension: geometry\n2019-08-11 16:33:01: -- Loading extension: webview\n2019-08-11 16:33:01: -- Loading extension: logger\n2019-08-11 16:33:01: -- Loading extension: application\n2019-08-11 16:33:01: -- Loading extension: uielement\n2019-08-11 16:33:01: -- Loading extension: fnutils\n2019-08-11 16:33:01: -- Loading extension: screen\n2019-08-11 16:33:01: -- Loading extension: spoons\n2019-08-11 16:33:01: -- Loading extension: alert',
//   focusedApp: {
//     name: 'Hammerspoon',
//     path: '/Applications/Hammerspoon.app',
//     title: '',
//     url: ''
//   }
// });
