//@flow

import Provider from './Provider';
import React from 'react';
import ProviderRow from '../components/ProviderRow';
import Icon from '../images/page.svg';
import emitter from '../emitter';

class MarkdownLinkProvider extends Provider {
  getLabelBackgroundColor() {
    return '#000000';
  }

  getIcon() {
    return (
      <div className="icon-scaler">
        <Icon
          className="icon"
          preserveAspectRatio="xMidYMid meet"
          width={'100%'}
          viewBox="0 0 24 24"
        />
      </div>
    );
  }

  getName() {
    return 'Markdown';
  }

  getTitle() {
    return 'Markdown: Insert Link';
  }

  getSubtitle() {
    return 'Inserts the';
  }

  isValid() {
    return true;
  }

  handleSelect = () => {
    webkit?.messageHandlers?.Socrates?.postMessage({
      action: 'update-provider-category',
      category: 'markdown'
    });
    emitter.emit('update-provider-category', 'markdown');
  };
}

class MarkdownBoldProvider extends Provider {
  getLabelBackgroundColor() {
    return '#000000';
  }

  getIcon() {
    return (
      <div className="icon-scaler">
        <Icon
          className="icon"
          preserveAspectRatio="xMidYMid meet"
          width={'100%'}
          viewBox="0 0 24 24"
        />
      </div>
    );
  }

  getName() {
    return 'Markdown';
  }

  getTitle() {
    return 'Markdown: Bold';
  }

  getSubtitle() {
    return 'Opens Markdown for the selection';
  }

  isValid() {
    return true;
  }

  handleSelect = () => {
    emitter.emit('update-provider-category', 'all');
    webkit?.messageHandlers?.Socrates?.postMessage({
      action: 'insert-text',
      text: `**${this.selectedText}**`
    });
  };
}

export default class MarkdownProvider extends Provider {
  getLabelBackgroundColor() {
    return '#000000';
  }

  getIcon() {
    return (
      <div className="icon-scaler">
        <Icon
          className="icon"
          preserveAspectRatio="xMidYMid meet"
          width={'100%'}
          viewBox="0 0 24 24"
        />
      </div>
    );
  }

  getValidChildProviders(): Array<Provider> {
    return [
      new MarkdownBoldProvider(this.selectedText, this.focusedApp, this.extras),
      new MarkdownLinkProvider(this.selectedText, this.focusedApp, this.extras)
    ].filter(provider => provider.isValid());
  }

  getName() {
    return 'Markdown';
  }

  getTitle() {
    return 'Markdown';
  }

  getSubtitle() {
    return 'Opens Markdown for the selection';
  }

  isValid() {
    return true;
  }

  handleSelect = () => {
    emitter.emit('update-provider-category', 'markdown');
  };
}
