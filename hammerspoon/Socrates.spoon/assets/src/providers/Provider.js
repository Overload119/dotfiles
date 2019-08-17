import React from 'react';
import ProviderRow from '../components/ProviderRow';

export default class Provider {
  constructor(selectedText: string, focusedApp: FocusedAppType, extras) {
    this.selectedText = selectedText;
    this.focusedApp = focusedApp;
    this.extras = extras;
  }

  render(index: number): React.Node {
    return <ProviderRow provider={this} key={index} index={index} />;
  }

  getSelection(): React.Node {
    if (/\n/.test(this.selectedText)) {
      const lines = this.selectedText.split('\n');
      const firstLine = lines[0];
      const lastLine = lines.pop();
      return (
        <span>
          (multiple lines starting with ${firstLine} and ending with ${lastLine}
          )
        </span>
      );
    }
    return <span>{this.selectedText}</span>;
  }
}
