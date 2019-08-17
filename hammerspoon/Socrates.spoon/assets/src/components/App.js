import React from 'react';
import { useEffect, useState } from 'react';
import SelectionPreview from './SelectionPreview';

import getProviders from '../providers/getProviders';

export default function App(props) {
  const { selectedText, focusedApp, extras, emitter } = props;

  useEffect(() => {
    const unbind = emitter.on('select', index => {
      providers[index - 1].handleSelect();
    });
    return function cleanup() {
      unbind();
    };
  });

  const [providerCategory, setProviderCategory] = useState('all');
  emitter.on('update-provider-category', category => {
    setProviderCategory(category);
  });

  const providers = getProviders(
    selectedText,
    focusedApp,
    extras,
    providerCategory
  );
  const selectionPreview =
    selectedText !== '' ? <SelectionPreview text={selectedText} /> : null;
  return (
    <div>
      {selectionPreview}
      {providers.map((provider, index) => provider.render(index + 1))}
    </div>
  );
}
