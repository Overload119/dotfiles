//@flow

import React from 'react';

type Props = {
  provider: Provider
};
export default function ProviderRow(props: Props) {
  return (
    <div className="provider-row" onClick={props.provider.handleSelect}>
      <div className="provider-extra">
        <div className="provider-icon">{props.provider.getIcon()}</div>
        <div className="provider-name">{props.provider.getName()}</div>
      </div>
      <div className="provider-details">
        <div className="provider-details-title">
          {props.provider.getTitle()}
        </div>
        <div className="provider-details-subtitle">
          {props.provider.getSubtitle()}
        </div>
      </div>
      <div className="provider-index">{props.index}</div>
    </div>
  );
}
