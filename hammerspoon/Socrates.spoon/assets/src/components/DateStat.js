//@flow

import React from 'react';

const COLOR_REGX = /^(#[0-9]{6}|#[0-9]{3}|rgba?\(\d\s?,\d\s?,d\))$/;

export default function DateStat(props) {
  const text = props.text;
  if (!COLOR_REGX.test(text)) {
    return null;
  }
  return (
    <div className="stat" style={{ backgroundColor: text }}>
      &nbsp;
    </div>
  );
}
