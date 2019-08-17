import React from 'react';

// The entire string must be a renderable color.
const COLOR_REGX = /^(#[0-9]{6}|#[0-9]{3}|rgba?\(\d\s?,\d\s?,d\))$/;

export default function ColorStat(props) {
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
