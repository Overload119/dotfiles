//@flow

import Provider from './Provider';
import React from 'react';
import ProviderRow from '../components/ProviderRow';
import SearchIcon from '../images/search.svg';

export default class GoogleProvider extends Provider {
  static providerName = 'Google';
  static providerColor = '';

  getLabelBackgroundColor() {
    return '#000000';
  }

  getIcon() {
    return <SearchIcon width={56} viewBox="0 0 56 56" />;
  }

  getName() {
    return 'Google';
  }

  getTitle() {
    return 'Search Google for the query';
  }

  getSubtitle() {
    return this.getSelection();
  }

  isValid() {
    return true;
  }

  handleSelect = () => {
    webkit?.messageHandlers?.Socrates?.postMessage({
      action: 'open-web',
      url: `https://www.google.com/search?q=${encodeURIComponent(
        this.selectedText
      )}`
    });
  };

  render(index: number): React.Node {
    return <ProviderRow provider={this} key={index} index={index} />;
  }
}
