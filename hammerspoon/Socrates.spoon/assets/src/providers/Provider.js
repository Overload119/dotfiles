import React from 'react';

export default class Provider {
  constructor(selectedText: string, focusedApp: FocusedAppType) {
    this.selectedText = selectedText;
    this.focusedApp = focusedApp;
  }

  render(index): React.Node {
    return <div>NO RENDERING</div>;
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
