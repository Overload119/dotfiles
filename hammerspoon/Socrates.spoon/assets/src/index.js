import ReactDOM from 'react-dom';
import React from 'react';
import emitter from './emitter';

import App from './components/App';

window.App = {
  updateProviderCategory: category => {
    emitter.emit('update-provider-category', category);
  },
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

/**
 * Triggers a search manually. Add # to the URL in Safari. Useful for development.
 */
if (window.location.hash) {
  window.App.run({
    selectedText: 'spoon.Socrates.webview:hswindow()',
    focusedApp: {
      name: 'Hammerspoon',
      path: '/Applications/Hammerspoon.app',
      title: '',
      url: ''
    }
  });
}
