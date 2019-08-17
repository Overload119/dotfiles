import React from 'react';
import pluralize from 'pluralize';
import ColorStat from './ColorStat';
import MathStat from './MathStat';

const SINGLE_LINE_LIMIT = 80;

function shorten(text) {
  return (
    text.substr(0, SINGLE_LINE_LIMIT / 2 - 2) +
    ' ... ' +
    text.substr(text.length - SINGLE_LINE_LIMIT / 2 - 3)
  );
}

function shortenIfTooLong(text) {
  return text.length > SINGLE_LINE_LIMIT ? shorten(text) : text;
}

export default function SelectionPreview(props) {
  const text = props.text;
  if (!text) {
    return null;
  }
  const lines = text.split('\n');
  const lineCount = lines.length;
  let previewNode =
    text.length < SINGLE_LINE_LIMIT ? (
      <div className="selection-preview large">{text}</div>
    ) : (
      <div className="selection-preview large">{shorten(text)}</div>
    );
  if (lines.length > 1) {
    previewNode = (
      <div className="selection-preview small">
        {shortenIfTooLong(lines[0])}
        {lines.length > 2 ? (
          <div className="small-dots">
            ...{pluralize('more line', lineCount - 1, true)}...
          </div>
        ) : null}
        {shortenIfTooLong(lines[lines.length - 1])}
      </div>
    );
  }
  return (
    <div className="selection-preview">
      {previewNode}
      <div className="selection-preview-stats">
        <ColorStat text={text} />
        <MathStat text={text} />
        <div className="stat">{pluralize('line', lineCount, true)}</div>
        <div className="stat">{pluralize('char', text.length, true)}</div>
      </div>
    </div>
  );
}
