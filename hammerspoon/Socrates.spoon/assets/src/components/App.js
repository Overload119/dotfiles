import React from 'react';
import pluralize from 'pluralize';

import getProviders from '../providers/getProviders';

function SelectionPreview(props) {
  const text = props.text;
  if (!text) {
    return null;
  }
  const lines = text.split('\n');
  let previewNode;
  if (text.length < 40) {
    previewNode = <div className="selection-preview large">{text}</div>;
  }
  const lineCount = lines.length;
  if (lines.length > 1) {
    previewNode = (
      <div className="selection-preview small">
        {lines[0]}
        <div className="small-dots">
          ...{pluralize('more line', lineCount - 1, true)}...
        </div>
        {lines[1]}
      </div>
    );
  }
  return (
    <div className="selection-preview">
      {previewNode}
      <div className="selection-preview-stats">
        <div className="stat">{pluralize('line', lineCount, true)}</div>
        <div className="stat">{pluralize('char', text.length, true)}</div>
      </div>
    </div>
  );
}

export default function App(props) {
  const { selectedText, focusedApp } = props;
  const providers = getProviders(selectedText, focusedApp);
  const selectionPreview =
    selectedText !== '' ? <SelectionPreview text={selectedText} /> : null;
  return (
    <div>
      {selectionPreview}
      {providers.map((provider, index) => provider.render(index + 1))}
    </div>
  );
}
