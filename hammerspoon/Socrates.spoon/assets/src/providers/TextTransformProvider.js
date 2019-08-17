//@flow

import Provider from './Provider';
import React from 'react';
import ProviderRow from '../components/ProviderRow';
import Icon from '../images/page.svg';
import emitter from '../emitter';

class SortProvider extends Provider {
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
    return 'TT';
  }

  getTitle() {
    return 'Text Transform';
  }

  getSubtitle() {
    return 'Opens options to transform the selection';
  }

  getChildProviders() {
    return [new SortProvider(this.selectedText, this.focusedApp, this.extras)];
  }

  isValid() {
    return true;
  }

  handleSelect = () => {
    emitter.emit('update-provider-category', 'text-transform');
  };
}

export default class TextTransformProvider extends Provider {
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
    return 'TT';
  }

  getTitle() {
    return 'Text Transform';
  }

  getSubtitle() {
    return 'Opens options to transform the selection';
  }

  getChildProviders() {
    return [new SortProvider(this.selectedText, this.focusedApp, this.extras)];
  }

  isValid() {
    return true;
  }

  handleSelect = () => {
    emitter.emit('update-provider-category', 'text-transform');
  };
}
