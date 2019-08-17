import React from 'react';

const MATH_REGX = /[=\-*\/\+]/;
const WHOLE_NUMBER = /[0-9\.]/;

export default function MathStat(props) {
  const text = props.text;
  if (!MATH_REGX.test(text)) {
    return null;
  }
  let evaluation;
  try {
    evaluation = eval(text).toFixed(3);
  } catch (_) {
    return null;
  }
  return <div className="stat">{evaluation}</div>;
}
