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
    return (
      <div className="icon-scaler">
        <SearchIcon
          className="icon"
          preserveAspectRatio="xMidYMid meet"
          width={'100%'}
          viewBox="0 0 24 24"
        />
      </div>
    );
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
}
